# Starter Template Setup Guide

Follow these steps immediately after creating a new project from this template. You need Node.js 24
or newer.

---

## 1. Install and Run

```bash
npm install
npm run db:migrate
npm run dev
```

Open <http://localhost:3000>. No configuration is needed: the app uses an embedded database in
`.data/pglite`. To change a setting, copy `.env.example` to `.env.local`.

For the end-to-end tests, install their browser once: `npx playwright install chromium`.

---

## 2. Rename the Project

The template ships with the package name `web-starter` and the display name `Web Starter`:

```bash
npm run rename -- my-new-app "My New App"
```

Without the second argument, the display name comes from the package name. The script updates
`package.json`, `package-lock.json`, `src/core/config/app-config.ts`, and the documents.

Package names use lowercase letters, digits, and hyphens.

---

## 3. Verify the Project

* [ ] Search the project for `web-starter` and `Web Starter`. The only expected hits are in
      `scripts/rename-project.mjs`, `docsagent/DEVLOG.md`, and this file.
* [ ] Run `npm run check`. It must print `BUILD OK`.
* [ ] Run `npm run check -- e2e`.

---

## 4. Remove the Optional Parts You Do Not Need

Files of an optional part start with an `OPTIONAL` note.

### Auth only

1. Delete `src/app/api/auth/`, `src/data/remote/auth/`, `src/presentation/ui/auth/`,
   `src/data/repository/better-auth-session-repository*`,
   `src/domain/repository/session-repository.ts`, `src/domain/model/user.ts`, and
   `src/domain/usecase/get-current-user-use-case*`.
2. Remove `getAuth`, `getCurrentUserUseCase`, and their imports from `src/di/container.ts`.
3. Remove the four Better Auth tables from `schema.ts`, delete `migrations/`, and run
   `npm run db:generate`.
4. Remove the `BETTER_AUTH_*` and `GOOGLE_*` variables from `src/core/config/env.ts`, its test, and
   `.env.example`.
5. Remove the sign-up test from `e2e/smoke.spec.ts`.
6. Run `npm uninstall better-auth`.

### Database and auth (a site with no stored data)

Do the steps above, then:

1. Delete `src/data/local/database/` and `drizzle.config.ts`.
2. Delete `src/core/config/database-url*`, and remove `DATABASE_URL` from `env.ts`, its test, and
   `.env.example`.
3. Remove `getDatabase` from `src/di/container.ts`.
4. Remove the `db:*` scripts from `package.json`, `drizzle-kit migrate` from
   `playwright.config.ts`, and `serverExternalPackages` from `next.config.ts`.
5. Run `npm uninstall drizzle-orm drizzle-kit postgres @electric-sql/pglite`.

Then run `npm run check`.

---

## 5. Replace the Placeholders

* **Start page:** `src/app/page.tsx` shows the app name. Replace it with your first feature (see
  "Adding a feature" in `docsagent/ARCHITECTURE.md`).
* **`src/core/config/app-config.ts`:** set the description.
* **`src/app/favicon.ico`:** replace it with your icon.
* **Empty folders** contain a `.gitkeep` file so that git keeps them. Delete the `.gitkeep` once a
  folder has real files, or delete the folder if the project does not need it.

---

## 6. Going Live

Vercel is the simplest host. Its free plan is for non-commercial projects only.

1. Create a Postgres database on Neon or Supabase, and run `npm run db:migrate` against it (see
   "Database" in `docsagent/ARCHITECTURE.md`).
2. Import the repository into Vercel.
3. Set `DATABASE_URL`, `BETTER_AUTH_URL` (the public address), and `BETTER_AUTH_SECRET` (generate
   it with `npx @better-auth/cli secret`) in the Vercel project.
4. Add every service you connected to `docsagent/SERVICES.md`.

---

## 7. Review the AI Assistant Files

The template ships with files that guide AI coding assistants. Open them and adjust them to your
project:

| File | Purpose |
|---|---|
| `AGENTS.md` | Rules the AI follows: scope, comments, logging, tests, architecture, and git workflow. |
| `docsagent/DEVLOG.md` | Timestamped log of what has been done, newest entry first, so the AI does not have to re-read the whole codebase every session. |
| `docsagent/ROADMAP.md` | Planned work, split into phases and checkbox tasks (`[ ]` open, `[x]` done). |
| `docsagent/PROJECT_DISCOVERY.md` | The questions the AI asks to write the app plan and the design criteria. |
| `docsagent/FIRST_SESSION.md` | What the AI asks and does in the first session (AI tool, git, project discovery). |
| `docsagent/ARCHITECTURE.md` | Full folder tree, parts of a feature, how to add one, and the database. |
| `docsagent/ROADMAP_ARCHIVE.md` | Finished roadmap phases, moved out of `ROADMAP.md`. |

Things to do:

* [ ] Read `AGENTS.md` and change, add, or remove rules as you see fit.
* [ ] Replace the placeholder phases in `docsagent/ROADMAP.md` with your own plan.
* [ ] Leave the first `docsagent/DEVLOG.md` entry as it is: it describes what the template gave you,
      and its mention of `Web Starter` is intentional.

In your first session, tell the AI to read `AGENTS.md`. It will then ask you two things and record
your answers in the file:

* **Which AI tool you are using.** It renames `AGENTS.md` to the file name your tool loads
  automatically (for example `CLAUDE.md` for Claude Code), so later sessions pick the rules up on
  their own.
* **Who makes git commits and pushes:** the AI or you.

When the setup is finished, the AI runs the **project discovery** interview from
`docsagent/PROJECT_DISCOVERY.md`. It asks you, a few questions at a time, about the product and then
about its design. From your answers it writes:

* `docsagent/APP_PLAN.md`: the plan, from the first release to the long-term vision.
* `docsagent/DESIGN.md`: the design system the theme is built from.
* `docsagent/design.html`: a single page showing the palette, components, and page mockups. Open it
  in a browser.

You can answer any question with "you decide" or "not sure yet". The AI then makes a choice and
explains it, or records the question as open. It also rebuilds `docsagent/ROADMAP.md` from the plan.

---

## 8. Remove the Setup Files

After completing the setup successfully:

* Delete this file, `SETUP.md`, and the "First-Time Setup" section of `README.md`.
* Keep `docsagent/PROJECT_DISCOVERY.md`: the AI uses it again when you want to revisit the plan or
  the design.
* Optionally delete `scripts/rename-project.mjs` and the `rename` script in `package.json`.

The project is now ready for development.
