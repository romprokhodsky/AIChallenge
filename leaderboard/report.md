# Leaderboard clone — write-up

## Task

Replicate a corporate leaderboard UI in a public repository without using real employee data, then deploy a static build to **GitHub Pages**. The reference design used anonymized labels such as `Name Surname` and `Group name` in screenshots; this implementation uses only **synthetic** people, groups, and events.

## Approach

1. **Stack** — [Vite](https://vitejs.dev/) and **React** (TypeScript) for a single-page app with fast local development and a static production bundle suitable for GitHub Pages.
2. **Data** — A **seeded pseudo-random** generator (`mulberry32`) creates a **stable** set of 16 employees and many activities (year, month, day, category, display line, points). All names, groups, and events are **fabricated**; there is no import from or connection to any production system.
3. **Parity** — The UI includes:
   - header title and subtitle;
   - **Year**, **Quarter**, and **Category** filters plus a **search** field (search matches **first name, last name, or full name** as substrings, case-insensitive);
   - **Top 3** podium: **top three of the filtered and sorted** list; desktop order **2nd – 1st – 3rd**; mobile **stacked 1st – 2nd – 3rd**;
   - full list with rank, **event count** and **total points** for the same filtered scope;
   - one **expanded** row at a time with a **category breakdown** (outline icons: Education, Public speaking, University Partnership) and a **RECENT ACTIVITY** table.
4. **Styling** — **CSS** variables, spacing, and colors are tuned to match the reference screenshots; **no** component library was used to keep the bundle small and the layout controllable.
5. **Icons** — Search, stars, and chevrons use **Font Awesome**; category strips use **Lucide-style** outline SVGs (graduation cap, presentation screen, smile) at a consistent size and stroke weight.
6. **GitHub Pages** — CI sets `VITE_BASE_PATH` to `/<repo>/` so assets resolve on the project site; locally `base` is `./`. A workflow builds `leaderboard/dist`, deploys via **GitHub Actions Pages** (artifact + `deploy-pages`), and mirrors the same build to the **`gh-pages`** branch.

## Vibe-coding and AI workflow

The app was built with **AI-assisted “vibe-coding” in Cursor**: short loops of **prompt → implement → compare to reference screenshots → refine**, instead of a single frozen specification up front.

- **Screenshot-driven iteration** — Layout, spacing, filters, podium, list rows, expanded activity blocks, icons, and accordion affordances were **iterated against reference screenshots** until the UI matched the intended design closely enough to ship. Where something looked wrong, the next step was usually another tight prompt plus a visual check—not a big redesign doc.
- **No sensitive data in the repo** — **Real employee photos and production identifiers were not used.** Reference captures that contained identifiable imagery were **not pasted into the codebase**; this write-up and the app rely on **fully synthetic** people and **generic stock avatars** only, so nothing sensitive travels with the public GitHub Pages build.
- **BMAD vs plain prompting** — Both styles were tried: **BMAD-style** flows (agent skills, structured prompts, story-shaped execution) helped for consistency on documentation and larger edits; **plain prompting** (direct chat/agent instructions) was faster for CSS and small UI tweaks. The final code reflects a mix of those passes rather than a single methodology.
- **Models used** — Sessions rotated across **several Cursor backends**, including among others **Composer 2 Fast**, **GPT‑5.3 Codex**, and **GPT‑5.5 Medium**, depending on whether the step needed a quick edit or a deeper pass. *Exact model picks varied by session; check your Cursor chat/agent headers if you need a precise audit trail.*

## Data replacement

- **Names** — Western/European–style first and last names combined per row (e.g. *James Bergström*, *Olga Kowalski*), chosen for plausibility only, not to represent real individuals.
- **Groups and titles** — `Alpha Squad`, `Group Manager`, etc. are **generic** placeholders.
- **Photos** — Small stock/demo avatar images are loaded from `i.pravatar.cc` by numeric ID. They are used only as generic visual placeholders and are not connected to any employee identity.
- **Activity lines** — Tags such as `[EDU]` and `[REG]` and workshop titles are **fictional**; dates and points are generated for the demo.
- **Categories** — `Education`, `Public Speaking`, and `University Partnership` in filters match the reference; the icon strip maps the same three categories to **Education** (graduation cap), **Public Speaking** (presentation screen), and **University Partnership** (smile).

## Tools

| Use | Tool |
| --- | ---- |
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Icons | Font Awesome + inline SVG (Lucide-aligned outlines for categories) |
| Version control / hosting | Git, GitHub, GitHub Pages (Actions deploy + optional `gh-pages` branch) |

## How to run locally

```bash
cd leaderboard
npm install
npm run dev
```

## Live site

After enabling GitHub Pages on this repository, add the public URL here:

**Live URL:** `https://romprokhodsky.github.io/AIChallenge/` 
