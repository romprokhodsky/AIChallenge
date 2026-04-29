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

The workflow `.github/workflows/leaderboard-pages.yml` builds `leaderboard/` and publishes `leaderboard/dist` to Pages.

**One-time setup (repo owner)**

1. **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually: **Actions → Deploy leaderboard to GitHub Pages → Run workflow**).

**Live URL** (project site):

`https://<github-username>.github.io/<repository-name>/`

The app uses Vite `base: './'` so assets load correctly under that subpath. A `public/.nojekyll` file is included so GitHub Pages does not run Jekyll over the build output.

## Project layout

- `src/data/fakeData.ts` — Seeded random generator for people and events
- `src/aggregate.ts` — Filter, search, scoring, and sorting
- `src/components/` — UI sections
- `report.md` — Task write-up (tools, data policy, approach)

## License

Private / corporate challenge — add a license as required by your organization.
