# Project Discovery

The interview the AI runs with the developer once the setup in [`SETUP.md`](SETUP.md) is
finished, before the first feature is built. Its answers become three documents that guide the
rest of the project:

| Output | What it is |
|---|---|
| `docsagent/APP_PLAN.md` | What the site does, for whom, its scope, backend, and how it grows over time. |
| `docsagent/DESIGN.md` | The design system: colors, typography, shapes, components, layout, motion, tone. |
| `docsagent/design.html` | A single-page visual version of `DESIGN.md`: swatches, components, and page mockups. |

None of these files exist in the template. The AI writes them from the developer's answers.

This file is the question list and the rules for writing the outputs. Developers may add, remove,
or reword questions to fit their way of working.

---

## 1. How to Run the Interview

### Order

1. **Part A — App Plan** (questions A1–A14). Then write `docsagent/APP_PLAN.md` and get the
   developer's OK.
2. **Part B — Design Criteria** (questions B1–B12). The design follows from the plan, so it comes
   second. Then write `docsagent/DESIGN.md` and `docsagent/design.html` and get the developer's OK.
3. **Wrap-up** (section 5): update `ROADMAP.md`, `DEVLOG.md`, and the Project Settings in
   `AGENTS.md`.

### Rules for the AI

- **Ask in the developer's language**, whatever language this file is written in.
- **Ask one group at a time** (A1, then A2, ...), three to six questions per message. Never paste the
  whole list at once.
- **Skip what is already known.** If the developer has already explained the idea, shared a
  document, a website, screenshots, a Figma file, or a competitor site, read it first and only ask
  what is still missing. Repeat back what you understood so the developer can correct it.
- **Every question may be answered with "you decide", "skip", or "not sure yet".**
  - "You decide": choose the option that fits the rest of the answers, explain the choice in one
    sentence, and record it in the decision log as *decided by AI*.
  - "Skip" / "not sure yet": record it under *Open questions* in the plan. Do not invent an answer.
- **Offer options for technical questions.** The developer may not be technical. List two to four
  realistic options with one line of trade-off each, and say which one you recommend and why.
- **Follow up on vague answers** ("a social site", "modern design") with one or two concrete
  questions or examples to choose from.
- **Do not invent features or requirements** the developer did not ask for. Suggestions are welcome,
  but mark them as suggestions and let the developer accept or drop them.
- **Summarize before writing.** At the end of each part, give a short summary of the answers and
  ask for a confirmation before you write the files.
- **Pausing is fine.** If the developer stops halfway, write what you have with the unanswered
  groups listed as open, and continue from there in a later session.

### Question 0 — before starting

> Which language should the plan and design documents be written in?

The default is the language set in `AGENTS.md` Project Settings.

---

## 2. Part A — App Plan

### A1. Vision and purpose

- What is the site's name, or a working name? Is a domain name chosen?
- Describe it in one sentence: what does it do and for whom?
- What kind of site is it: a web app people sign in to, an online store, a marketplace, a content
  site or blog, a company or landing page, an admin panel?
- Which problem does it solve? How do people deal with that problem today?
- What makes it different from what already exists?
- Is this a personal project, a startup product, a client project, or an internal company tool?
- What does success look like in 6 months? And in 2 years?
  (number of users, revenue, a finished portfolio piece, solving the team's own problem, ...)

### A2. Users

- Who are the main users? Describe one or two typical users (age range, job, daily situation).
- Is it for consumers (B2C), businesses (B2B), or both?
- How comfortable are the users with technology?
- In which countries and regions will it be used?
- Are there users with special needs: older users, children, low vision, keyboard-only use, slow
  connections, old devices?
- Are there different kinds of users with different rights (for example customer and seller,
  student and teacher, user and admin)?

### A3. Scope and features

- Walk through the most important thing a user does on the site, step by step, from arriving to
  reaching their goal.
- Which features **must** be in the first release (MVP)? Keep it to the smallest useful set.
- Which features are nice to have soon after the first release?
- Which features are ideas for later?
- What is explicitly **not** part of the site, now or later?
- Which pages can you already imagine? (home, list, detail, profile, settings, search, pricing, ...)
- Do users create content (posts, photos, reviews, messages)? Can other users see it?
- Does the site need an admin panel to manage content and users? Who uses it?
- Should there be onboarding or a tour for new users?

### A4. Platforms and devices

- Which screens matter most: phones, desktops, or both equally? (This decides mobile-first or
  desktop-first.)
- Must it be installable like an app (a Progressive Web App)?
- Will a native Android or iOS app be needed, now or later? If so, should the backend serve it too?
  (The API then needs to stay independent of the web pages.)
- Must any part work offline or on very slow connections?
- Which browsers matter? The default is the current versions of Chrome, Safari, Firefox, and Edge.

### A5. Accounts and data

- Do users need an account? Which parts work without signing in?
- Which sign-in methods: email and password, Google, Apple, phone number with SMS, magic link,
  company SSO? (Email and password and Google are in the template.)
- What data does the site store? (profiles, posts, orders, health data, location, files, ...)
- Is any of the data sensitive: health, finance, children, exact location, documents?
- Which privacy laws apply? (GDPR in the EU, KVKK in Türkiye, COPPA for children, ...)
- Can users export or delete their account and data themselves?

### A6. Backend and infrastructure

- The template is full stack: pages, server logic, and database access live in one Next.js project.
  Does that fit, or is there an existing backend or API? If so: its documentation, base URL, and
  auth method.
- Which Postgres host?
  - **Supabase:** Postgres plus file storage, realtime, and its own auth. A good fit if those are
    needed.
  - **Neon:** Postgres only, with a generous free tier and development branches.
  - **Own server:** full control, more work.
- Keep Better Auth (users stay in your database), or use the auth of a service such as Supabase?
- Where will it be hosted? (Vercel, Netlify, Cloudflare, Railway, Render, a VPS such as Hetzner, ...)
  Is it commercial? (Vercel's free plan is non-commercial only.) Is there a monthly budget?
- Who maintains the backend and database: you, a teammate, another company, or the AI?
- Does anything need to be realtime (chat, live prices, collaborative editing, notifications)?
- File uploads (photos, videos, documents)? Where are they stored (Supabase Storage, S3, R2, Vercel
  Blob)?
- Which emails does it send (verification, password reset, receipts, newsletters)? With which
  provider (Resend, Postmark, SES)?
- Background work: scheduled jobs, reminders, reports?
- How many environments: only production, or also staging? Should every pull request get a preview
  deployment?

### A7. Integrations

Which of these does the site need? For each one, which provider (or "you decide")?

- Payments: Stripe, iyzico, PayTR, Paddle, ...
- Maps and location: Google Maps, Mapbox, OpenStreetMap
- Analytics: Vercel Analytics, Plausible, PostHog, Google Analytics, none
- Error tracking: Sentry, none
- Ads: AdSense or other networks
- AI features: chat, summaries, image recognition, recommendations
- A headless CMS for editors: Sanity, Payload, Contentful, none
- Search: Postgres full-text search, Algolia, Meilisearch
- Sharing to social networks, embedded videos, chat widgets
- Any other third-party API (weather, news, shipping, invoicing, company systems, ...)

### A8. Monetization

- How will the site make money, if at all? Free, ads, one-time purchase, subscription, freemium,
  commission per transaction, part of a paid service?
- If paid: rough price range, free trial, which features are behind the paywall?

### A9. Languages and content

- Which languages at launch? Which later? Which one is the default? Any right-to-left language
  (Arabic, Hebrew)? (The template ships with English and Turkish through `next-intl`.)
- Should visitors get a language switcher? Should addresses be translated too (`/tr/hakkinda`
  instead of `/tr/about`)?
- Currency, date, number, and unit formats?
- Where does the content come from: users, the team (editorial), an API, or AI?
- Does user content need moderation or reporting?

### A10. Quality targets

- How many users do you expect at launch, and after one year? (rough guesses are fine)
- **Search engines:** must people find it on Google? Which pages? Which search terms matter?
- Anything that must be especially fast (first load, search, long lists)?
- Security needs: two-factor sign-in, rate limits, bot protection, audit logs?
- Accessibility target: basic, or WCAG AA?
- Limits on page weight for slow connections?

### A11. Release and team

- Is there a target date for the first release? Any fixed milestones (a demo, an event, a client
  deadline)?
- Who tests it before launch?
- Who works on the project: only you with the AI, or a team? Which roles (design, backend, QA)?
- Should every merge to `main` deploy automatically?
- Is there a budget limit for services and tools?

### A12. Legal

- Is there a privacy policy, terms of use, and a cookie notice, or should drafting them be a task?
- Does the site use cookies that need consent (analytics, ads)?
- For a store: distance sales contract, return policy, invoicing?
- Target age group?
- Brand name, domain, and trademark: checked, or still open?

### A13. References and competitors

- Which sites are similar to yours? What do you like and dislike about them?
- Any sites (in any category) whose experience you would like to match?

### A14. Risks and open points

- What worries you most about this project (time, cost, technology, finding users, ...)?
- Is anything still undecided that we should note now?

---

## 3. Part B — Design Criteria

Ask these after `APP_PLAN.md` is confirmed. Use the plan to suggest answers: a site for older users
suggests larger text and high contrast; a finance product suggests a calm, trustworthy palette.

### B1. Brand and personality

- Describe the site's character in three to five words (for example calm, playful, premium,
  minimal, bold, warm, technical, friendly).
- Is there an existing brand: logo, colors, fonts, brand guide? Please share them.
- Which sites or apps have a look you like? What exactly do you like about them?
- Is there a look or feeling that must be avoided?

### B2. Colors

- Any colors you want, or colors that must not be used?
- Light theme, dark theme, or both? Should it follow the system setting? (The template follows it.)
- How colorful should the interface be: mostly neutral with one accent color, or rich and colorful?
- Background style: plain white or near-black, tinted neutrals, gradients, images?
- Are there colors with fixed meaning in the domain (green for income and red for expense, category
  colors, status colors)?

### B3. Typography

- Which font style fits: clean geometric sans, humanist sans, rounded, serif for a classic feel, or
  monospace accents? (The template uses Geist.)
- A specific font, or "you decide" from Google Fonts? (The font must support every launch language;
  for Turkish check ç ğ ı İ ö ş ü.)
- How dense is the text: large and airy, or compact to show more information?

### B4. Shapes and surfaces

- Corners: sharp (0 px), slightly rounded (4–8 px), rounded (12–16 px), very round (24 px+), or
  pill-shaped buttons?
- Depth: flat with borders, soft shadows, or layered tinted surfaces?
- Any special effects: blur or glass, gradients, outlines, grain? (Use with care: they cost
  performance and contrast.)

### B5. Icons, images, illustrations

- Icon style: thin or bold strokes, outlined or filled? (The template uses Lucide.)
- Imagery: photos, flat illustrations, 3D illustrations, emoji, or none?
- Empty states: illustrations, icons, or text only?
- Any ideas for the logo, the favicon, and the image shown when a link is shared on social media?

### B6. Components

- **Buttons:** solid, soft, outlined, text-only; which one is the main action style? Preferred
  height (36, 40, 48 px)?
- **Form fields:** labels above the field or inside it? Errors below the field or in a summary?
- **Cards and lists:** cards with shadows, outlined cards, or plain rows with dividers? Tables for
  data?
- **Selection:** checkboxes, radio buttons, switches, selects, comboboxes; any preference?
- **Dialogs vs. side panels vs. separate pages** for forms and confirmations?
- **Feedback:** toasts, banners, inline messages?
- **Loading:** spinners, progress bars, or skeleton placeholders?

### B7. Layout and navigation

- Navigation pattern: top bar, sidebar, both, or a bottom bar on phones? How many top-level
  destinations?
- Content width: narrow and centered, wide, or full width?
- Spacing: compact (more on screen) or comfortable (more white space)?
- Sticky header or footer? What does the footer hold?
- How does each main page change between phone, tablet, and desktop?

### B8. Motion and feedback

- How much animation: minimal, moderate, or expressive?
- Page transitions: none, fade, or slide?
- Hover effects and micro-interactions?
- Should animations stop when the system "reduce motion" setting is on? (Recommended: yes.)

### B9. Accessibility

- Minimum text contrast: WCAG AA (recommended) or AAA?
- Everything usable with the keyboard, with a visible focus ring?
- Text zoom up to 200 % without broken layouts?
- Touch targets of at least 44 × 44 px on phones?
- Colorblind-safe use of color (never color as the only signal)?

### B10. Voice and content

- Tone of the text: formal, neutral, friendly, or playful? (In Turkish: "sen" or "siz"?)
- Emoji in the interface: yes, sometimes, never?
- How should errors speak to the user (technical, plain and helpful, light humor)?

### B11. Pages to show in the design page

- Which pages should `design.html` mock up? The default is the main pages from the plan, for example
  the landing page, sign-in, a dashboard or home page, a list, a detail page, a form, settings, and
  an empty and an error state.
- Which page matters most? It gets the most detailed mockup.

### B12. Design tools

- Is there a designer or a Figma file? If yes, Figma is the source and `DESIGN.md` documents it.
- If not, `DESIGN.md` is the source of truth, and the theme follows it.

---

## 4. Writing the Outputs

Write the files from the answers only. Mark every value that came from the AI rather than the
developer, so it can be reviewed later. Use real content from the plan (real page names, feature
names, example data), never lorem ipsum.

### `docsagent/APP_PLAN.md`

Sections, in this order (leave a section out only if it truly does not apply, and say so):

1. **Overview** — name, one-sentence pitch, problem, solution, project type.
2. **Goals and success metrics** — 6-month and 2-year goals, measurable where possible.
3. **Users** — personas, user roles and their rights, regions and languages.
4. **Scope** — MVP, next release(s), later, and out of scope, as separate lists.
5. **Features** — table with feature, short description, user role, priority (must / should /
   could), and target release.
6. **User journeys** — the main flows step by step.
7. **Site map** — all pages, their addresses, and how they connect, as a Mermaid flowchart. Mark
   which pages are public and which need a sign-in.
8. **Platforms and devices** — screen priorities, browsers, installability, offline level.
9. **Architecture overview** — site, database, and third-party services as a Mermaid diagram;
   which template parts are used (database, auth) and which are removed; a first list of features
   (`presentation/features/<name>`).
10. **Data model draft** — main entities, their important fields, and relations (Mermaid ER diagram).
11. **Backend and infrastructure** — database, hosting, environments, auth, storage, email,
    background jobs, and estimated monthly cost.
12. **Integrations** — each service, its purpose, and the chosen provider.
13. **Monetization**
14. **Localization and content**
15. **Non-functional requirements** — performance, search engines, security, accessibility, scale.
16. **Privacy and legal** — sensitive data, applicable laws, account deletion, policies, cookies.
17. **Release plan** — milestones with rough dates, testing, deployment.
18. **Future vision** — where the site could go in 2+ years (new platforms, features, markets) and
    what to keep in mind today so that growth stays possible.
19. **Risks** — each risk with its likelihood, impact, and mitigation.
20. **Open questions**
21. **Decision log** — table with date, decision, chosen by (developer / AI), and reason.

### `docsagent/DESIGN.md`

The written design system. Each value maps to a place in the code
(`src/presentation/ui/theme/globals.css`), so the theme can be built from it directly.

1. **Design principles** — three to five short rules derived from B1 (for example "one clear
   action per page").
2. **Color palette** — light and dark values, mapped to the shadcn/ui tokens (`background`,
   `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`,
   `border`, `input`, `ring`, with their `-foreground` pairs), plus domain colors (success, warning,
   categories). List the contrast ratio of every text and background pair and confirm it meets the
   chosen WCAG level.
3. **Typography** — font families and the type scale (display, headings, body, small, caption) with
   size, line height, weight, and letter spacing, and how headings shrink on phones.
4. **Spacing** — the spacing scale on a 4 px grid and the standard page padding per breakpoint.
5. **Shapes** — the radius scale in px (`--radius`) and which component uses which radius.
6. **Elevation and surfaces** — how depth is shown (border, shadow, tinted surface) and the levels.
7. **Iconography and imagery** — icon set and style, sizes, illustration and photo rules, logo,
   favicon, and social sharing image direction.
8. **Components** — for each component in B6: variants, sizes, when to use which, and states
   (default, hover, focus, active, disabled, loading, error).
9. **Layout and navigation** — navigation pattern, content width, grid, breakpoints (`sm`, `md`,
   `lg`, `xl`) and how each page type adapts.
10. **Page templates** — the standard structure of list, detail, form, and settings pages, and of
    the empty, loading, and error states.
11. **Motion** — durations, easing, transition types, reduced-motion behavior.
12. **Accessibility** — contrast, focus styles, keyboard use, text zoom, touch targets, labels.
13. **Voice and tone** — writing rules and examples of good and bad microcopy, error messages.
14. **Do and don't** — short list of examples.
15. **Implementation map** — which tokens go in `globals.css`, which fonts go in
    `src/app/layout.tsx`, and which shadcn/ui components to add.

### `docsagent/design.html`

A single, self-contained HTML page that shows `DESIGN.md` visually. Open it in any browser.

- **One file:** all CSS and JavaScript inline. The only allowed external resource is Google Fonts
  for the chosen font; the page must still be readable without it.
- **Same values as `DESIGN.md`.** `DESIGN.md` is the source; when one changes, update the other in
  the same change.
- **Light / dark toggle** that switches every swatch, component, and mockup.
- **Sections:**
  1. Header with the site name, the design principles, and the personality words.
  2. Color palette: swatches for every token in light and dark, with value and contrast ratio.
  3. Typography specimen: every type scale role with a real sample sentence from the site.
  4. Spacing and radius scales, drawn to size.
  5. Component gallery: all button variants and states, form fields (empty, filled, error,
     disabled), selection controls, cards, list rows, table, dialog, toast, header, navigation, and
     loading and empty states.
  6. Page mockups: the pages from B11 inside desktop (1280 px, scaled) and phone (390 px) frames,
     built with the real tokens and real example content, the most important page first.
  7. Site map: the map from `APP_PLAN.md` as an inline SVG diagram.
  8. Do and don't examples side by side.
- **Responsive:** the page itself works on a phone screen and a desktop monitor.

---

## 5. Wrap-up

After the developer has approved all three files:

1. **`ROADMAP.md`:** replace the placeholder phases with phases built from the release plan and the
   feature list in `APP_PLAN.md`. Add the tasks to apply `DESIGN.md` to
   `src/presentation/ui/theme/` and to remove the template parts the plan does not use.
2. **`AGENTS.md`:** set "Project discovery" in Project Settings to `DONE`.
3. **`DEVLOG.md`:** add an entry summarizing the key decisions and linking the three files.
4. Do not start building the theme or features in the same step; they are roadmap tasks now.

### Keeping the documents alive

- When a decision changes later (a new feature, a different database, a new color), update
  `APP_PLAN.md` or `DESIGN.md` and `design.html` in the same piece of work, and add a row to the
  decision log.
- To redo the interview, or one part of it, ask the AI to run this file again; it updates the
  existing documents instead of starting from zero.
