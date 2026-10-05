-- Run in the Supabase SQL Editor. Add admin accounts to public.admin_users
-- separately after their Auth accounts have been created.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  is_admin boolean not null default false
);

alter table public.admin_users
  add column if not exists is_admin boolean not null default false;

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from public, anon, authenticated;
grant select on table public.admin_users to authenticated;

do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'admin_users'
  loop
    execute format('drop policy %I on public.admin_users', existing_policy.policyname);
  end loop;
end;
$$;

create policy "Users can read their own admin status"
  on public.admin_users
  for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
      and is_admin is true
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.posts enable row level security;
revoke all on table public.posts from public, anon, authenticated;
grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;

-- Remove existing policies so an older permissive policy cannot grant broader access.
do $$
declare
  existing_policy record;
begin
  for existing_policy in
    select policyname
    from pg_policies
    where schemaname = 'public'
      and tablename = 'posts'
  loop
    execute format('drop policy %I on public.posts', existing_policy.policyname);
  end loop;
end;
$$;

create policy "Public can read posts"
  on public.posts
  for select
  to anon, authenticated
  using (true);

create policy "Admins can insert posts"
  on public.posts
  for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "Admins can update posts"
  on public.posts
  for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins can delete posts"
  on public.posts
  for delete
  to authenticated
  using ((select public.is_admin()));

-- To explicitly grant administrator access to an existing Auth account:
-- insert into public.admin_users (user_id, is_admin)
-- select id, true from auth.users where email = 'admin@example.com'
-- on conflict (user_id) do update set is_admin = excluded.is_admin;
