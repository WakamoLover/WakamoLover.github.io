-- Run in the Supabase SQL Editor after creating the public `card-images` bucket.
-- Only authenticated users recognized by public.is_admin() may upload into it.
drop policy if exists "Admins can upload card images" on storage.objects;

create policy "Admins can upload card images"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'card-images'
    and (select public.is_admin())
  );
