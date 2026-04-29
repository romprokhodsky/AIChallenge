import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project sites are served at https://<user>.github.io/<repo>/
// Use repo-root base in CI (GITHUB_REPOSITORY is set by Actions); locally use relative './'.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repo ? `/${repo}/` : './'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
