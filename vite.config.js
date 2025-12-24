import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you host at https://<user>.github.io/<repo>/ then set base to '/<repo>/'
// For local dev or a custom domain, leave as '/'.
const repoBase = process.env.VITE_REPO_BASE || '/'

export default defineConfig({
  plugins: [react()],
  base: repoBase,
})
