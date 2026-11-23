# STI Creative Events (seminar demo)

Sample student event registration app for the seminar **"MAKING IT WORK!"**.
Next.js 15 (App Router) · TypeScript · Tailwind CSS 3 · Supabase · Vercel.

> Teaching project. Use **test data only**. Not a production system (see "What this is not").

## Three demo states (git tags)

| Tag | What it is | What works |
|---|---|---|
| `state-a` | UI scaffold | Looks finished. The form does nothing. No backend. |
| `state-b` | Functional app | Validation, server route, database storage, duplicate prevention, confirmation, organizer sign-in |
| `state-c` | Deploy-ready | State B plus deployment checklist (`DEPLOY.md`). Becomes "deployed" only after you do the steps in it. |

```bash
git checkout state-a     # start of the live demo
git checkout state-b     # the finished functional app
git checkout state-c     # same code + deploy notes
```

## Run locally

```bash
npm install
cp .env.example .env.local      # fill in your own Supabase values
npm run dev                     # http://localhost:3000
npm run typecheck && npm test && npm run build
```

**No Supabase yet? Rehearse with the in-memory store:** put `DEMO_STORE=memory` in `.env.local`.
Registration, validation, duplicates and confirmation work; data disappears on restart; the organizer view
needs real Supabase. The app refuses this mode when `NODE_ENV=production`.

## Supabase setup (once)

1. Create a **new, empty Supabase project just for the demo** (never reuse a real project).
2. SQL editor: run `supabase/migrations/20261201000000_registrations.sql`.
3. Authentication → Users → add one organizer user (email + password, auto-confirm).
4. Copy URL, anon key and service-role key into `.env.local`; set `ORGANIZER_EMAILS` to the organizer's email.

## How it is protected

- The browser never talks to the `registrations` table. RLS is enabled with **no policies**, and `anon` / `authenticated` have no grants.
- All reads and writes happen in server code with the service-role key (server-only module, no `NEXT_PUBLIC_` prefix).
- Validation runs in the browser (fast feedback) **and** on the server (the one that counts).
- Duplicates are blocked by a unique index on `(event, lower(email))`, so concurrent requests cannot slip through.
- `/organizer` verifies the signed-in user with Supabase (`getUser`) and an `ORGANIZER_EMAILS` allowlist on every request.
- Errors are logged on the server; the browser only sees friendly messages.

## What this is not (be honest with students)

No rate limiting beyond a honeypot field, no email confirmation, no CAPTCHA, no audit log, no data-retention or
privacy-notice flow, no automated end-to-end tests, and the unit tests only cover validation. Collecting real student
data needs permission, a privacy notice and a retention plan. That gap between "works" and "production-ready" is the
point of the seminar.
