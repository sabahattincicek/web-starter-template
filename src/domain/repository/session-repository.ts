/**
 * Tells who is making the current request. The domain depends only on this interface, so replacing
 * the auth provider means writing one new implementation in `data/repository/`.
 */
import type { Result } from "@/core/result/result";
import type { User } from "@/domain/model/user";

export interface SessionRepository {
  /** Returns the signed-in user, or `null` for a visitor. */
  getCurrentUser(): Promise<Result<User | null>>;
}
