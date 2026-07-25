create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  item_name text not null,
  category text not null,
  rating text not null check (rating in ('good', 'neutral', 'bad')),
  paid_at date not null,
  memo text,
  created_at timestamptz not null default now()
);

create index expenses_user_id_paid_at_idx
  on public.expenses (user_id, paid_at desc);

alter table public.expenses enable row level security;

create policy "expenses_select_own" on public.expenses
  for select to authenticated
  using ( (select auth.uid()) = user_id );

create policy "expenses_insert_own" on public.expenses
  for insert to authenticated
  with check ( (select auth.uid()) = user_id );

create policy "expenses_update_own" on public.expenses
  for update to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

create policy "expenses_delete_own" on public.expenses
  for delete to authenticated
  using ( (select auth.uid()) = user_id );
