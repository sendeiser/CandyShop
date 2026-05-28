-- ============================================================
-- Candy Shop - Schema Completo + Trigger + Admin
-- ============================================================

-- 1. EXTENSIONS
create extension if not exists "pgcrypto";

-- 2. TABLES

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  phone text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  price int not null check (price >= 0),
  category_id uuid references public.categories on delete set null,
  image_url text,
  weight_options jsonb default '[{"label":"100g","grams":100,"price":0},{"label":"250g","grams":250,"price":0},{"label":"500g","grams":500,"price":0},{"label":"1kg","grams":1000,"price":0}]'::jsonb,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$ begin
  create type order_status as enum ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles on delete set null,
  status order_status not null default 'pending',
  total int not null check (total >= 0),
  shipping_address jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders on delete cascade not null,
  product_id uuid references public.products on delete set null,
  product_name text not null,
  quantity int not null check (quantity > 0),
  weight_label text not null,
  unit_price int not null check (unit_price >= 0)
);

-- 3. RLS + FUNCTION

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
security invoker
as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Profiles
create policy "Profiles are public readable"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Categories
create policy "Anyone can read categories"
  on public.categories for select
  to anon, authenticated
  using (true);

create policy "Admins can manage categories"
  on public.categories for all
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Products
create policy "Anyone can read active products"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

create policy "Admins can manage products"
  on public.products for all
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Orders
create policy "Users can read own orders"
  on public.orders for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin(auth.uid()));

create policy "Users can create orders"
  on public.orders for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Admins can update orders"
  on public.orders for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

-- Order items
create policy "Users can read own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and (orders.user_id = auth.uid() or public.is_admin(auth.uid()))
    )
  );

create policy "Users can create order items"
  on public.order_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- 4. STORAGE

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Anyone can read product images" on storage.objects;
drop policy if exists "Admins can upload product images" on storage.objects;
drop policy if exists "Admins can delete product images" on storage.objects;

create policy "Anyone can read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Admins can upload product images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'product-images'
    and public.is_admin(auth.uid())
  );

create policy "Admins can delete product images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'product-images'
    and public.is_admin(auth.uid())
  );

-- 5. SEED DATA

insert into public.categories (name, slug, description, sort_order) values
  ('Gomitas por Kilo', 'gomitas-por-kilo', 'Gomitas sueltas al peso que más quieras', 1),
  ('Bolsitas Surtidas', 'bolsitas-surtidas', 'Bolistias de 100g y 250g con variedad', 2),
  ('Candy Boxes & Regalos', 'candy-boxes', 'Cajas armadas para regalar', 3),
  ('Combos para Eventos', 'combos-eventos', 'Combos para cumpleaños y fiestas', 4)
on conflict (slug) do nothing;

insert into public.products (name, slug, description, price, category_id, is_featured, weight_options) values
  ('Ositos de Gelatina', 'ositos-gelatina', 'Los clásicos ositos de gelatina con sabores frutales irresistibles.', 1200, (select id from public.categories where slug = 'gomitas-por-kilo'), true, '[{"label":"100g","grams":100,"price":1200},{"label":"250g","grams":250,"price":2800},{"label":"500g","grams":500,"price":5200},{"label":"1kg","grams":1000,"price":9500}]'::jsonb),
  ('Corazones Frutales', 'corazones-frutales', 'Corazones de gelatina con sabor a frutilla, frambuesa y cereza.', 1400, (select id from public.categories where slug = 'gomitas-por-kilo'), true, '[{"label":"100g","grams":100,"price":1400},{"label":"250g","grams":250,"price":3200},{"label":"500g","grams":500,"price":5800},{"label":"1kg","grams":1000,"price":10500}]'::jsonb),
  ('Gusanos Ácidos', 'gusanos-acidos', 'Gusanos con cubierta ácida y centro dulce.', 1100, (select id from public.categories where slug = 'gomitas-por-kilo'), true, '[{"label":"100g","grams":100,"price":1100},{"label":"250g","grams":250,"price":2500},{"label":"500g","grams":500,"price":4800},{"label":"1kg","grams":1000,"price":8800}]'::jsonb),
  ('Mix Frutal', 'mix-frutal', 'Combinación de las mejores gomitas frutales en un solo mix.', 1500, (select id from public.categories where slug = 'gomitas-por-kilo'), true, '[{"label":"100g","grams":100,"price":1500},{"label":"250g","grams":250,"price":3500},{"label":"500g","grams":500,"price":6200},{"label":"1kg","grams":1000,"price":11500}]'::jsonb),
  ('Aros de Fruta', 'aros-fruta', 'Aros de gelatina con sabor a frutas tropicales.', 1300, (select id from public.categories where slug = 'gomitas-por-kilo'), false, '[{"label":"100g","grams":100,"price":1300},{"label":"250g","grams":250,"price":3000},{"label":"500g","grams":500,"price":5500},{"label":"1kg","grams":1000,"price":10000}]'::jsonb),
  ('Botellas de Coca', 'botellas-coca', 'Las clásicas botellitas de gelatina sabor cola.', 1200, (select id from public.categories where slug = 'gomitas-por-kilo'), false, '[{"label":"100g","grams":100,"price":1200},{"label":"250g","grams":250,"price":2800},{"label":"500g","grams":500,"price":5200},{"label":"1kg","grams":1000,"price":9500}]'::jsonb)
on conflict (slug) do nothing;

-- 6. AUTO-PROFILE TRIGGER

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    'client'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 7. ADMIN USER
-- Crea el usuario admin
insert into auth.users (
  id, email, encrypted_password, email_confirmed_at, role,
  raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at, is_sso_user, is_anonymous
) values (
  gen_random_uuid(),
  'admin@candyshop.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  'authenticated',
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin"}',
  now(), now(), false, false
);

-- Le asigna rol admin
update public.profiles set role = 'admin', name = 'Admin'
where email = 'admin@candyshop.com';
