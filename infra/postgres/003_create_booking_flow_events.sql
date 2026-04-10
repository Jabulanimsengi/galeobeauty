create table if not exists booking_flow_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null check (
    event_name in (
      'booking_sheet_open',
      'booking_whatsapp_submit',
      'booking_requirements_completed_whatsapp_submit'
    )
  ),
  booking_type text not null check (booking_type in ('treatment', 'consultation')),
  source text,
  medium text,
  campaign text,
  landing_page text,
  enquiry_page text,
  consultation_context text,
  treatment_count integer,
  treatment_names text,
  total_value numeric(10,2),
  requirements_complete boolean,
  required_fields_completed integer,
  required_fields_total integer,
  has_required_name boolean,
  has_required_phone boolean,
  has_required_date boolean,
  has_required_time_slot boolean,
  has_required_treatments boolean,
  has_optional_email boolean,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists booking_flow_events_created_at_idx
  on booking_flow_events (created_at desc);

create index if not exists booking_flow_events_name_created_at_idx
  on booking_flow_events (event_name, created_at desc);
