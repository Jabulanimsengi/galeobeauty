create extension if not exists pgcrypto;

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new',
  booking_type text not null check (booking_type in ('treatment', 'consultation')),
  consultation_context text,
  client_name text not null,
  phone text not null,
  email text,
  preferred_date date not null,
  preferred_time_slot text not null check (preferred_time_slot in ('morning', 'afternoon', 'late-afternoon')),
  treatments_json jsonb not null default '[]'::jsonb,
  treatment_count integer not null default 0,
  total_value numeric(10,2),
  currency char(3),
  booking_reference text,
  whatsapp_message text not null,
  whatsapp_destination text,
  submitted_to_whatsapp boolean not null default true,
  submitted_to_whatsapp_at timestamptz,
  source text,
  medium text,
  campaign text,
  landing_page text,
  enquiry_page text,
  referrer_host text
);

create index if not exists bookings_created_at_idx on bookings (created_at desc);
create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_booking_type_idx on bookings (booking_type);
create index if not exists bookings_preferred_date_idx on bookings (preferred_date);
create index if not exists bookings_phone_idx on bookings (phone);

create or replace function set_bookings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on bookings;

create trigger bookings_set_updated_at
before update on bookings
for each row
execute function set_bookings_updated_at();
