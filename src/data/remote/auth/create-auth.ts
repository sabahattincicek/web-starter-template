/**
 * OPTIONAL (auth). Configures Better Auth: email and password, plus Google when its keys are set.
 * Users and sessions are stored in the app's own database.
 */
import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import type { Env } from "@/core/config/env";
import type { Database } from "@/data/local/database/create-database";
import * as schema from "@/data/local/database/schema";

export type Auth = ReturnType<typeof createAuth>;

export function createAuth(database: Database, env: Env) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;
  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(database, { provider: "pg", schema }),
    emailAndPassword: { enabled: true },
    socialProviders:
      GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: GOOGLE_CLIENT_ID,
              clientSecret: GOOGLE_CLIENT_SECRET,
            },
          }
        : undefined,
    // Lets Server Actions set the session cookie. It must stay the last plugin.
    plugins: [nextCookies()],
  });
}
