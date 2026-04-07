# PostgreSQL Bookings Setup

This project now includes a server-side bookings persistence path backed by PostgreSQL.

## App changes

- `src/app/api/bookings/route.ts` inserts booking records into Postgres.
- `src/components/booking/BookingSheet.tsx` stores the booking before opening WhatsApp.
- `src/lib/bookings.ts` validates and normalizes booking payloads.
- `src/lib/server/postgres.ts` provides the shared Postgres connection pool.

## Database schema

- Migration file: `infra/postgres/001_create_bookings.sql`
- Main table: `bookings`

## Server layout

- PostgreSQL service: system package on the Hetzner VPS
- Listen address: `127.0.0.1:5432`
- Database name: `galeobeauty`
- Database role: `galeo_app`
- App env files:
  - `/var/www/galeobeauty-blue/.env.local`
  - `/var/www/galeobeauty-green/.env.local`
- Backup directory: `/var/backups/galeobeauty-postgres`
- Backup script: `/usr/local/bin/galeobeauty-postgres-backup.sh`
- Backup schedule: daily at `02:30`

## Credentials

- Database password file on the server: `/root/.galeobeauty-db-pass`

## Go-live note

The database is live on the server, but the new API and booking-save flow only become active after the updated app code is deployed to a slot and switched live.
