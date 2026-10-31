/**
 * Placeholder start page. Next.js needs a page at `/`; replace this one with your first feature
 * (see "Adding a feature" in `docsagent/ARCHITECTURE.md`).
 */
import { getTranslations, setRequestLocale } from "next-intl/server";
import { appConfig } from "@/core/config/app-config";
import type { Locale } from "@/presentation/ui/i18n/routing";

export default async function StartPlaceholder({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Start");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6">
      <h1 className="text-2xl font-semibold">{appConfig.name}</h1>
      <p className="text-muted-foreground">{t("subtitle")}</p>
    </main>
  );
}
