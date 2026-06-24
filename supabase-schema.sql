-- Current app schema for cloud sync
-- The frontend expects users, parcels, and racks tables.

create table if not exists public.users (
  id serial primary key,
  username text unique,
  email text unique not null,
  password text,
  name text,
  id_no text,
  phone text,
  role text not null default 'student',
  profile_pic text,
  created_at timestamptz not null default now()
);

create table if not exists public.parcels (
  id bigint primary key,
  tracking_no text,
  sender text,
  recipient_username text,
  status text,
  date_received date,
  location text,
  description text,
  otp text,
  rack_location text,
  weight text,
  created_at timestamptz not null default now()
);

-- Run these once if your existing parcels table was created with older names.
alter table public.parcels alter column id type bigint;
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'parcels' and column_name = 'trackingno') then
    alter table public.parcels rename column trackingno to tracking_no;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'parcels' and column_name = 'recipient') then
    alter table public.parcels rename column recipient to recipient_username;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'parcels' and column_name = 'datereceived') then
    alter table public.parcels rename column datereceived to date_received;
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'parcels' and column_name = 'racklocation') then
    alter table public.parcels rename column racklocation to rack_location;
  end if;
end $$;

create table if not exists public.racks (
  id integer primary key,
  rack_data jsonb not null,
  updated_at timestamptz not null default now()
);

-- Keep older helper tables if needed for previous versions
create table if not exists public.profiles (
  username text primary key,
  auth_user_id uuid references auth.users(id) on delete set null,
  email text unique not null,
  name text not null,
  id_no text,
  phone text,
  role text not null default 'student' check (role in ('student', 'staff', 'admin')),
  profile_pic text,
  created_at timestamptz not null default now()
);

create table if not exists public.app_state (
  id text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- For this app variant, keep RLS off on users/parcels/racks so anon access works with the current client setup.
-- If you later migrate to Supabase Auth, add RLS policies and authenticated access rules.
