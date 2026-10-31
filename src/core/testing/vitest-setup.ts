/**
 * Runs before every test file: unmounts components rendered by the previous test.
 */
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
