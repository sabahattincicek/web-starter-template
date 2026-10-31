import { afterEach, describe, expect, it, vi } from "vitest";
import { logger } from "./logger";

describe("logger", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("prefixes messages with their level and passes details on", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    logger.warn("Disk almost full", { free: 3 });

    expect(warn).toHaveBeenCalledWith("[warn] Disk almost full", { free: 3 });
  });

  it("drops debug logs in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const debug = vi.spyOn(console, "debug").mockImplementation(() => {});

    logger.debug("Loaded");

    expect(debug).not.toHaveBeenCalled();
  });

  it("keeps error logs in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    logger.error("Failed");

    expect(error).toHaveBeenCalledOnce();
  });
});
