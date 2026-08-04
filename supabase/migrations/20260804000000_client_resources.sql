-- Client resource library: folders (categories), resources (uploaded PDFs or
-- written articles) and a link table so a resource can live in several folders.
--
-- Access model: the public site reads published resources through the anon
-- client under RLS. All writes go through the service-role client from the
-- admin dashboard, guarded by isAdmin() in every server action.

-- ---------------------------------------------------------------------------
-- CATEGORIES ("folders") — seeded below; the team can add their own.
-- ---------------------------------------------------------------------------

create table if not exists resource_categories (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  name       text not null,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RESOURCES — either an uploaded PDF (file_url) or a written article (body),
-- never neither. resource_type is a display label, not a storage format.
-- ---------------------------------------------------------------------------

create table if not exists resources (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  description   text not null default '',
  resource_type text not null default 'worksheet'
    check (resource_type in ('worksheet', 'factsheet', 'article')),
  body          text,
  file_url      text,
  file_path     text,
  file_name     text,
  file_size     bigint,
  published     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint resource_has_content check (file_url is not null or body is not null)
);

create table if not exists resource_category_links (
  resource_id uuid not null references resources(id) on delete cascade,
  category_id uuid not null references resource_categories(id) on delete cascade,
  primary key (resource_id, category_id)
);

-- ---------------------------------------------------------------------------
-- RLS — public may read (published resources only); nobody but service_role
-- may write, so no insert/update/delete policies exist at all.
-- ---------------------------------------------------------------------------

alter table resource_categories enable row level security;
alter table resources enable row level security;
alter table resource_category_links enable row level security;

create policy "public_read_categories" on resource_categories
  for select using (true);

create policy "public_read_published_resources" on resources
  for select using (published);

create policy "public_read_links" on resource_category_links
  for select using (true);

-- ---------------------------------------------------------------------------
-- SEED — the practice's initial folder list.
-- ---------------------------------------------------------------------------

insert into resource_categories (slug, name, sort_order) values
  ('couples-relationships',    'Couples & Relationships',        10),
  ('anxiety-stress',           'Anxiety & Stress',               20),
  ('trauma',                   'Trauma',                         30),
  ('loneliness',               'Loneliness',                     40),
  ('self-esteem-confidence',   'Self-Esteem & Confidence',       50),
  ('emotional-regulation',     'Emotional Regulation',           60),
  ('communication-skills',     'Communication Skills',           70),
  ('attachment-styles',        'Attachment Styles',              80),
  ('inner-child-parts-work',   'Inner Child & Parts Work',       90),
  ('boundaries',               'Boundaries',                    100),
  ('grief-loss',               'Grief & Loss',                  110),
  ('neurodiversity-adhd-autism', 'Neurodiversity (ADHD & Autism)', 120),
  ('depression-low-mood',      'Depression & Low Mood',         130),
  ('mindfulness-grounding',    'Mindfulness & Grounding',       140),
  ('personal-growth',          'Personal Growth',               150),
  ('lgbtqia',                  'LGBTQIA+',                      160)
on conflict (slug) do nothing;
