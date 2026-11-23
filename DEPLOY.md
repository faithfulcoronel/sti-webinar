# Deploying to Vercel (State C checklist)

This repository has **not** been deployed by the author of these files. State C becomes real only after you finish and tick every box below. Do the whole thing at least once before the seminar.

## One-time setup
- [ ] Push this repo to your own GitHub account.
- [ ] Vercel → Add New Project → import the repo. Framework preset: Next.js (auto).
- [ ] Project → Settings → Environment Variables (Production AND Preview), add:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`  (secret: leave "Sensitive" on; never use a `NEXT_PUBLIC_` name)
  - `ORGANIZER_EMAILS`
- [ ] Do **not** set `DEMO_STORE` on Vercel.
- [ ] Deploy. Open the production URL.

## Smoke test (write the results down)
- [ ] Home page loads on a phone and a laptop.
- [ ] Submit an empty form: three red messages appear.
- [ ] Submit a valid test registration: confirmation code appears.
- [ ] Submit the same email again: "already registered" message.
- [ ] Supabase → Table editor: exactly one row.
- [ ] `/organizer` while signed out redirects to `/organizer/login`.
- [ ] Sign in as the organizer: the table shows the test row.
- [ ] Sign in as a *different* Supabase user: access is refused.
- [ ] View page source / network tab: the service-role key appears nowhere.

## Before the seminar
- [ ] Delete test rows. Keep the organizer password out of the slides (use a password manager, not a sticky note on screen).
- [ ] Replace the QR placeholder on slide 18 with a QR for the final production URL.
- [ ] Record the screen recording backup (see the demo guide) from this working deployment.
