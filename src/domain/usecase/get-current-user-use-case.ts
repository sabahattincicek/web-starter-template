/**
 * Finds out who is signed in. Pages that need a user call this and redirect a visitor.
 */
import { logger } from "@/core/logging/logger";
import type { Result } from "@/core/result/result";
import type { User } from "@/domain/model/user";
import type { SessionRepository } from "@/domain/repository/session-repository";

export class GetCurrentUserUseCase {
  constructor(private readonly sessions: SessionRepository) {}

  async execute(): Promise<Result<User | null>> {
    const result = await this.sessions.getCurrentUser();
    if (!result.ok) {
      logger.error("Could not read the session", result.error);
    }
    return result;
  }
}
