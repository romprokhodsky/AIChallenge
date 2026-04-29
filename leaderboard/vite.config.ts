import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages project sites load at `https://<user>.github.io/<repo>/`.
 * - CI: pass `VITE_BASE_PATH` from `actions/configure-pages` (`base_path`, e.g. `/AIChallenge`)
 *   and/or rely on `GITHUB_REPOSITORY` for `/<repo>/`.
 * - Local dev: no env → `base: './'`.
 */
function resolveBase(): string {
  const raw = process.env.VITE_BASE_PATH?.trim()
  if (raw) {
    const withLeading = raw.startsWith('/') ? raw : `/${raw}`
    return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
  }
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (repo) return `/${repo}/`
  return './'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: resolveBase(),
})
