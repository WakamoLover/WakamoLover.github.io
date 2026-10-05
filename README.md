## Project WakaMoe
### Quick Start
```bash
npm install
npm run dev
npm run build
```

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
whose `public.admin_users.is_admin` value is `true`. The admin client can read only
the signed-in user's own admin status; admin membership must be managed in SQL and
never from client-side code. The script replaces all existing RLS policies on
`public.posts` so older permissive policies cannot override these rules.

When `?yukina` is present, the admin panel requires a persisted Supabase Auth session
and checks the session user's `user_id` and `is_admin` fields before showing the panel. The
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
