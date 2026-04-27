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

- **Base URL** — The app is built with Vite `base: './'` so it can be served from a subpath.
- In the repo, open **Settings → Pages** and set the **source** to **GitHub Actions** if you use the provided workflow, or deploy the `dist` folder of `leaderboard/` to the `gh-pages` branch (e.g. with [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)).

**After deploy, your app URL** will be along the lines of:

`https://<github-username>.github.io/<repository-name>/`

If the app lives in a **subfolder of the default branch** (e.g. only `leaderboard/`), the workflow in `.github/workflows/` is scoped to that folder; adjust paths if the repo root is the app.

## Project layout

- `src/data/fakeData.ts` — Seeded random generator for people and events
- `src/aggregate.ts` — Filter, search, scoring, and sorting
- `src/components/` — UI sections
- `report.md` — Task write-up (tools, data policy, approach)

## License

Private / corporate challenge — add a license as required by your organization.
