/**
 * OPTIONAL (auth). Implements `SessionRepository` with Better Auth and maps its session to the
 * domain's `User`, so no Better Auth type reaches the other layers.
 */
import { type Result, resultOf } from "@/core/result/result";
import type { User } from "@/domain/model/user";
import type { SessionRepository } from "@/domain/repository/session-repository";

type BetterAuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

/** The only part of Better Auth this class needs, which keeps it easy to test. */
export type SessionReader = (
  requestHeaders: Headers,
) => Promise<{ user: BetterAuthUser } | null>;

export class BetterAuthSessionRepository implements SessionRepository {
  constructor(
    private readonly readSession: SessionReader,
    private readonly requestHeaders: () => Promise<Headers>,
  ) {}

  async getCurrentUser(): Promise<Result<User | null>> {
    // Outside resultOf: during a build, Next.js stops this call on purpose and must see that signal.
    const requestHeaders = await this.requestHeaders();
    return resultOf("session_read_failed", async () => {
      const session = await this.readSession(requestHeaders);
      return session ? toUser(session.user) : null;
    });
  }
}

function toUser(user: BetterAuthUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    imageUrl: user.image ?? null,
  };
}
