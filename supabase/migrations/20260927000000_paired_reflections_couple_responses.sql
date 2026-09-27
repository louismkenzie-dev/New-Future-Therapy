-- Module 1 of the Couples Relationship Programme introduces the paired
-- reflection: each partner answers individually in their own login, chooses
-- whether to share, and the couple then completes "Coming Back Together"
-- questions as one joint record. Two additions support this:
--
--   1. couple_responses — answers written together by an active couple. One
--      row per couple per exercise, readable and editable by either member,
--      visible only while the couple is active (unlinking hides it, as with
--      shared individual responses).
--   2. partner_exercise_status() — lets a member see whether their partner has
--      saved / shared a given exercise WITHOUT exposing any content, so the
--      "are we both ready to come back together?" moment can be shown.

-- The paired reflection joins the shareable exercise kinds.
alter table exercise_responses
  drop constraint exercise_responses_exercise_kind_check;
alter table exercise_responses
  add constraint exercise_responses_exercise_kind_check
  check (exercise_kind in (
    'journal', 'quiz', 'checkin', 'shared_journal', 'worksheet', 'paired_reflection'
  ));

-- ---------------------------------------------------------------------------
-- Which active couple am I in? security definer for the same reason as
-- active_partner_of(): policies on other tables call it without recursion.
-- ---------------------------------------------------------------------------

create or replace function public.active_couple_of(uid uuid)
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from couples
  where status = 'active' and (owner_id = uid or partner_id = uid)
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- COUPLE RESPONSES — written together, owned by the couple.
-- ---------------------------------------------------------------------------

create table if not exists couple_responses (
  id          uuid primary key default gen_random_uuid(),
  couple_id   uuid not null references couples(id) on delete cascade,
  course_id   text not null,
  lesson_id   text not null,
  exercise_id text not null,
  -- Same shape as exercise_responses.content: free text encrypted at the
  -- application layer, plain values (scales/choices) alongside.
  content     jsonb not null,
  updated_by  uuid references profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (couple_id, course_id, lesson_id, exercise_id)
);

create index if not exists couple_responses_couple
  on couple_responses (couple_id, course_id);

drop trigger if exists couple_responses_updated_at on couple_responses;
create trigger couple_responses_updated_at before update on couple_responses
  for each row execute function public.set_updated_at();

alter table couple_responses enable row level security;

-- Either member of the ACTIVE couple may read and write; the writer must
-- record themselves as updated_by.
create policy "couple_responses_members" on couple_responses
  for all to authenticated
  using (couple_id = public.active_couple_of(auth.uid()))
  with check (
    couple_id = public.active_couple_of(auth.uid())
    and updated_by = auth.uid()
  );

-- ---------------------------------------------------------------------------
-- PARTNER READINESS — presence without content.
-- ---------------------------------------------------------------------------

create or replace function public.partner_exercise_status(
  p_course_id text,
  p_lesson_id text,
  p_exercise_id text
)
returns table (saved boolean, shared boolean)
language sql
stable
security definer
set search_path = public
as $$
  select
    exists (
      select 1 from exercise_responses r
      where r.user_id = public.active_partner_of(auth.uid())
        and r.course_id = p_course_id
        and r.lesson_id = p_lesson_id
        and r.exercise_id = p_exercise_id
    ) as saved,
    exists (
      select 1 from exercise_responses r
      where r.user_id = public.active_partner_of(auth.uid())
        and r.course_id = p_course_id
        and r.lesson_id = p_lesson_id
        and r.exercise_id = p_exercise_id
        and r.is_shared
    ) as shared;
$$;

revoke execute on function public.partner_exercise_status(text, text, text) from public, anon;
grant execute on function public.partner_exercise_status(text, text, text) to authenticated;
