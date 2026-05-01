do $$
declare
  event_name_constraint text;
begin
  select conname
    into event_name_constraint
  from pg_constraint
  where conrelid = 'booking_flow_events'::regclass
    and contype = 'c'
    and pg_get_constraintdef(oid) like '%event_name%'
  limit 1;

  if event_name_constraint is not null then
    execute format('alter table booking_flow_events drop constraint %I', event_name_constraint);
  end if;
end $$;

alter table booking_flow_events
  add constraint booking_flow_events_event_name_check
  check (
    event_name in (
      'booking_sheet_open',
      'booking_step_view',
      'booking_sheet_close',
      'booking_validation_error',
      'booking_save_failed',
      'booking_whatsapp_submit',
      'booking_requirements_completed_whatsapp_submit'
    )
  );

create table if not exists site_monitoring_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null check (
    event_name in (
      'whatsapp_click',
      'phone_click',
      'directions_click',
      'email_click',
      'external_link_click'
    )
  ),
  event_category text,
  event_label text,
  link_type text,
  link_label text,
  link_context text,
  destination_url text,
  destination_host text,
  source text,
  medium text,
  campaign text,
  landing_page text,
  enquiry_page text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists site_monitoring_events_created_at_idx
  on site_monitoring_events (created_at desc);

create index if not exists site_monitoring_events_name_created_at_idx
  on site_monitoring_events (event_name, created_at desc);

create index if not exists site_monitoring_events_source_created_at_idx
  on site_monitoring_events (source, medium, created_at desc);
