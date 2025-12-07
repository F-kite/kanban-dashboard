create table if not exists public.users (
  id uuid default gen_random_uuid() primary key,
  username text not null,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc', now())
);
