# Web Starter

A Next.js starter template organized with Clean Architecture: React, TypeScript, Tailwind CSS,
shadcn/ui, next-intl, Drizzle, Better Auth, Vitest, and Playwright. It has no ready-made pages, only
the structure and the wiring.

## First-Time Setup

If you are using this template for the first time, **follow the instructions in
[`docsagent/SETUP.md`](docsagent/SETUP.md) before starting development**.

```bash
npm install
npm run db:migrate
npm run dev
```

The setup guide covers renaming the project, removing the optional parts you do not need, going
live, and the AI assistant files: `AGENTS.md` in the root, and the development log, roadmap, and
setup guide in `docsagent/`. After the setup, the AI interviews you about the product and its design
([`docsagent/PROJECT_DISCOVERY.md`](docsagent/PROJECT_DISCOVERY.md)) and writes the plan and the
design criteria from your answers into `docsagent/`.

> **Do not skip the setup steps.**

## Architecture

Clean Architecture. Each layer is a folder in `src/`, so the folder tree shows the layers:

```text
src/
  app/                     Next.js routes only, thin; pages live in [locale]/
  proxy.ts                 picks the visitor's language
  core/                    config, logger, Result, test helpers
  domain/                  models, repository interfaces, use cases (pure TypeScript)
  data/                    repository implementations
    local/database/        Drizzle schema and migrations          (optional)
    remote/                API clients, DTOs, Better Auth         (optional)
  di/                      creates data classes, hands out use cases
  presentation/
    ui/                    theme, shared components and hooks, languages and translations
    features/<name>/       one folder per screen or flow
e2e/                       Playwright tests
docsagent/                 AI working documents
scripts/                   check and rename scripts
```

```text
app  ──▶  presentation/features  ──▶  domain  ◀──  data
```

Biome enforces the direction: an import that crosses a layer the wrong way fails `npm run lint`. See
[`docsagent/ARCHITECTURE.md`](docsagent/ARCHITECTURE.md) for the full folder tree and how to add a
feature, and the Architecture section of [`AGENTS.md`](AGENTS.md) for the rules between the layers.

## Database

The app talks to Postgres and reads the address from `DATABASE_URL`. Left empty in development, it
uses an embedded database (PGlite), so there is nothing to install. For production, paste a
connection string from **Neon, Supabase, or any Postgres server**. The code stays the same. See
"Database" in [`docsagent/ARCHITECTURE.md`](docsagent/ARCHITECTURE.md).

## Languages

The site starts with English at `/` and Turkish at `/tr`. Text lives in one file per language, and
a missing or mistyped key fails the checks. See "Languages" in
[`docsagent/ARCHITECTURE.md`](docsagent/ARCHITECTURE.md).

## Stack

| Area | Library |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Languages | next-intl |
| Language | TypeScript 7, Node.js 24 |
| UI | Tailwind CSS 4, shadcn/ui, next-themes |
| Validation | Zod 4 |
| Database | Drizzle ORM, PostgreSQL, PGlite for development |
| Auth | Better Auth |
| Lint and format | Biome |
| Tests | Vitest, Testing Library, Playwright |
| CI | GitHub Actions: lint, type checks, tests, and build on every push and pull request |

## Saving Tokens: Tips for the Developer

The AI rules already keep each session lean: short build output, reading only what a task needs,
and documents (`docsagent/FEATURES.md`, `docsagent/SERVICES.md`) that answer "where is this?"
without a code search. These habits on your side save more:

- **Start a new conversation after every task** (`/clear` in Claude Code). Every message resends
  the whole conversation, so a long session gets more expensive with each step. The AI reminds you
  at the end of each task; DEVLOG and ROADMAP carry the context to the next session.
- **Keep tasks small.** A ROADMAP task should fit in one session. Split anything bigger first.
- **Ask for a plan before large changes.** Fixing a wrong approach after the code is written costs
  far more than correcting a plan.
- **Pick the model for the job.** Routine work (a new page, tests, small fixes) runs well on a
  smaller, cheaper model (in Claude Code: Sonnet). Keep the largest model for architecture
  decisions and hard bugs. Switch with `/model`.
- **Point to the place.** "Fix the retry button in `profile-screen.tsx`" costs less than "the retry
  button is broken somewhere", because the AI does not have to search for it.
- **Paste only the relevant part of an error.** The message and the first lines of the stack trace
  are enough.

## Common Commands

```bash
npm run dev            # start the development server on http://localhost:3000
npm run check          # lint, type checks, unit tests, and build, with a short summary
npm run check -- e2e   # end-to-end tests in a real browser
npm test               # unit tests only
npm run format         # fix formatting and sort imports
npm run db:generate    # write a migration after changing schema.ts
npm run db:migrate     # apply migrations
npm run db:studio      # browse the database
```
