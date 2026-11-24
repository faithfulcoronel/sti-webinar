# STI Creative Events

A small, real event registration app: event details, a registration form that saves to Supabase, a confirmation code, and a protected organizer list. Built from the mock design in `design/`.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, Supabase.

## Folders
Three layers that depend one way only: UI -> business -> data. `npm run lint` fails if a file imports against that direction.

| Folder | What it is for |
|---|---|
| `src/app` | Pages and thin server routes. They pass requests to the business layer. |
| `src/ui/components` | One reusable component per design element (Button, TextField, SelectField, TextAreaField, Card, Badge, FormMessage). |
| `src/ui/features` | Screen parts built from those components (EventDetails, RegistrationForm, the organizer screens). |
| `src/business` | The rules: what is valid, who is an organizer, what happens when someone registers. |
| `src/data` | The only code that talks to Supabase. |
| `supabase/migrations` | The SQL for the `registrations` table. |
| `tests` | Unit tests for the rules. |
| `design` | The mock design and its spec. |

How a registration travels: form (`src/ui`) -> `POST /api/register` (`src/app`) -> `registerForEvent` (`src/business`) -> `saveRegistration` (`src/data`) -> Supabase.

## Setup (once)
1. `npm install`
2. In Supabase, open **SQL Editor**, paste `supabase/migrations/20261201000000_registrations.sql`, and run it.
3. In Supabase, open **Authentication > Users > Add user**. Create one organizer with a demo email and a strong password, and tick **Auto Confirm User**.
4. Copy `.env.example` to `.env.local` and fill in the four values. Put the organizer's email in `ORGANIZER_EMAILS`.
5. `npm run dev`, then open http://localhost:3000.

Never commit `.env.local` and never show it on a projector. `SUPABASE_SERVICE_ROLE_KEY` is a secret.

## Checks
```
npm test          # unit tests for the rules
npm run lint      # code style and the layer rules
npm run typecheck
```

## Test each rule yourself
Use test data only. Keep the Supabase **Table Editor > registrations** tab open to watch rows appear.

| # | Rule | Do this | You should see |
|---|---|---|---|
| 1 | Name, email and program are required | Click **Register** on the empty form | Three red messages, no new row |
| 2 | Email must be valid | Name `Maria Santos`, email `maria.test@example`, any program, Register | "That email does not look right." |
| 3 | Idea at most 280 characters | Fix the email, paste 281 or more characters into the idea box, Register | "Keep it under 280 characters." |
| 4 | It saves, with a confirmation code | Shorten the idea, Register | "Registration confirmed" and a code like `STI-4F9A2C7E`; one new row in Supabase |
| 5 | One registration per email per event | Reload, register again with `MARIA.TEST@example.com` (capital letters) | "This email is already registered for the event." Still one row |
| 6 | The server checks too, not only the browser | Run the `curl` command below | Status 400 and the error messages, no new row |
| 7 | The database refuses duplicates by itself | Run the SQL below in the SQL Editor | `duplicate key value violates unique constraint` |
| 8 | The public cannot read the table | Run the second `curl` command below with your publishable key | `[]` or a permission error, never the rows |
| 9 | The organizer list needs sign-in | Open http://localhost:3000/organizer in a private window | You land on the sign-in page |
| 10 | Wrong password is refused | Sign in with the organizer email and a wrong password | "Sign-in failed. Check your details." |
| 11 | Only emails in `ORGANIZER_EMAILS` get in | Add a second user in Supabase that is not in `ORGANIZER_EMAILS`, sign in as that user | "Sign-in failed. Check your details." |
| 12 | The organizer sees the list | Sign in as the organizer | The Registrations table with the row from test 4 |
| 13 | The check runs on every request | While signed in, remove the email from `ORGANIZER_EMAILS` in `.env.local`, restart `npm run dev`, reload `/organizer` | "Not an organizer", and no list |

Test 6, skipping the browser and its checks:
```
curl -i -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"","email":"nope","program":"Hacker","idea":""}'
```

Test 7, in the Supabase SQL Editor (the second insert must fail):
```sql
insert into public.registrations (event, full_name, email, program)
values ('design-meets-code-night', 'Test Person', 'dup.test@example.com', 'Other');
insert into public.registrations (event, full_name, email, program)
values ('design-meets-code-night', 'Test Person', 'DUP.TEST@example.com', 'Other');
```

Test 8, asking Supabase directly with only the public key:
```
curl "https://YOUR-PROJECT.supabase.co/rest/v1/registrations?select=*" \
  -H "apikey: YOUR_PUBLISHABLE_KEY"
```

Clean up after testing:
```sql
delete from public.registrations where email like '%@example.com';
```
