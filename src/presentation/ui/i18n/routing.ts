/**
 * OPTIONAL (languages). The site's languages and how they appear in addresses. The default language
 * has no prefix (`/about`) and the others do (`/tr/about`). To add a language, add it here and
 * create its file in `messages/`.
 */
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "tr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
