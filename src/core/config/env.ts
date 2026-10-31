/**
 * Reads and validates the server's environment variables, so a missing value fails with a clear
 * message instead of a confusing error later. Development works with no configuration at all.
 */
import { z } from "zod";
import { DEFAULT_DATABASE_URL } from "./database-url";

const DEVELOPMENT_AUTH_SECRET =
  "development-only-secret-do-not-use-in-production";

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.string().min(1).optional(),
    BETTER_AUTH_URL: z.url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string().min(32).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  })
  .superRefine((env, context) => {
    if (env.NODE_ENV !== "production") return;
    for (const key of ["DATABASE_URL", "BETTER_AUTH_SECRET"] as const) {
      if (!env[key]) {
        context.addIssue({
          code: "custom",
          path: [key],
          message: `${key} is required in production`,
        });
      }
    }
  })
  .transform((env) => ({
    ...env,
    DATABASE_URL: env.DATABASE_URL ?? DEFAULT_DATABASE_URL,
    BETTER_AUTH_SECRET: env.BETTER_AUTH_SECRET ?? DEVELOPMENT_AUTH_SECRET,
  }));

export type Env = z.output<typeof envSchema>;

/** Validates the given variables. Throws with the list of problems when they are invalid. */
export function parseEnv(source: Record<string, string | undefined>): Env {
  // An empty line in a .env file means "not set".
  const values = Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== ""),
  );
  return envSchema.parse(values);
}

let cachedEnv: Env | undefined;

/** Returns the validated environment of this process. */
export function getEnv(): Env {
  cachedEnv ??= parseEnv(process.env);
  return cachedEnv;
}
