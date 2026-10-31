/**
 * OPTIONAL (languages). Tells TypeScript the languages and the translation keys, so a mistyped key
 * fails `npm run typecheck`. `en.json` is the reference file.
 */
import type messages from "./messages/en.json";
import type { Locale as AppLocale } from "./routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: typeof messages;
  }
}
