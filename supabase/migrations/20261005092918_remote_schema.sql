drop extension if exists "pg_net";

alter table "public"."cards" drop constraint "cards_pkey";

drop index if exists "public"."cards_pkey";

alter table "public"."cards" drop column "badgetext";

alter table "public"."cards" drop column "channelurl";

alter table "public"."cards" drop column "coverimage";

alter table "public"."cards" drop column "externallink";

alter table "public"."cards" drop column "gamelinks";

alter table "public"."cards" drop column "iconimage";

alter table "public"."cards" drop column "ispinned";

alter table "public"."cards" add column "badgeText" text;

alter table "public"."cards" add column "channelUrl" text;

alter table "public"."cards" add column "coverImage" text;

alter table "public"."cards" add column "externalLink" text;

alter table "public"."cards" add column "gameLinks" jsonb;

alter table "public"."cards" add column "iconImage" text;

alter table "public"."cards" add column "isPinned" boolean default false;

alter table "public"."cards" alter column "created_at" set not null;

alter table "public"."cards" enable row level security;

CREATE UNIQUE INDEX "Cards_pkey" ON public.cards USING btree (id);

alter table "public"."cards" add constraint "Cards_pkey" PRIMARY KEY using index "Cards_pkey";


  create policy "Allow admin delete"
  on "public"."cards"
  as permissive
  for delete
  to authenticated
using (true);



  create policy "Allow admin insert"
  on "public"."cards"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Allow admin update"
  on "public"."cards"
  as permissive
  for update
  to authenticated
using (true);



  create policy "Allow public read"
  on "public"."cards"
  as permissive
  for select
  to public
using (true);



