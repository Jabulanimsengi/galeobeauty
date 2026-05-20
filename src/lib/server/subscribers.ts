import "server-only";

import { getPostgresPool } from "@/lib/server/postgres";
import { EMAIL_CONSENT_TEXT, EMAIL_CONSENT_VERSION } from "@/lib/server/email-config";

export type SubscriberSource =
  | "booking"
  | "members_page"
  | "footer"
  | "specials"
  | "admin"
  | "unknown";

export interface SubscriberRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  normalizedEmail: string;
  name: string | null;
  phone: string | null;
  status: string;
  source: string;
  consentText: string;
  consentVersion: string;
  consentedAt: string;
  unsubscribedAt: string | null;
  unsubscribeToken: string;
  lastEmailSentAt: string | null;
}

export interface SubscriberSummary {
  totalSubscribers: number;
  activeSubscribers: number;
  newThisWeek: number;
  unsubscribedSubscribers: number;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanValue(value?: string | null) {
  const normalized = value?.trim();
  return normalized ? normalized : null;
}

export function normalizeEmail(value?: string | null) {
  const normalized = cleanValue(value)?.toLowerCase() ?? "";
  return EMAIL_PATTERN.test(normalized) ? normalized : null;
}

function normalizeSource(value?: string | null): SubscriberSource {
  const source = cleanValue(value);
  if (
    source === "booking" ||
    source === "members_page" ||
    source === "footer" ||
    source === "specials" ||
    source === "admin"
  ) {
    return source;
  }

  return "unknown";
}

function mapSubscriber(row: Record<string, unknown>): SubscriberRecord {
  return {
    id: String(row.id),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    email: String(row.email),
    normalizedEmail: String(row.normalized_email),
    name: (row.name as string | null) ?? null,
    phone: (row.phone as string | null) ?? null,
    status: String(row.status),
    source: String(row.source),
    consentText: String(row.consent_text),
    consentVersion: String(row.consent_version),
    consentedAt: String(row.consented_at),
    unsubscribedAt: (row.unsubscribed_at as string | null) ?? null,
    unsubscribeToken: String(row.unsubscribe_token),
    lastEmailSentAt: (row.last_email_sent_at as string | null) ?? null,
  };
}

export async function upsertSubscriber({
  email,
  name,
  phone,
  source,
}: {
  email: string;
  name?: string | null;
  phone?: string | null;
  source?: string | null;
}) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new Error("Please provide a valid email address.");
  }

  const pool = getPostgresPool();
  const result = await pool.query(
    `insert into email_subscribers (
       email,
       normalized_email,
       name,
       phone,
       status,
       source,
       consent_text,
       consent_version,
       consented_at,
       unsubscribed_at
     ) values (
       $1, $2, $3, $4, 'subscribed', $5, $6, $7, now(), null
     )
     on conflict (normalized_email)
     do update set
       email = excluded.email,
       name = coalesce(excluded.name, email_subscribers.name),
       phone = coalesce(excluded.phone, email_subscribers.phone),
       status = 'subscribed',
       source = excluded.source,
       consent_text = excluded.consent_text,
       consent_version = excluded.consent_version,
       consented_at = now(),
       unsubscribed_at = null
     returning *`,
    [
      email.trim(),
      normalizedEmail,
      cleanValue(name),
      cleanValue(phone),
      normalizeSource(source),
      EMAIL_CONSENT_TEXT,
      EMAIL_CONSENT_VERSION,
    ]
  );

  const subscriber = mapSubscriber(result.rows[0]);

  await recordEmailEvent({
    subscriberId: subscriber.id,
    eventType: "subscribed",
    status: "sent",
    metadata: { source: subscriber.source },
  });

  return subscriber;
}

export async function unsubscribeByToken(token?: string | null) {
  const normalizedToken = cleanValue(token);
  if (!normalizedToken) {
    return null;
  }

  const pool = getPostgresPool();
  const result = await pool.query(
    `update email_subscribers
     set status = 'unsubscribed',
         unsubscribed_at = coalesce(unsubscribed_at, now())
     where unsubscribe_token = $1
     returning *`,
    [normalizedToken]
  );

  if (!result.rows[0]) {
    return null;
  }

  const subscriber = mapSubscriber(result.rows[0]);
  await recordEmailEvent({
    subscriberId: subscriber.id,
    eventType: "unsubscribed",
    status: "sent",
  });

  return subscriber;
}

export async function getSubscriberSummary(): Promise<SubscriberSummary> {
  const pool = getPostgresPool();
  const result = await pool.query<{
    total_subscribers: string;
    active_subscribers: string;
    new_this_week: string;
    unsubscribed_subscribers: string;
  }>(
    `select
       count(*)::text as total_subscribers,
       count(*) filter (where status = 'subscribed')::text as active_subscribers,
       count(*) filter (where created_at >= now() - interval '7 days')::text as new_this_week,
       count(*) filter (where status = 'unsubscribed')::text as unsubscribed_subscribers
     from email_subscribers`
  );

  const row = result.rows[0];
  return {
    totalSubscribers: Number(row?.total_subscribers ?? 0),
    activeSubscribers: Number(row?.active_subscribers ?? 0),
    newThisWeek: Number(row?.new_this_week ?? 0),
    unsubscribedSubscribers: Number(row?.unsubscribed_subscribers ?? 0),
  };
}

export async function listSubscribersForAdmin() {
  const pool = getPostgresPool();
  const result = await pool.query(
    `select *
     from email_subscribers
     order by created_at desc
     limit 500`
  );

  return result.rows.map((row) => mapSubscriber(row));
}

export async function listActiveSubscribersForCampaign() {
  const pool = getPostgresPool();
  const result = await pool.query(
    `select *
     from email_subscribers
     where status = 'subscribed'
     order by created_at desc`
  );

  return result.rows.map((row) => mapSubscriber(row));
}

export async function recordEmailEvent({
  subscriberId,
  bookingId,
  eventType,
  providerMessageId,
  status,
  errorMessage,
  metadata,
}: {
  subscriberId?: string | null;
  bookingId?: string | null;
  eventType: string;
  providerMessageId?: string | null;
  status: "pending" | "sent" | "failed" | "skipped";
  errorMessage?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const pool = getPostgresPool();
  await pool.query(
    `insert into email_events (
       subscriber_id,
       booking_id,
       event_type,
       provider_message_id,
       status,
       error_message,
       metadata
     ) values ($1, $2, $3, $4, $5, $6, $7::jsonb)`,
    [
      subscriberId ?? null,
      bookingId ?? null,
      eventType,
      providerMessageId ?? null,
      status,
      errorMessage ?? null,
      JSON.stringify(metadata ?? {}),
    ]
  );
}

export async function markSubscriberEmailSent(subscriberId: string) {
  const pool = getPostgresPool();
  await pool.query(
    `update email_subscribers
     set last_email_sent_at = now()
     where id = $1`,
    [subscriberId]
  );
}

function escapeCsvValue(value: unknown) {
  if (value === null || value === undefined) {
    return "";
  }

  const text = String(value);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function buildSubscribersCsv(subscribers: SubscriberRecord[]) {
  const headers = [
    "id",
    "created_at",
    "email",
    "name",
    "phone",
    "status",
    "source",
    "consented_at",
    "unsubscribed_at",
    "last_email_sent_at",
  ];

  const rows = subscribers.map((subscriber) =>
    [
      subscriber.id,
      subscriber.createdAt,
      subscriber.email,
      subscriber.name,
      subscriber.phone,
      subscriber.status,
      subscriber.source,
      subscriber.consentedAt,
      subscriber.unsubscribedAt,
      subscriber.lastEmailSentAt,
    ]
      .map((value) => escapeCsvValue(value))
      .join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
