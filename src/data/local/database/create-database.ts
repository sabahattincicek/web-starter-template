/**
 * OPTIONAL (database). Opens the database a URL points to: embedded PGlite for local development,
 * or any Postgres server (Neon, Supabase, your own) in production. Repositories use the same
 * Drizzle API with both.
 */
import "server-only";
import { PGlite } from "@electric-sql/pglite";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { isPgliteUrl, preparePgliteDataDir } from "@/core/config/database-url";
import * as schema from "./schema";

export type Database = PgDatabase<PgQueryResultHKT, typeof schema>;

export function createDatabase(url: string): Database {
  if (isPgliteUrl(url)) {
    return drizzlePglite(new PGlite(preparePgliteDataDir(url)), { schema });
  }
  // Connection poolers in transaction mode (Supabase, Neon) do not support prepared statements.
  return drizzlePostgres(postgres(url, { prepare: false }), { schema });
}
