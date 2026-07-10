import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static SPA served from root. Absolute asset paths (/images/…, /assets/…)
// resolve correctly on every client route. If deploying under a subpath
// (e.g. GitHub Pages project site), set base to '/<repo>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
