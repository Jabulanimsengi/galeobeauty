import "server-only";
import { Pool } from "pg";

declare global {
  var galeoPostgresPool: Pool | undefined;
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim();

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return databaseUrl;
}

export function getPostgresPool() {
  if (!global.galeoPostgresPool) {
    global.galeoPostgresPool = new Pool({
      connectionString: getDatabaseUrl(),
      max: 10,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }

  return global.galeoPostgresPool;
}
