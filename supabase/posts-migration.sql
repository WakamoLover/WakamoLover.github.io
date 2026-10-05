-- Run this once in the Supabase SQL Editor before `npm run migrate`.
-- Stable source keys make the constants migration safe to rerun.
alter table public.posts
  add column if not exists source_key text;

create unique index if not exists posts_source_key_key
  on public.posts (source_key);
