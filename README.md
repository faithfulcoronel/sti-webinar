# STI Creative Events (interface only)

The interface for the event page and registration form, built from the mock design in `design/`.

- Stack: Next.js (App Router), TypeScript, Tailwind CSS.
- One page: event details and the registration form (two columns on desktop, one column on mobile).
- Colors, type, spacing, radius and field states come from `design/design-spec.md`, set up as tokens in `tailwind.config.ts`.
- No backend yet. The Register button saves nothing and says so.

## Run it
```
npm install
npm run dev
```
Open http://localhost:3000.

## Supabase connection
The Supabase client helpers are in `src/utils/supabase/` (server, browser and middleware). `src/middleware.ts` keeps sessions refreshed.

Copy `.env.example` to `.env.local` and fill in your project URL and publishable key. The form is not saving to the database yet.
