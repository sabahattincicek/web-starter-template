import { describe, expect, it, vi } from "vitest";
import { failure, success } from "@/core/result/result";
import {
  BetterAuthSessionRepository,
  type SessionReader,
} from "./better-auth-session-repository";

const headers = new Headers({ cookie: "session=abc" });

function repositoryWith(readSession: SessionReader) {
  return new BetterAuthSessionRepository(readSession, async () => headers);
}

describe("BetterAuthSessionRepository", () => {
  it("maps the session user to the domain model", async () => {
    const readSession = vi.fn<SessionReader>().mockResolvedValue({
      user: {
        id: "user-1",
        name: "Ada",
        email: "ada@example.com",
        image: "https://example.com/ada.png",
      },
    });

    await expect(repositoryWith(readSession).getCurrentUser()).resolves.toEqual(
      success({
        id: "user-1",
        name: "Ada",
        email: "ada@example.com",
        imageUrl: "https://example.com/ada.png",
      }),
    );
    expect(readSession).toHaveBeenCalledWith(headers);
  });

  it("uses null when the user has no image", async () => {
    const result = await repositoryWith(async () => ({
      user: { id: "user-1", name: "Ada", email: "ada@example.com" },
    })).getCurrentUser();

    expect(result.ok && result.data?.imageUrl).toBeNull();
  });

  it("returns null for a visitor", async () => {
    await expect(
      repositoryWith(async () => null).getCurrentUser(),
    ).resolves.toEqual(success(null));
  });

  it("lets the framework's stop signal for request headers through", async () => {
    const signal = new Error("Prerender is complete");
    const repository = new BetterAuthSessionRepository(
      async () => null,
      () => Promise.reject(signal),
    );

    await expect(repository.getCurrentUser()).rejects.toBe(signal);
  });

  it("turns an error into a failure", async () => {
    const repository = repositoryWith(async () => {
      throw new Error("Database is down");
    });

    await expect(repository.getCurrentUser()).resolves.toEqual(
      failure("session_read_failed", "Database is down"),
    );
  });
});
