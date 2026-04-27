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
5. **Icons** — Category, search, star, and chevron icons use glyphs from the `Fluent MDL2 Hybrid Icons` font (with system fallbacks) to match the reference UI.
6. **GitHub Pages** — `vite.config.ts` sets `base: './'` so **relative** asset URLs work from the Pages URL. A workflow under `.github/workflows/` (if present) builds and publishes `leaderboard/dist`.

## Data replacement

- **Names** — Western/European–style first and last names combined per row (e.g. *James Bergström*, *Olga Kowalski*), chosen for plausibility only, not to represent real individuals.
- **Groups and titles** — `Alpha Squad`, `Group Manager`, etc. are **generic** placeholders.
- **Photos** — Small stock/demo avatar images are loaded from `i.pravatar.cc` by numeric ID. They are used only as generic visual placeholders and are not connected to any employee identity.
- **Activity lines** — Tags such as `[EDU]` and `[REG]` and workshop titles are **fictional**; dates and points are generated for the demo.
- **Categories** — `Education`, `Public Speaking`, and `University Partners` in filters match the reference; the icon strip maps the same three categories to **Education** (mortarboard), **public speaking** (easel/screen), and **University partnership** (smiley).

## Tools

| Use | Tool |
| --- | ---- |
| UI | React 19, TypeScript |
| Build | Vite 8 |
| Icons | Fluent MDL2 Hybrid Icons font glyphs |
| Version control / hosting | Git, GitHub, GitHub Pages (optional GitHub Actions) |

## How to run locally

```bash
cd leaderboard
npm install
npm run dev
```

## Live site

After enabling GitHub Pages on this repository, add the public URL here:

**Live URL:** `https://<user>.github.io/<repo>/` (or your custom domain)

Replace `<user>` and `<repo>` after the first successful deploy.
