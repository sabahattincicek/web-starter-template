/**
 * Decides which database a connection string points to. Kept free of framework imports because
 * both the app and `drizzle.config.ts` use it.
 */

import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

/** Used in development when `DATABASE_URL` is not set: an embedded Postgres stored in `.data/`. */
export const DEFAULT_DATABASE_URL = "pglite://.data/pglite";

const PGLITE_PREFIX = "pglite://";

/** Returns true for an embedded PGlite URL, false for a real Postgres server. */
export function isPgliteUrl(url: string): boolean {
  return url.startsWith(PGLITE_PREFIX);
}

/**
 * Returns the PGlite data folder of a URL, or `undefined` for `pglite://memory`, which keeps the
 * database in memory.
 */
export function pgliteDataDir(url: string): string | undefined {
  const path = url.slice(PGLITE_PREFIX.length);
  return path === "memory" ? undefined : path;
}

/**
 * Returns the data folder like `pgliteDataDir`, and creates its parent, because PGlite only creates
 * the last folder of the path and a fresh clone has no `.data/` yet.
 */
export function preparePgliteDataDir(url: string): string | undefined {
  const dataDir = pgliteDataDir(url);
  if (dataDir) {
    mkdirSync(dirname(dataDir), { recursive: true });
  }
  return dataDir;
}
