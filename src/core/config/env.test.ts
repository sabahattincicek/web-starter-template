import { describe, expect, it } from "vitest";
import { DEFAULT_DATABASE_URL } from "./database-url";
import { parseEnv } from "./env";

describe("parseEnv", () => {
  it("needs no configuration in development", () => {
    const env = parseEnv({ NODE_ENV: "development" });

    expect(env.DATABASE_URL).toBe(DEFAULT_DATABASE_URL);
    expect(env.BETTER_AUTH_SECRET.length).toBeGreaterThanOrEqual(32);
  });

  it("uses the configured database", () => {
    const url = "postgresql://user:pw@db.example.com:5432/app";

    expect(parseEnv({ DATABASE_URL: url }).DATABASE_URL).toBe(url);
  });

  it("treats empty values as not set", () => {
    const env = parseEnv({ NODE_ENV: "development", GOOGLE_CLIENT_ID: "" });

    expect(env.GOOGLE_CLIENT_ID).toBeUndefined();
  });

  it("requires a database and a secret in production", () => {
    expect(() => parseEnv({ NODE_ENV: "production" })).toThrow(
      /DATABASE_URL is required[\s\S]*BETTER_AUTH_SECRET is required/,
    );
  });

  it("rejects a short auth secret", () => {
    expect(() => parseEnv({ BETTER_AUTH_SECRET: "short" })).toThrow();
  });
});
