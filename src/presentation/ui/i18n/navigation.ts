/**
 * OPTIONAL (languages). Language-aware versions of Next.js navigation. Use these instead of
 * `next/link` and `next/navigation`, so links and redirects stay in the current language.
 */
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
