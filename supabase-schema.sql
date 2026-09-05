-- Azzurro Roster database setup
-- Run this once in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'team')),
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  name text not null,
  email text not null unique,
  department text not null check (department in ('reception', 'backoffice', 'housekeeping')),
  performance_score numeric(2,1) not null default 4.0 check (performance_score between 1 and 5),
  max_days smallint not null default 5 check (max_days between 1 and 7),
  available_days smallint[] not null default '{0,1,2,3,4}',
  allowed_properties text[] not null default '{all}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leave_requests (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.team_members(id) on delete cascade,
  submitted_by uuid references auth.users(id) on delete set null,
  start_date date not null,
  end_date date not null,
  reason text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'disapproved')),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  constraint leave_dates_are_valid check (end_date >= start_date)
);

-- Leave can be filed from the public roster without an account.
-- This also makes the script safe if the table was created from an earlier version.
alter table public.leave_requests alter column submitted_by drop not null;

create or replace view public.public_team_members as
  select id, name
  from public.team_members
  where active = true;

create table if not exists public.admin_rosters (
  week_start date primary key,
  assignments jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.published_rosters (
  week_start date primary key,
  data jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index if not exists leave_requests_employee_idx on public.leave_requests(employee_id, start_date, end_date);
create index if not exists leave_requests_status_idx on public.leave_requests(status);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.current_employee_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.team_members where auth_user_id = auth.uid() and active = true limit 1;
$$;

alter table public.user_roles enable row level security;
alter table public.team_members enable row level security;
alter table public.leave_requests enable row level security;
alter table public.admin_rosters enable row level security;
alter table public.published_rosters enable row level security;

drop policy if exists user_roles_read_self on public.user_roles;
create policy user_roles_read_self on public.user_roles
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists team_members_admin_all on public.team_members;
create policy team_members_admin_all on public.team_members
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists team_members_read_self on public.team_members;
create policy team_members_read_self on public.team_members
  for select to authenticated
  using (auth_user_id = auth.uid());

drop policy if exists leave_requests_admin_all on public.leave_requests;
create policy leave_requests_admin_all on public.leave_requests
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists leave_requests_read_own on public.leave_requests;
create policy leave_requests_read_own on public.leave_requests
  for select to authenticated
  using (employee_id = public.current_employee_id());

drop policy if exists leave_requests_insert_own on public.leave_requests;
create policy leave_requests_insert_own on public.leave_requests
  for insert to authenticated
  with check (employee_id = public.current_employee_id() and submitted_by = auth.uid());

drop policy if exists leave_requests_insert_public on public.leave_requests;
create policy leave_requests_insert_public on public.leave_requests
  for insert to anon
  with check (
    submitted_by is null
    and status = 'pending'
    and exists (
      select 1 from public.public_team_members member
      where member.id = employee_id
    )
  );

drop policy if exists admin_rosters_admin_all on public.admin_rosters;
create policy admin_rosters_admin_all on public.admin_rosters
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists published_rosters_public_read on public.published_rosters;
create policy published_rosters_public_read on public.published_rosters
  for select to anon, authenticated
  using (published = true);

drop policy if exists published_rosters_admin_all on public.published_rosters;
create policy published_rosters_admin_all on public.published_rosters
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.published_rosters to anon, authenticated;
grant select on public.public_team_members to anon, authenticated;
grant select on public.user_roles, public.team_members, public.leave_requests to authenticated;
grant insert on public.leave_requests to authenticated;
grant all on public.user_roles, public.team_members, public.admin_rosters, public.published_rosters, public.leave_requests to authenticated;

-- After creating your admin account in Authentication > Users, replace the
-- placeholder UUID with that user's UUID and run:
-- insert into public.user_roles (user_id, role) values ('YOUR-AUTH-USER-UUID', 'admin');
