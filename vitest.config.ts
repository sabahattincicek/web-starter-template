/**
 * Unit test settings. Tests sit next to the code they cover as `*.test.ts(x)` and run in Node; a
 * component test starts with `// @vitest-environment jsdom`.
 */
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const srcPath = (path: string) =>
  fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcPath(""),
      "server-only": srcPath("core/testing/empty-module.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: [srcPath("core/testing/vitest-setup.ts")],
  },
});
