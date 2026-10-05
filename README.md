## Project WakaMoe
### Quick Start
```bash
npm install
npm run dev
npm run build
```

### Migrating constants to Supabase

Run [`supabase/posts-migration.sql`](./supabase/posts-migration.sql) in the Supabase
SQL Editor first. Then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the
ignored local `.env` file and, only if intentionally repeating the migration, run:

```bash
npx tsx utils/migrate.ts --dry-run
npx tsx utils/migrate.ts
```

There is intentionally no `migrate` npm script, to prevent accidental execution of
this one-time data migration. The standalone `tsx` runner avoids `ts-node` and ESM
loader conflicts.

The dry run validates the local constants and prints source counts without connecting
to Supabase. The migration reads Creator, Game, Reference, and Media records and
upserts them in batches of 500. Card-specific fields such as links, tags, and game
links are kept in `metadata`; stable `source_key` values make repeat runs update the
same migrated records instead of inserting duplicates. The script verifies that all
source records are present after writing. The service-role key bypasses row-level
security, so keep it only in `.env`, never use a `VITE_` prefix, and never commit it.

### Live Supabase posts

The site reads `posts` from Supabase and refreshes the displayed cards when rows are
inserted, updated, or deleted. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in
local `.env` for development, and add the same values as GitHub Actions secrets or
repository variables for the Pages build. These are public client settings; never use
the service-role key in the site.

Enable Realtime for the `public.posts` table in the Supabase project and allow the
anonymous role to select the rows that should appear on the public site. The browser
query sorts posts by `id`.

### Admin authentication and posts security

Run [`supabase/posts-rls.sql`](./supabase/posts-rls.sql) in the Supabase SQL Editor.
It enables RLS, permits public reads, and permits writes only to authenticated users
listed in `public.admin_users`. Create the administrator's account in Supabase Auth,
then run the commented `INSERT ... SELECT` statement in that SQL file with the
administrator's email to grant access. Do not grant administrator membership through
client-side code. The script replaces all existing RLS policies on `public.posts` so
older permissive policies cannot override these rules.

When `?yukina` is present, the admin panel requires a persisted Supabase Auth session
and checks the account against `public.is_admin()` before showing the panel. The
Supabase client stores the session in the browser and refreshes tokens automatically.

### Managing cards

Open `?yukina` and sign in with an account listed in `public.admin_users`. The
dashboard reads the cards from Supabase and inserts, updates, or deletes rows directly
in `public.posts`. Standard card fields use table columns; optional type-specific
links, tags, and other card metadata are stored in the `metadata` JSONB column.
Supabase Realtime updates the public card list after successful changes. The existing
constants data is only needed for the one-time migration and is no longer the admin
write path.
### Local to Git
```bash
git add .
git commit -m "Your message"
git push
```

### Git to Local
```bash
git pull origin main
```
