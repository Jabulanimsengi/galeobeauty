-- ============================================
-- PRODUCTS & E-COMMERCE TABLES
-- ============================================

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  brand text,
  short_description text,
  description text not null,
  category text not null,               -- 'skincare', 'haircare', 'nails', 'body', 'tools'
  subcategory text,                     -- 'moisturizer', 'serum', 'shampoo', etc.
  base_price_cents integer not null,    -- base price in cents (ZAR)
  compare_at_price_cents integer,       -- original/RRP price for sale display
  currency char(3) not null default 'ZAR',
  images jsonb not null default '[]'::jsonb,  -- array of Cloudinary image paths
  tags text[] default '{}',
  is_active boolean not null default true,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  weight_grams integer,
  ingredients text,
  usage_instructions text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Product variants table (e.g., 50ml, 100ml, Light, Dark)
create table if not exists product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,                   -- e.g., '50ml', '100ml', 'Light', 'Medium'
  sku text,
  price_cents integer,                  -- null = use product base_price_cents
  compare_at_price_cents integer,       -- null = use product compare_at_price_cents
  is_default boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,    -- human-readable: GB-20260424-XXXX
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'processing', 'ready', 'completed', 'shipped', 'cancelled', 'refunded')),
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  delivery_method text not null default 'pickup'
    check (delivery_method in ('pickup', 'delivery')),
  delivery_address jsonb,               -- { street, city, province, postalCode }
  delivery_fee_cents integer not null default 0,
  subtotal_cents integer not null,
  total_cents integer not null,
  currency char(3) not null default 'ZAR',
  payment_method text,                  -- 'payfast', 'eft'
  payment_reference text,              -- PayFast pf_payment_id
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'paid', 'failed', 'refunded')),
  paid_at timestamptz,
  items_json jsonb not null,           -- snapshot of cart items at time of order
  item_count integer not null,
  notes text,
  source text,
  landing_page text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes for products
create index if not exists products_slug_idx on products (slug);
create index if not exists products_category_idx on products (category);
create index if not exists products_is_active_idx on products (is_active) where is_active;
create index if not exists products_is_featured_idx on products (is_featured) where is_featured;
create index if not exists products_sort_order_idx on products (sort_order, created_at desc);

-- Indexes for product_variants
create index if not exists product_variants_product_id_idx on product_variants (product_id);

-- Indexes for orders
create index if not exists orders_order_number_idx on orders (order_number);
create index if not exists orders_status_idx on orders (status);
create index if not exists orders_payment_status_idx on orders (payment_status);
create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_customer_phone_idx on orders (customer_phone);

-- Updated_at triggers
create or replace function set_products_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
before update on products
for each row
execute function set_products_updated_at();

create or replace function set_orders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
before update on orders
for each row
execute function set_orders_updated_at();
