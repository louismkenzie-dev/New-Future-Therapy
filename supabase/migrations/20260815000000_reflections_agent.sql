-- NewFuture Reflections agent: retained, encrypted chat transcripts with
-- participant delete controls; the mixed-field worksheet exercise kind; and
-- an anonymous safety counter (tier + timestamp only — no identity, no
-- content) that informs the periodic signposting review.
--
-- Access model: participants read and write their own conversations through
-- the RLS-enforced authenticated client. There is deliberately NO admin or
-- partner read path to conversations — "no therapist reads these
-- conversations" is enforced by the schema, not by policy text.

-- The worksheet joins the shareable exercise kinds.
alter table exercise_responses
  drop constraint exercise_responses_exercise_kind_check;
alter table exercise_responses
  add constraint exercise_responses_exercise_kind_check
  check (exercise_kind in ('journal', 'quiz', 'checkin', 'shared_journal', 'worksheet'));

-- ---------------------------------------------------------------------------
-- CONVERSATIONS
-- ---------------------------------------------------------------------------

create table if not exists chat_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  course_id   text,
  lesson_id   text,
  exercise_id text,
  title       text not null default 'Reflections',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists chat_sessions_user_idx
  on chat_sessions (user_id, updated_at desc);

create table if not exists chat_messages (
  id         uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  -- AES-256-GCM ciphertext (hex), encrypted at the application layer.
  content    text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_messages_session_idx
  on chat_messages (session_id, created_at);

alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;

create policy "chat_sessions_own" on chat_sessions
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "chat_messages_own" on chat_messages
  for all
  using (
    exists (
      select 1 from chat_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from chat_sessions s
      where s.id = session_id and s.user_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- ANONYMOUS SAFETY COUNTER — deliberately no user_id, session_id or content,
-- so the pathway can be reviewed without any record about an individual.
-- Service-role writes only; no authenticated policies at all.
-- ---------------------------------------------------------------------------

create table if not exists agent_safety_events (
  id         uuid primary key default gen_random_uuid(),
  tier       text not null check (tier in ('vulnerability', 'immediate')),
  created_at timestamptz not null default now()
);

alter table agent_safety_events enable row level security;
