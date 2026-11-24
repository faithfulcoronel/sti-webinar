-- STI Creative Events: the registrations table.
-- Run this once in the Supabase SQL editor of the demo project.
--
-- Security model: the browser never talks to this table. Only server code that uses
-- the service role key reads or writes it. Row Level Security is on and there are no
-- policies, so the public (anon) and signed-in (authenticated) roles are denied.

create table if not exists public.registrations (
  id          uuid primary key default gen_random_uuid(),
  event       text not null,
  full_name   text not null check (char_length(full_name) between 2 and 100),
  email       text not null check (char_length(email) <= 254),
  program     text not null,
  idea        text check (idea is null or char_length(idea) <= 280),
  created_at  timestamptz not null default now()
);

-- One registration per email per event. The database enforces it, so it holds
-- even when two requests arrive at the same moment.
create unique index if not exists registrations_event_email_key
  on public.registrations (event, lower(email));

alter table public.registrations enable row level security;

revoke all on public.registrations from anon, authenticated;
grant all on public.registrations to service_role;
