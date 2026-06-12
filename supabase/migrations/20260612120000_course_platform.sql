-- Course platform schema: profiles, couples, subscriptions, progress,
-- exercise responses (sharable between linked partners), reactions,
-- learning path, and a Stripe webhook event log.
--
-- Access model: all user-facing reads/writes go through the RLS-enforced
-- authenticated client. The service-role client is used only by the Stripe
-- webhook, admin pages, and the cross-user invite-acceptance write.

-- ---------------------------------------------------------------------------
-- PROFILES (1:1 with auth.users, created by trigger on signup)
-- ---------------------------------------------------------------------------

create table if not exists profiles (
  id                   uuid primary key references auth.users(id) on delete cascade,
  display_name         text not null,
  pronouns             text,
  stripe_customer_id   text unique,
  complimentary_access boolean not null default false,
  deactivated_at       timestamptz,
  created_at           timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, pronouns)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data->>'display_name'), ''),
      split_part(coalesce(new.email, 'member'), '@', 1)
    ),
    nullif(trim(new.raw_user_meta_data->>'pronouns'), '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- COUPLES — two-column design enforces max two members.
-- invite_token_hash stores sha256 of the raw invite token; raw never stored.
-- ---------------------------------------------------------------------------

create table if not exists couples (
  id                uuid primary key default gen_random_uuid(),
  owner_id          uuid not null references profiles(id) on delete cascade,
  partner_id        uuid references profiles(id) on delete set null,
  status            text not null default 'pending'
    check (status in ('pending', 'active', 'suspended', 'unlinked')),
  invite_token_hash text,
  invite_expires_at timestamptz,
  linked_at         timestamptz,
  unlinked_at       timestamptz,
  created_at        timestamptz not null default now(),
  check (partner_id is distinct from owner_id)
);

-- One live couple per person, on either side of the link.
create unique index if not exists couples_owner_live
  on couples(owner_id) where status in ('pending', 'active', 'suspended');
create unique index if not exists couples_partner_live
  on couples(partner_id) where status in ('active', 'suspended');
create index if not exists couples_token on couples(invite_token_hash)
  where status = 'pending';

-- Who is my active partner? security definer so policies on other tables can
-- call it without recursive RLS evaluation. status must be 'active', which
-- means unlinking or suspension revokes partner visibility at the DB level.
create or replace function public.active_partner_of(uid uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select case when owner_id = uid then partner_id else owner_id end
  from couples
  where status = 'active' and (owner_id = uid or partner_id = uid)
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- SUBSCRIPTIONS — synced from Stripe by the webhook; service-role writes only.
-- ---------------------------------------------------------------------------

create table if not exists subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references profiles(id) on delete cascade,
  stripe_customer_id     text not null,
  stripe_subscription_id text not null unique,
  plan                   text not null check (plan in ('individual', 'couples')),
  billing_interval       text not null check (billing_interval in ('month', 'year')),
  stripe_price_id        text not null,
  amount_pence           integer not null,
  status                 text not null,
  current_period_end     timestamptz,
  cancel_at_period_end   boolean not null default false,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);

create index if not exists subscriptions_user on subscriptions(user_id);
create index if not exists subscriptions_customer on subscriptions(stripe_customer_id);

-- ---------------------------------------------------------------------------
-- LESSON PROGRESS
-- ---------------------------------------------------------------------------

create table if not exists lesson_progress (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid not null references profiles(id) on delete cascade,
  course_id              text not null,
  lesson_id              text not null,
  status                 text not null default 'in_progress'
    check (status in ('in_progress', 'completed')),
  video_position_seconds integer,
  completed_at           timestamptz,
  updated_at             timestamptz not null default now(),
  unique (user_id, course_id, lesson_id)
);

create index if not exists lesson_progress_user on lesson_progress(user_id, course_id);

-- ---------------------------------------------------------------------------
-- EXERCISE RESPONSES — free-text fields inside content are AES-256-GCM
-- encrypted by the application layer before insert.
-- ---------------------------------------------------------------------------

create table if not exists exercise_responses (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  course_id     text not null,
  lesson_id     text not null,
  exercise_id   text not null,
  exercise_kind text not null
    check (exercise_kind in ('journal', 'quiz', 'checkin', 'shared_journal')),
  content       jsonb not null,
  is_shared     boolean not null default false,
  shared_at     timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (user_id, course_id, lesson_id, exercise_id)
);

create index if not exists exercise_responses_user on exercise_responses(user_id, course_id);
create index if not exists exercise_responses_shared on exercise_responses(user_id)
  where is_shared;

-- ---------------------------------------------------------------------------
-- RESPONSE REACTIONS — a partner's gentle reaction (+ optional reply) to a
-- shared response. One per partner per response, editable.
-- ---------------------------------------------------------------------------

create table if not exists response_reactions (
  id            uuid primary key default gen_random_uuid(),
  response_id   uuid not null references exercise_responses(id) on delete cascade,
  reactor_id    uuid not null references profiles(id) on delete cascade,
  reaction_type text not null
    check (reaction_type in ('i_hear_you', 'thank_you', 'this_moved_me', 'lets_talk')),
  reply_text    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (response_id, reactor_id)
);

create index if not exists response_reactions_response on response_reactions(response_id);

-- ---------------------------------------------------------------------------
-- LEARNING PATH — own notes plus bookmarks of a partner's shared responses.
-- Bookmarks never snapshot the partner's text, so revoking a share is real.
-- ---------------------------------------------------------------------------

create table if not exists learning_path_items (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references profiles(id) on delete cascade,
  kind               text not null check (kind in ('note', 'partner_bookmark')),
  course_id          text,
  lesson_id          text,
  source_response_id uuid references exercise_responses(id) on delete set null,
  note               text not null default '',
  created_at         timestamptz not null default now()
);

create index if not exists learning_path_user on learning_path_items(user_id);

-- ---------------------------------------------------------------------------
-- STRIPE EVENT LOG — primary key on the Stripe event id gives webhook
-- idempotency; also feeds the admin "recent activity" list.
-- ---------------------------------------------------------------------------

create table if not exists stripe_events (
  id         text primary key,
  type       text not null,
  summary    jsonb,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists subscriptions_updated_at on subscriptions;
create trigger subscriptions_updated_at before update on subscriptions
  for each row execute function public.set_updated_at();
drop trigger if exists lesson_progress_updated_at on lesson_progress;
create trigger lesson_progress_updated_at before update on lesson_progress
  for each row execute function public.set_updated_at();
drop trigger if exists exercise_responses_updated_at on exercise_responses;
create trigger exercise_responses_updated_at before update on exercise_responses
  for each row execute function public.set_updated_at();
drop trigger if exists response_reactions_updated_at on response_reactions;
create trigger response_reactions_updated_at before update on response_reactions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

alter table profiles           enable row level security;
alter table couples            enable row level security;
alter table subscriptions      enable row level security;
alter table lesson_progress    enable row level security;
alter table exercise_responses enable row level security;
alter table response_reactions enable row level security;
alter table learning_path_items enable row level security;
alter table stripe_events      enable row level security;

-- profiles: read own row and your active partner's (display name on shared
-- surfaces); update own row, limited to display_name/pronouns by column grant.
create policy "profiles_select_own_or_partner" on profiles
  for select to authenticated
  using (id = auth.uid() or id = public.active_partner_of(auth.uid()));

create policy "profiles_update_own" on profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

revoke insert, update, delete on profiles from anon, authenticated;
grant update (display_name, pronouns) on profiles to authenticated;

-- couples: members may read their own couple; all state transitions happen
-- server-side via the service-role client (no client writes).
create policy "couples_select_member" on couples
  for select to authenticated
  using (owner_id = auth.uid() or partner_id = auth.uid());

-- subscriptions: readable by the subscriber and their active partner
-- (a couples plan covers both); writes are service-role only.
create policy "subscriptions_select_own_or_partner" on subscriptions
  for select to authenticated
  using (user_id = auth.uid() or user_id = public.active_partner_of(auth.uid()));

-- lesson_progress: full CRUD on own rows.
create policy "lesson_progress_own" on lesson_progress
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- exercise_responses: full CRUD on own rows; partner may read shared rows
-- only while the couple is active.
create policy "exercise_responses_own" on exercise_responses
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "exercise_responses_partner_shared" on exercise_responses
  for select to authenticated
  using (is_shared and user_id = public.active_partner_of(auth.uid()));

-- response_reactions: visible to the reactor and to the owner of the response;
-- writable only by the partner, only on a currently shared response.
create policy "response_reactions_select" on response_reactions
  for select to authenticated
  using (
    reactor_id = auth.uid()
    or exists (
      select 1 from exercise_responses r
      where r.id = response_id and r.user_id = auth.uid()
    )
  );

create policy "response_reactions_insert" on response_reactions
  for insert to authenticated
  with check (
    reactor_id = auth.uid()
    and exists (
      select 1 from exercise_responses r
      where r.id = response_id
        and r.is_shared
        and r.user_id = public.active_partner_of(auth.uid())
    )
  );

create policy "response_reactions_update" on response_reactions
  for update to authenticated
  using (reactor_id = auth.uid())
  with check (
    reactor_id = auth.uid()
    and exists (
      select 1 from exercise_responses r
      where r.id = response_id
        and r.is_shared
        and r.user_id = public.active_partner_of(auth.uid())
    )
  );

create policy "response_reactions_delete" on response_reactions
  for delete to authenticated
  using (reactor_id = auth.uid());

-- learning_path_items: full CRUD on own rows.
create policy "learning_path_own" on learning_path_items
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- stripe_events: no policies — service-role only.
