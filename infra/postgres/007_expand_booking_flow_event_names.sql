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
      'service_cta_click',
      'booking_treatment_added',
      'booking_treatment_removed',
      'booking_sheet_open',
      'booking_step_view',
      'booking_date_selected',
      'booking_time_selected',
      'booking_sheet_close',
      'booking_idle_abandon',
      'booking_validation_error',
      'booking_save_failed',
      'booking_whatsapp_submit',
      'booking_requirements_completed_whatsapp_submit'
    )
  );
