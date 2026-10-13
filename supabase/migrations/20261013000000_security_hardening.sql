-- Security hardening (October 2026 audit). Applied to production 13 Oct 2026.

-- 1. Least-privilege table grants. RLS already guards every table; this
--    removes Supabase's default blanket grants so a policy mistake can never
--    expose a table the anonymous role has no business touching.
revoke all on all tables in schema public from anon;
grant insert on public.contact_submissions to anon;
grant select on public.resources, public.resource_categories, public.resource_category_links to anon;

revoke all on public.agent_safety_events, public.course_lessons, public.course_modules,
  public.site_settings, public.stripe_events, public.contact_submissions
  from authenticated;
revoke insert, update, delete on public.subscriptions, public.couples from authenticated;

alter default privileges in schema public revoke all on tables from anon;
alter default privileges in schema public revoke execute on functions from anon, public;

-- 2. Security-definer helpers may only ever answer about the caller.
create or replace function public.active_partner_of(uid uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select case when owner_id = uid then partner_id else owner_id end
  from couples
  where status = 'active' and (owner_id = uid or partner_id = uid)
    and uid = auth.uid()
  limit 1;
$$;

create or replace function public.active_couple_of(uid uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select id from couples
  where status = 'active' and (owner_id = uid or partner_id = uid)
    and uid = auth.uid()
  limit 1;
$$;

revoke execute on function public.active_partner_of(uuid) from public, anon;
revoke execute on function public.active_couple_of(uuid) from public, anon;
grant execute on function public.active_partner_of(uuid) to authenticated;
grant execute on function public.active_couple_of(uuid) to authenticated;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- 3. Pin search_path on the remaining function.
alter function public.set_updated_at() set search_path = '';

-- 4. Rate limiting store (fixed window). Keys are hashed by the app, so no
--    raw IP addresses or emails are stored. Service role only.
create table if not exists public.rate_limits (
  key          text primary key,
  window_start timestamptz not null default now(),
  hits         integer not null default 0
);
alter table public.rate_limits enable row level security;
revoke all on public.rate_limits from anon, authenticated;

create or replace function public.rate_limit_hit(p_key text, p_window_seconds integer, p_max integer)
returns boolean language plpgsql security definer set search_path = public as $$
declare
  current_hits integer;
begin
  insert into rate_limits as r (key, window_start, hits)
  values (p_key, now(), 1)
  on conflict (key) do update set
    hits = case when r.window_start < now() - make_interval(secs => p_window_seconds) then 1 else r.hits + 1 end,
    window_start = case when r.window_start < now() - make_interval(secs => p_window_seconds) then now() else r.window_start end
  returning hits into current_hits;

  if random() < 0.01 then
    delete from rate_limits where window_start < now() - interval '2 days';
  end if;

  return current_hits <= p_max;
end;
$$;
revoke execute on function public.rate_limit_hit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.rate_limit_hit(text, integer, integer) to service_role;

-- 5. pg_net (installed in public for a one-off test, unused by the app) was
--    switched off from the Supabase dashboard on 13 Oct 2026 (dropping it
--    over the API timed out on its background worker). Leaked-password
--    protection was enabled in Auth settings the same day.
