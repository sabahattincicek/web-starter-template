/**
 * The composition root: the one place that creates data-layer classes and hands them to use cases
 * (the role Hilt plays in the Android template). Everything is created on first use, so `next
 * build` needs no database. Server only.
 */
import "server-only";
import { headers } from "next/headers";
import { getEnv } from "@/core/config/env";
import { logger } from "@/core/logging/logger";
import {
  createDatabase,
  type Database,
} from "@/data/local/database/create-database";
import { type Auth, createAuth } from "@/data/remote/auth/create-auth";
import { BetterAuthSessionRepository } from "@/data/repository/better-auth-session-repository";
import { GetCurrentUserUseCase } from "@/domain/usecase/get-current-user-use-case";

// Stored on globalThis so a hot reload in development reuses the connection instead of opening a
// new one, which would lock the embedded database.
const singletons = globalThis as typeof globalThis & {
  starterDatabase?: Database;
  starterAuth?: Auth;
};

function getDatabase(): Database {
  if (!singletons.starterDatabase) {
    logger.debug("Opening the database");
    singletons.starterDatabase = createDatabase(getEnv().DATABASE_URL);
  }
  return singletons.starterDatabase;
}

/** The Better Auth instance. Only the route handler in `app/api/auth/` uses it directly. */
export function getAuth(): Auth {
  singletons.starterAuth ??= createAuth(getDatabase(), getEnv());
  return singletons.starterAuth;
}

export function getCurrentUserUseCase(): GetCurrentUserUseCase {
  return new GetCurrentUserUseCase(
    new BetterAuthSessionRepository(
      (requestHeaders) => getAuth().api.getSession({ headers: requestHeaders }),
      () => headers(),
    ),
  );
}
