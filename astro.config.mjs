import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import node from '@astrojs/node'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({ mode: 'standalone' }),
  output: 'static',
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
})
