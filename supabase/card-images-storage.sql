-- Run in the Supabase SQL Editor to create/configure the public image buckets.
-- Only authenticated users recognized by public.is_admin() may upload into them.
insert into storage.buckets (id, name, public)
values
  ('game', 'game', true),
  ('ref', 'ref', true),
  ('media', 'media', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Admins can upload card images" on storage.objects;

create policy "Admins can upload card images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('game', 'ref', 'media')
    and (select public.is_admin())
  );
