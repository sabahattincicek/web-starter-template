# Development Log

A running record of what has been done in this project, so a new session (human or AI) can catch up
without reading the whole codebase.

- **Newest entries go at the top**, directly under this header. Read downward to go back in time.
- Entry heading format: `## YYYY-MM-DD HH:mm — Short title`
- Say what changed, why, and which files or areas were touched.
- Do not rewrite or delete older entries.

---

## 2026-10-31 16:00 — Project created from Web Starter template

Starting point of the project. What the template provides:

- **Stack:** Next.js 16 (App Router, Turbopack, Cache Components), React 19, TypeScript 7,
  Tailwind CSS 4, shadcn/ui, next-intl, Zod 4, Node.js 24.
- **Layout:** Clean Architecture, one folder per layer in `src/`: `app`, `core`, `domain`, `data`,
  `di`, `presentation`. Biome rejects imports that cross the layers the wrong way. Intended but
  empty folders contain a `.gitkeep`.
- **App:** a placeholder start page (`src/app/[locale]/page.tsx`) and the root layout with fonts and
  a light and dark theme. There are no ready-made pages and no features.
- **Languages:** English at `/` and Turkish at `/tr`, with next-intl. Translations in
  `src/presentation/ui/i18n/messages/`, language detection in `src/proxy.ts`.
- **Core:** `Result`, `logger`, validated environment variables (`getEnv`), `appConfig`.
- **Domain:** `User`, `SessionRepository`, `GetCurrentUserUseCase`.
- **Data, optional parts:**
  - Database: Drizzle over PGlite in development and any Postgres server in production, selected by
    `DATABASE_URL`. Migrations in `src/data/local/database/migrations/`.
  - Auth: Better Auth with email and password, plus Google when its keys are set. API under
    `/api/auth/*`, browser client in `src/presentation/ui/auth/`.
- **DI:** `src/di/container.ts`, written by hand.
- **Tests:** Vitest and Testing Library next to the code, Playwright in `e2e/`.
- **Tools:** `npm run check` for all checks with a short summary, `npm run rename` for the one-time
  rename, `.github/workflows/ci.yml` on every push and pull request.
- **AI documents:** `AGENTS.md` in the root; the log, roadmap, setup guide, architecture, feature
  map, services, and project discovery in `docsagent/`. `APP_PLAN.md`, `DESIGN.md`, and
  `design.html` do not exist yet; the discovery interview writes them.
