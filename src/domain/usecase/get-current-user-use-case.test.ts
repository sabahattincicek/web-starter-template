import { describe, expect, it, vi } from "vitest";
import { failure, success } from "@/core/result/result";
import type { User } from "@/domain/model/user";
import type { SessionRepository } from "@/domain/repository/session-repository";
import { GetCurrentUserUseCase } from "./get-current-user-use-case";

const user: User = {
  id: "user-1",
  name: "Ada",
  email: "ada@example.com",
  imageUrl: null,
};

function useCaseWith(
  result: Awaited<ReturnType<SessionRepository["getCurrentUser"]>>,
) {
  return new GetCurrentUserUseCase({
    getCurrentUser: async () => result,
  });
}

describe("GetCurrentUserUseCase", () => {
  it("returns the signed-in user", async () => {
    await expect(useCaseWith(success(user)).execute()).resolves.toEqual(
      success(user),
    );
  });

  it("returns null for a visitor", async () => {
    await expect(useCaseWith(success(null)).execute()).resolves.toEqual(
      success(null),
    );
  });

  it("logs and passes on a failure", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const expected = failure("session_read_failed", "Database is down");

    await expect(useCaseWith(expected).execute()).resolves.toEqual(expected);

    expect(error).toHaveBeenCalledOnce();
    error.mockRestore();
  });
});
