alter table bookings
  add column if not exists admin_notes text,
  add column if not exists contacted_at timestamptz;
