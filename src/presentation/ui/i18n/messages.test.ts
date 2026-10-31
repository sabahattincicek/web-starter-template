import { describe, expect, it } from "vitest";
import en from "./messages/en.json";
import tr from "./messages/tr.json";
import { routing } from "./routing";

const messagesByLocale: Record<(typeof routing.locales)[number], object> = {
  en,
  tr,
};

function keysOf(messages: object, prefix = ""): string[] {
  return Object.entries(messages).flatMap(([key, value]) => {
    const path = `${prefix}${key}`;
    return typeof value === "object" ? keysOf(value, `${path}.`) : [path];
  });
}

describe("messages", () => {
  it.each(routing.locales)("%s has the same keys as en", (locale) => {
    expect(keysOf(messagesByLocale[locale]).sort()).toEqual(keysOf(en).sort());
  });
});
