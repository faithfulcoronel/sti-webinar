-- STI Creative Events: organizer profiles.
-- One row per organizer login, holding what the organizer tells us about themselves.
--
-- Same security model as registrations: only server code with the service role key
-- reads or writes this table. Row Level Security is on and there are no policies.

create table if not exists public.organizer_profiles (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null check (char_length(full_name) between 2 and 100),
  role_title  text check (role_title is null or char_length(role_title) <= 60),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.organizer_profiles enable row level security;

revoke all on public.organizer_profiles from anon, authenticated;
grant all on public.organizer_profiles to service_role;
