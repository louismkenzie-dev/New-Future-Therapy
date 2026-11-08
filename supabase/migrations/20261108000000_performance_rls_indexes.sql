-- Performance pass (Supabase performance advisor).
--
-- 1. RLS policies called auth.uid() directly, which Postgres re-evaluates
--    for every row. Wrapping it as (select auth.uid()) lets the planner run
--    it once per query (an InitPlan). Semantics are identical: each policy's
--    USING / WITH CHECK expression is rewritten in place with ALTER POLICY,
--    changing only that call.
do $$
declare
  p record;
  stmt text;
begin
  for p in
    select schemaname, tablename, policyname, qual, with_check
    from pg_policies
    where schemaname = 'public'
      and (qual ~ 'auth\.uid\(\)' or with_check ~ 'auth\.uid\(\)')
  loop
    stmt := format('alter policy %I on %I.%I', p.policyname, p.schemaname, p.tablename);
    if p.qual is not null then
      stmt := stmt || ' using (' || regexp_replace(p.qual, '(?<!select )auth\.uid\(\)', '(select auth.uid())', 'g') || ')';
    end if;
    if p.with_check is not null then
      stmt := stmt || ' with check (' || regexp_replace(p.with_check, '(?<!select )auth\.uid\(\)', '(select auth.uid())', 'g') || ')';
    end if;
    execute stmt;
  end loop;
end
$$;

-- 2. Covering indexes for foreign keys the advisor found unindexed.
create index if not exists couple_responses_updated_by_idx on public.couple_responses (updated_by);
create index if not exists learning_path_items_source_response_id_idx on public.learning_path_items (source_response_id);
create index if not exists resource_category_links_category_id_idx on public.resource_category_links (category_id);
create index if not exists response_reactions_reactor_id_idx on public.response_reactions (reactor_id);
