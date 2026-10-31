# Architecture

The folder layout, the parts of a feature, and how to add one. The rules between the layers are in
the Architecture section of `AGENTS.md`.

This project follows **Clean Architecture**. Each layer is a folder in `src/`, so the folder tree
shows the layers. Biome enforces the dependency direction: an import that crosses a layer the wrong
way fails `npm run lint`. The rules are the `noRestrictedImports` overrides in `biome.json`.

```text
src/
  app/                        Next.js routes only: page.tsx, layout.tsx, route.ts. Stay thin.
    [locale]/                 every page lives here, one address per language
    api/auth/[...all]/        Better Auth API                         (optional)
  proxy.ts                    picks the visitor's language            (optional)
  core/                       shared building blocks, no business logic
    config/                   appConfig, validated environment variables, database URL rules
    logging/                  logger
    result/                   Result, success, failure, resultOf
    testing/                  unit test helpers
    util/                     small helpers
  domain/                     business rules, pure TypeScript
    model/                    business models
    repository/               repository interfaces
    usecase/                  use cases
  data/                       implements the domain
    local/database/           Drizzle: schema.ts, create-database.ts, migrations/  (optional)
    remote/api/               clients for outside HTTP APIs           (optional)
    remote/dto/               network models (DTOs)                   (optional)
    remote/auth/              Better Auth configuration               (optional)
    repository/               repository implementations
  di/                         container.ts: creates data classes and hands out use cases
  presentation/               UI layer
    ui/                       shared UI
      components/             shadcn/ui and other shared components
      hooks/                  shared React hooks
      lib/                    UI helpers (cn)
      theme/                  colors and fonts (globals.css), ThemeProvider
      auth/                   browser auth client                     (optional)
      i18n/                   languages, translations, navigation     (optional)
    features/<name>/          one folder per screen or flow
e2e/                          Playwright tests
scripts/                      check, rename-project
docsagent/                    AI working documents
```

```text
app  ──▶  presentation/features  ──▶  domain  ◀──  data
  └─────────▶  di  ─────────────────────▲───────────┘
```

`core` can be used by every layer and depends on none. `di` is the only folder that imports `data`
for others: routes and features get use cases from `@/di/container`, typed by the domain.

## Android concepts in this project

| Android template | Here |
|---|---|
| Gradle module per layer | Folder per layer, enforced by Biome |
| Hilt modules | `src/di/container.ts`, written by hand |
| `Resource` | `Result` |
| Room entity and DAO | Drizzle table in `schema.ts`, queries in repositories |
| Timber | `logger` |
| `<Name>Screen` | `<name>-screen.tsx`, stateless |
| `<Name>Route` | `<name>-route.tsx`, a Server Component that loads the data |
| `<Name>ViewModel` | `actions.ts` (Server Actions), plus `use-<name>.ts` for browser state |
| Navigation 3 entry | a folder with `page.tsx` under `src/app/[locale]/` |
| `strings.xml` | `presentation/ui/i18n/messages/<language>.json` |
| `stringResource(R.string.x)` | `t("x")` from `useTranslations` or `getTranslations` |

## Server and browser

Components in Next.js run on the **server** unless the file starts with `"use client"`.

- **Server Components** can call use cases directly and send finished HTML. Prefer them.
- **Client Components** run in the browser and are needed for state, effects, and event handlers.
  Keep them small, near the leaves of the tree. They cannot import `@/di/container`; a use case
  reaches them through a Server Action.
- **Server Actions** are functions marked `"use server"` that a client component calls like a
  normal function. They run on the server. Treat their input as untrusted: validate it with Zod and
  check the user in every action, because anyone can call them.
- **Dynamic data:** `cacheComponents` is on. A component that reads the request (the session, for
  example) must sit inside `<Suspense>`, so the static part of the page is sent right away.
- **Request data in repositories:** during a build, Next.js stops `headers()` and `cookies()` on
  purpose by rejecting them. Read them before `resultOf`, as `BetterAuthSessionRepository` does, so
  that signal is not turned into a failure.

## Adding a feature

For a feature called `notes`:

1. **Domain.** `domain/model/note.ts`, the interface `domain/repository/note-repository.ts`, and
   one file per use case in `domain/usecase/`, with tests next to them.
2. **Data.** Add the table to `schema.ts`, run `npm run db:generate` and `npm run db:migrate`, then
   write `data/repository/drizzle-note-repository.ts`. Map database rows to domain models there.
3. **DI.** Add a function to `di/container.ts` that returns each new use case.
4. **Presentation.** In `presentation/features/notes/`:
   - `notes-route.tsx`: Server Component, calls the use case and renders the screen.
   - `notes-screen.tsx`: receives data as props and has no logic.
   - `actions.ts`: Server Actions for writes. Validate the input, call a use case, return a `Result`.
   - `components/`: parts used only by this feature.
5. **Text.** Add a `Notes` group to every file in `presentation/ui/i18n/messages/`.
6. **Route.** `app/[locale]/notes/page.tsx` sets the language and renders the feature:

   ```tsx
   export default async function Page({ params }: PageProps<"/[locale]/notes">) {
     const { locale } = await params;
     setRequestLocale(locale as Locale);
     return (
       <Suspense>
         <NotesRoute />
       </Suspense>
     );
   }
   ```

7. **Protected pages.** In the route component, call `getCurrentUserUseCase().execute()` and send a
   visitor away with `redirect({ href: "/sign-in", locale: await getLocale() })`, using `redirect`
   from `presentation/ui/i18n/navigation`.
8. **Docs.** Add a row to [`FEATURES.md`](FEATURES.md).

For the first feature, delete the placeholder `app/[locale]/page.tsx` or replace it with the
feature.

### Feature generator

**Status:** `NOT OFFERED` <!-- "NOT OFFERED", "DECLINED", or "BUILT" -->

The steps above write the same boilerplate for every feature. Once the project has **four or more
features** and the status is `NOT OFFERED`, tell the developer once, when the next feature is being
added:

> The features now follow a settled pattern. I can add a `npm run new-feature` script that generates
> a new feature from this project's own conventions. Every later feature then costs fewer tokens and
> starts out consistent. Shall I build it?

If they agree, build the script from the project's existing features (not from this template's
placeholders), test it by generating and building a throwaway feature, and point the steps above to
it. Set the status to `BUILT` or `DECLINED` and do not offer it again.

## Languages

The template uses `next-intl` with English and Turkish. The default language has no prefix in the
address (`/notes`), and the others do (`/tr/notes`). `src/proxy.ts` sends a first-time visitor to
the language of their browser and remembers a choice in a cookie.

- **Text:** user-facing text lives in `presentation/ui/i18n/messages/<language>.json`, in one group
  per feature. Read it with `useTranslations("Notes")` in components, or
  `await getTranslations("Notes")` in async Server Components. A mistyped key fails
  `npm run typecheck`, and `messages.test.ts` fails when a language is missing a key.
- **Links:** use `Link`, `redirect`, `useRouter`, and `usePathname` from
  `presentation/ui/i18n/navigation`, not from Next.js. They keep the current language.
- **Domain errors:** a `Result` carries a `code`. The feature turns the code into translated text;
  never show `error.message` to users.
- **Add a language:** add it to `locales` in `routing.ts`, create its file in `messages/`, and add
  it to `messages.test.ts`.
- **Change the default language:** change `defaultLocale` in `routing.ts` and the expectations in
  `e2e/smoke.spec.ts`. `en.json` stays the reference for the key types unless you change
  `next-intl.d.ts`.
- **One language only:** set `locales` to that language. The files stay, and addresses get no prefix.

## Database

The code talks to Postgres through Drizzle and does not know where the server is. `DATABASE_URL`
decides:

| `DATABASE_URL` | Database |
|---|---|
| empty, development only | PGlite, an embedded Postgres, stored in `.data/pglite` |
| `pglite://memory` | PGlite in memory, for tests |
| `postgresql://...` | any Postgres server: Neon, Supabase, or your own |

PGlite allows one process at a time, so stop `npm run dev` before `npm run db:migrate` or
`npm run db:studio`.

### Supabase

Supabase is a hosted Postgres, so it works as a `DATABASE_URL`:

1. Create a project and copy a connection string from **Connect**.
2. Run `npm run db:migrate` with the **direct** or **session pooler** string (port 5432).
3. Give the deployed app the **transaction pooler** string (port 6543). A serverless host opens many
   short connections, and the pooler handles them.

Supabase also offers auth, storage, and realtime. To use Supabase Auth, write a new
`SessionRepository` implementation, change it in `di/container.ts`, and remove the optional auth
parts (see `SETUP.md`). Row Level Security does not apply to this template's server connection,
which logs in as a database role that bypasses it, so check permissions in use cases.
