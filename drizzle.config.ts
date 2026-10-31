/**
 * OPTIONAL (database). Configures `drizzle-kit`, which writes and applies migrations. It uses
 * `DATABASE_URL` from `.env.local`, or the embedded database when that is not set.
 */
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";
import {
  DEFAULT_DATABASE_URL,
  isPgliteUrl,
  preparePgliteDataDir,
} from "./src/core/config/database-url";

loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/data/local/database/schema.ts",
  out: "./src/data/local/database/migrations",
  ...(isPgliteUrl(url)
    ? {
        driver: "pglite",
        dbCredentials: { url: preparePgliteDataDir(url) ?? "" },
      }
    : { dbCredentials: { url } }),
});
