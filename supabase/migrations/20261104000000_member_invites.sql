-- Team-issued welcome links. While public sign-ups are closed, the team
-- creates accounts from the admin Members page and sends each person a
-- single-use link to choose their own password. Only a SHA-256 hash of the
-- token is stored. Service-role access only: RLS on, no policies, no grants.
create table if not exists public.member_invites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists member_invites_user_id_idx on public.member_invites (user_id);

alter table public.member_invites enable row level security;
revoke all on public.member_invites from anon, authenticated;
