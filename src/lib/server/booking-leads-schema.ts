import "server-only";
import { z } from "zod";
import { getPostgresPool } from "@/lib/server/postgres";

declare global {
  var galeoBookingLeadsSchemaReady: Promise<void> | undefined;
}

const BOOKING_LEADS_SCHEMA_SQL = `
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
  status text not null default 'pending',
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
`;

const optionalTrimmedStringSchema = z
  .string()
  .trim()
  .max(1000)
  .nullable()
  .optional();

export const bookingLeadInputSchema = z.object({
  sessionId: z.string().trim().min(1).max(200),
  bookingType: z.enum(["treatment", "consultation"]),
  consultationContext: optionalTrimmedStringSchema,
  userDetails: z
    .object({
      name: z.string().max(200).default(""),
      phone: z.string().max(80).default(""),
      email: z.string().max(320).default(""),
    })
    .default({
      name: "",
      phone: "",
      email: "",
    }),
  appointment: z
    .object({
      date: z.string().max(20).default(""),
      timeSlot: z.string().max(80).default(""),
    })
    .default({
      date: "",
      timeSlot: "",
    }),
  treatments: z.array(z.any()).default([]),
  attribution: z.any().nullable().optional(),
  currentPage: z.string().max(1000).optional(),
});

export type BookingLeadInput = z.infer<typeof bookingLeadInputSchema>;

export const bookingLeadStatusSchema = z.enum([
  "pending",
  "contacted",
  "dismissed",
  "abandoned",
  "submitted",
]);

export const bookingLeadAdminUpdateSchema = z.object({
  status: bookingLeadStatusSchema.default("pending"),
  adminNotes: z.string().max(2000).nullable().optional(),
});

export type BookingLeadAdminUpdateInput = z.infer<typeof bookingLeadAdminUpdateSchema>;

export async function ensureBookingLeadsSchema() {
  if (!global.galeoBookingLeadsSchemaReady) {
    global.galeoBookingLeadsSchemaReady = getPostgresPool()
      .query(BOOKING_LEADS_SCHEMA_SQL)
      .then(() => undefined)
      .catch((error) => {
        global.galeoBookingLeadsSchemaReady = undefined;
        throw error;
      });
  }

  return global.galeoBookingLeadsSchemaReady;
}
