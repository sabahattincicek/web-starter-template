/**
 * OPTIONAL (languages). Runs before each page request: picks the visitor's language from the
 * address, their saved choice, or the browser setting, and redirects when needed. Skips the API,
 * Next.js internals, and files such as `favicon.ico`.
 */
import createMiddleware from "next-intl/middleware";
import { routing } from "@/presentation/ui/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
