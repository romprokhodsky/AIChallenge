import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Relative base works well for GitHub Pages project sites
export default defineConfig({
  plugins: [react()],
  base: './',
})
