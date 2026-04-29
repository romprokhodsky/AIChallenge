# Leaderboard (demo)

Synthetic-data replica of a contributions leaderboard. **No** corporate or personal data is included in the repository.

## Scripts

| Command | Description |
| -- | -- |
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |

## GitHub Pages

The workflow `.github/workflows/leaderboard-pages.yml` builds `leaderboard/` and pushes **`leaderboard/dist`** to the **`gh-pages`** branch (static hosting that avoids artifact/environment issues).

**One-time setup (repo owner)**

1. Push to **`main`** (or **Actions → Deploy leaderboard to GitHub Pages → Run workflow**). Wait until the run finishes and the **`gh-pages`** branch appears.
2. **Settings → Pages → Build and deployment**
3. Set **Source** to **Deploy from a branch** (not “GitHub Actions”).
4. **Branch:** `gh-pages`, **Folder:** `/ (root)` → **Save**.

If **Source** stays on **GitHub Actions** while this workflow only updates **`gh-pages`**, GitHub may still try to serve the wrong root and you will see a **404** at the project URL.

**Live URL** (project site):

`https://<github-username>.github.io/<repository-name>/`

Example: `https://romprokhodsky.github.io/AIChallenge/` — must include the **repository name** path. Opening only `https://<user>.github.io/` will not load this app.

CI sets **`VITE_BASE_PATH`** to `/<repo-name>/` so `vite.config.ts` matches that URL. Local builds without that env use `base: './'`.

A `public/.nojekyll` file is copied into `dist` so GitHub Pages does not run Jekyll over the Vite output.

## Project layout

- `src/data/fakeData.ts` — Seeded random generator for people and events
- `src/aggregate.ts` — Filter, search, scoring, and sorting
- `src/components/` — UI sections
- `report.md` — Task write-up (tools, data policy, approach)

## License

Private / corporate challenge — add a license as required by your organization.
