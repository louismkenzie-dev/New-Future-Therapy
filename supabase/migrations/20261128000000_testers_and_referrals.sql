-- Trusted testers and referral partners.
--
-- tester_signups: who claimed free access from the private tester page.
-- programme_feedback: feedback from testers (private page or member area).
-- referral_partners: people with a referral code (10% off for clients,
--   10% commission for them). Each maps to a Stripe promotion code.
-- referral_conversions: one row per paid invoice that carried a partner's
--   promotion code; commission is owed until paid_out_at is set.
--
-- Service-role access only: RLS on, no policies, no grants. The private
-- page's secret key and the free-place cap live in site_settings
-- (tester_page_key, tester_cap).

create table if not exists public.tester_signups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  partner_name text,
  partner_email text,
  user_id uuid references auth.users (id) on delete set null,
  partner_user_id uuid references auth.users (id) on delete set null,
  linked_as_couple boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.programme_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  rating smallint check (rating between 1 and 5),
  progress text,
  worked_well text,
  could_improve text,
  professional_view text,
  partner_interest boolean not null default false,
  may_quote boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.referral_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  code text not null unique,
  stripe_promotion_code_id text unique,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.referral_conversions (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.referral_partners (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  customer_email text,
  stripe_invoice_id text not null unique,
  stripe_subscription_id text,
  amount_paid_pence integer not null,
  commission_pence integer not null,
  paid_out_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists referral_conversions_partner_idx
  on public.referral_conversions (partner_id, paid_out_at);

alter table public.tester_signups enable row level security;
alter table public.programme_feedback enable row level security;
alter table public.referral_partners enable row level security;
alter table public.referral_conversions enable row level security;

revoke all on public.tester_signups from anon, authenticated;
revoke all on public.programme_feedback from anon, authenticated;
revoke all on public.referral_partners from anon, authenticated;
revoke all on public.referral_conversions from anon, authenticated;
