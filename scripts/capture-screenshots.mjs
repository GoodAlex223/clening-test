/**
 * Capture above-the-fold screenshots for all 5 CleanSpark themes.
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs                    # live site
 *   BASE_URL=http://localhost:4321 node scripts/capture-screenshots.mjs  # local
 */
import { chromium } from '@playwright/test'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUTPUT = join(ROOT, 'public', 'images', 'screenshots')

const BASE_URL = process.env.BASE_URL || 'https://cleanspark-virid.vercel.app'
const COOKIE_NAME = 'cleanspark_theme'
const THEMES = ['minimal', 'bold', 'trust', 'bubbly', 'noir']
const VIEWPORT = { width: 1280, height: 800 }

async function main() {
  mkdirSync(OUTPUT, { recursive: true })
  console.log(`Capturing screenshots from ${BASE_URL}`)
  console.log(`Viewport: ${VIEWPORT.width}x${VIEWPORT.height}\n`)

  const browser = await chromium.launch()

  for (const theme of THEMES) {
    const context = await browser.newContext({ viewport: VIEWPORT })

    await context.addCookies([
      {
        name: COOKIE_NAME,
        value: theme,
        domain: new URL(BASE_URL).hostname,
        path: '/',
      },
    ])

    const page = await context.newPage()
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' })

    // Let fonts load and hero animations settle
    await page.waitForTimeout(2000)

    const outPath = join(OUTPUT, `${theme}-home.png`)
    await page.screenshot({ path: outPath, type: 'png' })

    console.log(`  ${theme}-home.png`)
    await context.close()
  }

  await browser.close()
  console.log('\nDone! Screenshots saved to public/images/screenshots/')
}

main().catch((err) => {
  console.error('Screenshot capture failed:', err)
  process.exit(1)
})
