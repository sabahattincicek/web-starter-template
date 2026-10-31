/**
 * Placeholder start page. Next.js needs a page at `/`; replace this one with your first feature
 * (see "Adding a feature" in `docsagent/ARCHITECTURE.md`).
 */
import { appConfig } from "@/core/config/app-config";

export default function StartPlaceholder() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <h1 className="text-2xl font-semibold">{appConfig.name}</h1>
    </main>
  );
}
