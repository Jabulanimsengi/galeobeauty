-- Create booking leads table for abandonment tracking
create extension if not exists pgcrypto;

create table if not exists booking_leads (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  booking_type text check (booking_type in ('treatment', 'consultation')),
  consultation_context text,
  client_name text,
  phone text,
  email text,
  preferred_date date,
  preferred_time_slot text,
  treatments_json jsonb not null default '[]'::jsonb,
  treatment_count integer not null default 0,
  total_value numeric(10,2),
  status text not null default 'pending', -- 'pending', 'submitted', 'abandoned', 'contacted'
  contacted_at timestamptz,
  admin_notes text,
  source text,
  medium text,
  campaign text,
  landing_page text,
  enquiry_page text,
  referrer_host text
);

create index if not exists booking_leads_session_id_idx on booking_leads (session_id);
create index if not exists booking_leads_created_at_idx on booking_leads (created_at desc);
create index if not exists booking_leads_status_idx on booking_leads (status);
