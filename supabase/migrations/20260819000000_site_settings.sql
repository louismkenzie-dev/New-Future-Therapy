-- Server-side site settings (e.g. enquiry-alert configuration). Values are
-- written directly to the database — never committed to the repository,
-- which is public. RLS is enabled with no policies: service-role access only.

create table if not exists site_settings (
  key        text primary key,
  value      text not null,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;
