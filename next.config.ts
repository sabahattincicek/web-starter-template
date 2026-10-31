/**
 * Next.js settings. PGlite loads a WebAssembly file at run time, so it must not be bundled. The
 * next-intl plugin points to the file that loads translations. `agentRules` is off because the AI
 * rule file is renamed per tool, and `next dev` would otherwise recreate AGENTS.md.
 */
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  "./src/presentation/ui/i18n/request.ts",
);

const nextConfig: NextConfig = {
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  serverExternalPackages: ["@electric-sql/pglite"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
