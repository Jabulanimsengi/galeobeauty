create extension if not exists pgcrypto;

create table if not exists email_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  email text not null,
  normalized_email text not null unique,
  name text,
  phone text,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed', 'bounced', 'complained')),
  source text not null default 'unknown',
  consent_text text not null,
  consent_version text not null,
  consented_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token text not null unique default encode(gen_random_bytes(24), 'hex'),
  last_email_sent_at timestamptz
);

create index if not exists email_subscribers_status_idx on email_subscribers (status);
create index if not exists email_subscribers_created_at_idx on email_subscribers (created_at desc);
create index if not exists email_subscribers_source_idx on email_subscribers (source);

create table if not exists email_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  subscriber_id uuid references email_subscribers(id) on delete set null,
  booking_id uuid references bookings(id) on delete set null,
  event_type text not null,
  provider text not null default 'resend',
  provider_message_id text,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'skipped')),
  error_message text,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists email_events_created_at_idx on email_events (created_at desc);
create index if not exists email_events_subscriber_id_idx on email_events (subscriber_id);
create index if not exists email_events_booking_id_idx on email_events (booking_id);
create index if not exists email_events_event_type_idx on email_events (event_type);
create index if not exists email_events_status_idx on email_events (status);

create table if not exists email_campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  subject text not null,
  preview_text text,
  offer_title text not null,
  offer_body text not null,
  cta_label text,
  cta_url text,
  attachment_count integer not null default 0,
  attachments_json jsonb not null default '[]'::jsonb,
  recipient_count integer not null default 0,
  sent_count integer not null default 0,
  failed_count integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'sending', 'sent', 'failed'))
);

create index if not exists email_campaigns_created_at_idx on email_campaigns (created_at desc);
create index if not exists email_campaigns_status_idx on email_campaigns (status);

alter table email_campaigns
  add column if not exists attachment_count integer not null default 0,
  add column if not exists attachments_json jsonb not null default '[]'::jsonb;

alter table bookings
  add column if not exists subscriber_opt_in boolean not null default false,
  add column if not exists booking_fee_amount numeric(10,2),
  add column if not exists booking_fee_currency char(3),
  add column if not exists booking_confirmation_email_status text not null default 'pending'
    check (booking_confirmation_email_status in ('pending', 'sent', 'failed', 'skipped')),
  add column if not exists booking_confirmation_email_sent_at timestamptz,
  add column if not exists booking_confirmation_resend_id text,
  add column if not exists booking_confirmation_email_error text;

create or replace function set_email_subscribers_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists email_subscribers_set_updated_at on email_subscribers;

create trigger email_subscribers_set_updated_at
before update on email_subscribers
for each row
execute function set_email_subscribers_updated_at();
