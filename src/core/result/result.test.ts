import { describe, expect, it } from "vitest";
import { failure, resultOf, success } from "./result";

describe("result", () => {
  it("wraps data in a success", () => {
    expect(success(42)).toEqual({ ok: true, data: 42 });
  });

  it("wraps a code and message in a failure", () => {
    expect(failure("not_found", "No such item")).toEqual({
      ok: false,
      error: { code: "not_found", message: "No such item" },
    });
  });

  it("returns the value of successful work", async () => {
    await expect(resultOf("load_failed", async () => "done")).resolves.toEqual(
      success("done"),
    );
  });

  it("turns a thrown error into a failure", async () => {
    const result = await resultOf("load_failed", async () => {
      throw new Error("Connection lost");
    });

    expect(result).toEqual(failure("load_failed", "Connection lost"));
  });

  it("handles thrown values that are not errors", async () => {
    const result = await resultOf("load_failed", () => Promise.reject("nope"));

    expect(result).toEqual(failure("load_failed", "nope"));
  });
});
