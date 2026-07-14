-- Contact form submissions table
-- Each row stores an AES-256-GCM encrypted payload (iv + tag + ciphertext)
-- so PII is never readable by anyone with raw DB access.

create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  submitted_at timestamptz not null default now(),
  payload     bytea not null  -- encrypted blob
);

-- Enable Row Level Security
alter table contact_submissions enable row level security;

-- Allow the contact form to INSERT only.
-- No role restriction (applies to `public`) so it works with both the
-- legacy anon JWT and the newer sb_publishable_... API keys.
create policy "anon_insert" on contact_submissions
  for insert
  with check (true);

-- Only service_role (admin dashboard) may read
-- service_role always bypasses RLS, so no explicit policy needed.
-- This policy blocks all other authenticated reads for safety.
create policy "deny_select" on contact_submissions
  for select using (false);
