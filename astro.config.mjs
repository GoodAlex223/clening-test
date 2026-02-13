import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import vercel from '@astrojs/vercel'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
  output: 'server',
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
})
