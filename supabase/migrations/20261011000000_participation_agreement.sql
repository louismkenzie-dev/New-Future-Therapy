-- Couples Participation Agreement: each member accepts it once before
-- entering the programme. The version lets a reissued agreement ask again.
alter table profiles
  add column if not exists agreement_version text,
  add column if not exists agreement_accepted_at timestamptz;
