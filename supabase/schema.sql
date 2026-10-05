create table if not exists public.cards (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  subtitle text,
  description text not null default '',
  cover_image text not null default '',
  icon_image text,
  type text not null check (type in ('IMAGE', 'VIDEO', 'REF', 'GAME')),
  category text,
  tags text[] not null default '{}',
  video_url text,
  channel_url text,
  external_link text,
  game_links jsonb not null default '[]'::jsonb,
  image_index integer,
  slider_images text[] not null default '{}'
);

alter table public.cards enable row level security;

grant select on public.cards to anon, authenticated;
grant insert, update, delete on public.cards to authenticated;

create policy "Cards are publicly readable"
  on public.cards for select
  to anon, authenticated
  using (true);

create policy "Configured admin can insert cards"
  on public.cards for insert
  to authenticated
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = lower('YOUR_ADMIN_EMAIL'));

create policy "Configured admin can update cards"
  on public.cards for update
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = lower('YOUR_ADMIN_EMAIL'))
  with check (lower(coalesce(auth.jwt() ->> 'email', '')) = lower('YOUR_ADMIN_EMAIL'));

create policy "Configured admin can delete cards"
  on public.cards for delete
  to authenticated
  using (lower(coalesce(auth.jwt() ->> 'email', '')) = lower('YOUR_ADMIN_EMAIL'));
