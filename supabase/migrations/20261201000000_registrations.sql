-- STI Creative Events: registrations table.
-- Security model: the browser NEVER talks to this table. Only server code using the
-- service role key reads or writes it. RLS is on and there are no policies, so the
-- anon and authenticated roles are denied even if someone finds the project URL.

create table if not exists public.registrations (
  id          uuid primary key default gen_random_uuid(),
  event_slug  text not null,
  full_name   text not null check (char_length(full_name) between 2 and 100),
  email       text not null check (char_length(email) <= 254),
  program     text not null,
  idea        text check (idea is null or char_length(idea) <= 280),
  created_at  timestamptz not null default now()
);

-- Duplicate prevention lives in the database, so it holds even if two requests race.
create unique index if not exists registrations_event_email_key
  on public.registrations (event_slug, lower(email));

alter table public.registrations enable row level security;

revoke all on public.registrations from anon, authenticated;
grant all on public.registrations to service_role;
