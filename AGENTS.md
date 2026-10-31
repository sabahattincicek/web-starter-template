# AI Agent Rules

Rules for any AI coding assistant working in this repository. They are tool-agnostic, and
developers are free to edit them to fit the project.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## Project Settings

Filled in once, on the first session (see [`docsagent/FIRST_SESSION.md`](docsagent/FIRST_SESSION.md)).

- **AI tool:** `NOT SET` <!-- e.g. "Claude Code", "Codex", "Gemini CLI", "Cursor" -->
- **Git commits and pushes are made by:** `NOT SET` <!-- "AI" or "Developer" -->
- **Language for code, comments, logs, and commit messages:** `English`
- **Project discovery (app plan and design):** `NOT DONE` <!-- "DONE" once the plan and design files in docsagent/ are approved -->

The AI working documents (development log, roadmap, setup guide, first session steps,
architecture, feature map, third-party services, project discovery, app plan, design) live together in [`docsagent/`](docsagent/).
Only this file and `README.md` stay in the root, because tools load this file from there.

If any Project Setting is `NOT SET`, or "Project discovery" is `NOT DONE`, follow
`docsagent/FIRST_SESSION.md` before anything else.

---

## 1. Session Start

At the start of every session, before writing any code:

1. Read only the first ~150 lines of [`docsagent/DEVLOG.md`](docsagent/DEVLOG.md) (newest entries
   are at the top) to learn what has been done recently. For anything older, search the file with
   grep instead of reading it from start to end. Do not re-read the whole codebase to rebuild that
   context; open only the files the current task needs.
2. Look only at the open tasks (`- [ ]`) in [`docsagent/ROADMAP.md`](docsagent/ROADMAP.md).
3. Check the Project Settings above.
4. If [`docsagent/APP_PLAN.md`](docsagent/APP_PLAN.md) and
   [`docsagent/DESIGN.md`](docsagent/DESIGN.md) exist, read the parts that matter for the current
   task: the plan for scope and features, the design for any UI work.

---

## 2. Working Rules

- **Stay in scope.** Change only what the task needs. Do not refactor, reformat, or "improve"
  unrelated code along the way; mention it to the developer instead.
- **Ask before large or destructive changes:** deleting files or folders, rewriting a layer,
  changing the architecture, or anything hard to undo.
- **Ask before adding a library.** Do not add, replace, or upgrade a dependency without the
  developer's approval. Say what it is for and what the alternatives are. shadcn/ui components added
  with `npx shadcn add` are fine; they land in `src/presentation/ui/components/`.
- **Third-party services.** [`docsagent/SERVICES.md`](docsagent/SERVICES.md) lists every
  outside service (database, hosting, analytics, error tracking, email, payments, and so on), the
  features that use it, and where it is wired in. Read it instead of searching the code when a task
  touches a service. Ask before adding a service, just like a library, and update the file in the
  same piece of work that adds, removes, or changes one. Never write secrets into it.
- **Follow the plan and the design.** Build what `docsagent/APP_PLAN.md` describes and style the UI
  with the tokens and components in `docsagent/DESIGN.md`; no colors, sizes, or fonts outside the
  theme. When a task changes the plan or the design, update those files (and
  `docsagent/design.html`) and their decision log in the same piece of work.
- **Search cheaply.** Find code with grep and glob, and open only the files and line ranges you
  need. For broad searches across many files, use the tool's built-in search subagent if it has one
  (Claude Code: `Explore`), so only its short answer enters the conversation. Search directly when
  one grep is enough. Files listed in `.ignore` (generated files such as migrations) are left out
  of search on purpose; read one by its path only when the task needs it.
- **Feature map.** [`docsagent/FEATURES.md`](docsagent/FEATURES.md) has one line per feature: what
  it does, its folder, its use cases, and its services. When a task mentions a feature, look it up
  there first. Update the row in the same piece of work that adds, changes, or removes a feature.
- **Language.** Write code identifiers, comments, log messages, and commit messages in the language
  set in Project Settings. User-facing text follows the app's own language.

### Definition of done

A task is finished only when all of these are true:

1. `npm run check` prints `BUILD OK`. With no arguments it runs lint, type checks, all unit tests,
   and the production build.
2. Tests are updated for the change.
3. New and changed code follows the comment and logging rules below.
4. `docsagent/DEVLOG.md` has a new entry for the work. `docsagent/FEATURES.md` and
   `docsagent/SERVICES.md` are up to date if a feature or a service was added, changed, or removed.
5. The matching `docsagent/ROADMAP.md` tasks are marked `[x]`.

CI runs the same checks and the end-to-end tests on every push and pull request
(`.github/workflows/ci.yml`). Never report a task as done while any of these is missing; say what
is still open.

When the task is done (after DEVLOG and ROADMAP are updated), end your last message to the
developer with this line: `Task done. Run /clear before the next task.` Do not start a new task
in the same session on your own.

### Running the checks

- Run checks through `npm run check`, not with the raw tools. It writes the full output to
  `build/agent-logs/last-check.log` and prints only a summary: one line on success; the end of the
  failed step's output on failure.
- While working, pass only the steps you need, for example `npm run check -- lint test`. The steps
  are `lint`, `typecheck`, `test`, `build`, and `e2e`. Run it without arguments before calling the
  task done, and add `e2e` when a task changes a user flow.
- If the summary is not enough to understand a failure, search `last-check.log` with grep instead
  of reading it whole or running the checks again.

---

## 3. Documentation Comments

- **Every file** starts with a comment explaining what it is for and where it fits in the app. Test
  files are exempt.
- **Functions** that are public API, or whose purpose is not clear from the code, have a comment of
  one or two sentences above them saying what they do. Other functions need no comment.
- Keep comments in sync with the code. When behavior changes, update the comment in the same change.
- Explain purpose and intent, not the syntax.

```ts
/**
 * Loads the signed-in user's profile for the profile page.
 */
export class GetProfileUseCase {
```

---

## 4. Logging

- Log with `logger` from `@/core/logging/logger`: `logger.debug("Profile loaded", { id })`. Do not
  call `console` directly; Biome rejects it. Pure data types, constants, and components with no
  behavior are exempt.
- Place logs wherever they help debugging: significant operations, branch decisions, database and
  network calls with their results, and every caught error. A use case that receives a failure
  logs it.
- Use the right level: `debug` for flow and state, `info` for notable events, `warn` for recoverable
  problems, `error` for failures (pass the error as a detail, so its stack is logged).
- Log messages state what happened and include the relevant values, so a log line is useful on its
  own.
- Never log passwords, tokens, API keys, connection strings, or personal user data.

---

## 5. Tests

- Keep tests up to date at all times. Any change to behavior comes with the matching test change in
  the same piece of work.
- New use cases, repositories, and components with logic get unit tests when they are written, next
  to the file: `get-profile-use-case.test.ts`.
- Unit tests use Vitest and run in Node. A component test starts with `// @vitest-environment jsdom`
  and uses Testing Library. A repository test can use a real database with
  `createDatabase("pglite://memory")`.
- Use cases are tested with a small fake of the repository interface, not with the database.
- End-to-end tests are in `e2e/` and use Playwright, for flows a user depends on.
- Run the tests before calling a task done. Never leave failing tests behind, and never delete or
  weaken a test just to make it pass.

---

## 6. Development Log — `docsagent/DEVLOG.md`

[`docsagent/DEVLOG.md`](docsagent/DEVLOG.md) is the project's memory. It exists so that a new
session can understand the project without reading all the code.

- After finishing a piece of work, add an entry describing what was done.
- Every entry is stamped with date and time: `## YYYY-MM-DD HH:mm — Short title`.
- **New entries go at the top of the file**, directly under the header. The file reads from newest
  to oldest.
- Write what changed, why, and which files or areas were touched. Note decisions and anything a
  future session needs to know. Keep an entry short (about ten bullet points at most): every
  session reads the newest entries.
- Never rewrite or delete older entries.

---

## 7. Roadmap — `docsagent/ROADMAP.md`

[`docsagent/ROADMAP.md`](docsagent/ROADMAP.md) holds everything still to be done.

- Work is organized in **phases**. Each phase is broken into small tasks.
- Every task starts with a checkbox: `- [ ]` for open, `- [x]` for done.
- Mark a task `[x]` as soon as it is finished.
- When every task of a phase is `[x]`, move the phase to
  [`docsagent/ROADMAP_ARCHIVE.md`](docsagent/ROADMAP_ARCHIVE.md) (newest at the top) and leave one
  line in `ROADMAP.md`: `Phase N — done, see ROADMAP_ARCHIVE.md`.
- When new work comes up, add it to the right phase, or add a new phase.
- Before starting work, confirm the task exists in the roadmap; add it if it does not.

---

## 8. Architecture

**Clean Architecture**; each layer is a folder in `src/`. Read
[`docsagent/ARCHITECTURE.md`](docsagent/ARCHITECTURE.md) before adding a feature or when the folder
layout matters.

Rules:

- **Dependency direction:** `app` → `presentation/features` → `domain` ← `data`. `core` is used by
  all and depends on none. `domain` depends only on `core`. Only `di/container.ts` wires `data` for
  others: routes and features get use cases from `@/di/container`, never from `data` or
  `domain/repository`. Biome enforces this in `biome.json`; do not weaken those rules to make a
  change pass.
- **Pure domain:** no Next.js, React, Drizzle, or Better Auth in `domain/`.
- **Repositories:** interface in `domain/repository/`, implementation in `data/repository/`, wired
  in `di/container.ts`. They return `Result` instead of throwing (`resultOf`).
- **Models:** database rows and DTOs (`data/remote/dto/`) are mapped to `domain/model/` in the
  repositories and never reach the UI.
- **Use cases:** one job each, a class with one `execute` method.
- **Routes:** a file in `app/` only renders a feature. No logic and no data loading there.
- **Features:** `<name>-route.tsx` loads the data, `<name>-screen.tsx` receives it as props and is
  stateless, and `actions.ts` holds the Server Actions. Keep business logic in use cases.
- **Server first:** components are Server Components unless they need state, effects, or event
  handlers. Keep `"use client"` components small, and never pass secrets to them.
- **Server Actions:** every action validates its input with Zod and checks the user, then calls a
  use case and returns a `Result`.
- **Environment variables:** read them only through `getEnv()`, and add new ones to `env.ts` and
  `.env.example`.
- **Database changes:** edit `schema.ts`, run `npm run db:generate`, and commit the migration. Never
  edit an applied migration.
- **Dependency injection:** new classes are created in `di/container.ts`; classes receive their
  dependencies through the constructor.
- **Styling:** Tailwind classes with the theme tokens in `globals.css`. Add components with
  `npx shadcn add` before writing your own.
- **Small files:** keep a file under about 300 lines, because an AI reads whole files and pays for
  every line. Split a growing screen into smaller components and a growing action into use cases.

---

## 9. Git

Follow the choice recorded in Project Settings:

- **`AI`:** create branches, commit, and push as described below.
- **`Developer`:** do not commit or push. When a piece of work is finished, suggest a branch name
  and a commit message for the developer to use.

### Branches

- `main` is always stable and releasable; never commit to it directly. `develop` is the
  integration branch.
- Work on short-lived branches cut from `develop`: `feature/`, `bugfix/`, `refactor/`, `chore/`,
  or `docs/` followed by a short description.
- `hotfix/<short-description>` is cut from `main` for urgent production fixes;
  `release/<version>` is cut from `develop` to prepare a release.

### Commits

Use [Conventional Commits](https://www.conventionalcommits.org):

```text
<type>(<scope>): <short summary in imperative mood>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`, `build`, `ci`.

Example: `feat(profile): add profile page with avatar upload`

- One logical change per commit. Keep commits small and buildable.
- Never commit secrets, keys, or `.env.local`.
- Never force-push shared branches or rewrite published history.
