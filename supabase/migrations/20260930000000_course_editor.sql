-- Course editor: modules and lessons the therapists add themselves from the
-- admin dashboard. Built-in lessons live in code; rows here either add new
-- lessons/modules or override a built-in lesson of the same id. Service-role
-- access only (RLS on, no policies) — every read and write goes through
-- isAdmin()-guarded server code, and members read via the merged loader.

create table if not exists course_modules (
  id          text primary key,
  course_id   text not null,
  number      integer not null,
  title       text not null,
  lede        text not null default '',
  essence     text not null default '',
  sort_order  integer not null default 100,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists course_lessons (
  id                text primary key,
  course_id         text not null,
  module_id         text not null,
  title             text not null,
  summary           text not null default '',
  estimated_minutes integer not null default 20,
  blocks            jsonb not null default '[]'::jsonb,
  status            text not null default 'draft'
    check (status in ('draft', 'published')),
  sort_order        integer not null default 100,
  source_text       text,
  source_files      text[] not null default '{}',
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists course_lessons_course on course_lessons (course_id, module_id, sort_order);

drop trigger if exists course_modules_updated_at on course_modules;
create trigger course_modules_updated_at before update on course_modules
  for each row execute function public.set_updated_at();
drop trigger if exists course_lessons_updated_at on course_lessons;
create trigger course_lessons_updated_at before update on course_lessons
  for each row execute function public.set_updated_at();

alter table course_modules enable row level security;
alter table course_lessons enable row level security;
