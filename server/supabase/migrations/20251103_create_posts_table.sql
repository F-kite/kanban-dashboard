-- Таблица задач (posts) для Kanban Dashboard

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text check (status in ('todo', 'in_progress', 'done')) default 'todo',
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  position integer not null default 0,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now()),

  -- если в будущем добавишь таблицу пользователей:
  user_id uuid references public.users(id) on delete set null
);

-- Индексы для ускорения сортировки и выборок
create index if not exists idx_posts_status on public.posts(status);
create index if not exists idx_posts_priority on public.posts(priority);
create index if not exists idx_posts_position on public.posts(position);

-- Триггер на автообновление updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_posts_updated_at on public.posts;

create trigger update_posts_updated_at
before update on public.posts
for each row
execute function update_updated_at_column();
