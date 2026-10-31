import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  isPgliteUrl,
  pgliteDataDir,
  preparePgliteDataDir,
} from "./database-url";

describe("isPgliteUrl", () => {
  it("recognizes embedded databases", () => {
    expect(isPgliteUrl("pglite://.data/pglite")).toBe(true);
  });

  it("treats Postgres connection strings as real servers", () => {
    expect(isPgliteUrl("postgresql://user:pw@db.example.com:5432/app")).toBe(
      false,
    );
  });
});

describe("preparePgliteDataDir", () => {
  it("creates the missing parent folders", () => {
    const root = mkdtempSync(join(tmpdir(), "starter-"));
    const dataDir = join(root, "missing", "parent", "pglite");

    expect(preparePgliteDataDir(`pglite://${dataDir}`)).toBe(dataDir);

    expect(existsSync(dirname(dataDir))).toBe(true);
    rmSync(root, { recursive: true });
  });

  it("creates nothing for an in-memory database", () => {
    expect(preparePgliteDataDir("pglite://memory")).toBeUndefined();
  });
});

describe("pgliteDataDir", () => {
  it("returns the folder of a file-backed database", () => {
    expect(pgliteDataDir("pglite://.data/pglite")).toBe(".data/pglite");
  });

  it("returns undefined for an in-memory database", () => {
    expect(pgliteDataDir("pglite://memory")).toBeUndefined();
  });
});
