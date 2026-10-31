# Roadmap

Everything that is still to be done, organized in phases. Each phase is broken into small tasks.

- `- [ ]` open task
- `- [x]` finished task

Mark tasks as done when they are finished. When every task of a phase is done, move the phase to
`ROADMAP_ARCHIVE.md` (newest at the top) and leave one line here:
`Phase N — done, see ROADMAP_ARCHIVE.md`. Add new tasks to the phase they belong to, or add a new
phase.

---

## Phase 0 — Project Setup

- [ ] Run `npm run rename` with the new project name
- [ ] Verify the rename and search for leftover `web-starter` references
- [ ] Remove the optional parts the project does not need (auth, database)
- [ ] Review `AGENTS.md` and adjust the rules to the project
- [ ] Answer the AI's first-session questions (AI tool, who makes git commits and pushes)
- [ ] Run `npm run check` and open the app
- [ ] Delete `docsagent/SETUP.md`
- [ ] Project discovery (`docsagent/PROJECT_DISCOVERY.md`): write and approve
      `docsagent/APP_PLAN.md`
- [ ] Project discovery: write and approve `docsagent/DESIGN.md` and `docsagent/design.html`
- [ ] Replace the phases below with the plan from `docsagent/APP_PLAN.md`

## Phase 1 — Foundation

<!-- Replace the tasks below with the real plan for this project. -->

- [ ] Apply `docsagent/DESIGN.md` to `src/presentation/ui/theme/` (colors, fonts, radius)
- [ ] Define the site's pages and routes
- [ ] Define the domain models, repository interfaces, and use cases
- [ ] Add the first feature and replace the placeholder start page
- [ ] Choose the production database and host, and record them in `docsagent/SERVICES.md`

## Phase 2 — Features

- [ ] ...

## Later

- [ ] Add `next-intl` if the app needs several languages
