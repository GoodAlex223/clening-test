/**
 * Capture theme screenshots and OG images for all 5 CleanSpark themes.
 *
 * Generates two sets of images:
 *   - README screenshots: 1280×800  → public/images/screenshots/{theme}-home.png
 *   - OG/social images:   1200×630  → public/images/og/{theme}-og.png
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
const SCREENSHOT_OUTPUT = join(ROOT, 'public', 'images', 'screenshots')
const OG_OUTPUT = join(ROOT, 'public', 'images', 'og')

const BASE_URL = process.env.BASE_URL || 'https://cleanspark-virid.vercel.app'
const COOKIE_NAME = 'cleanspark_theme'
const THEMES = ['minimal', 'bold', 'trust', 'bubbly', 'noir']

const CAPTURES = [
  { label: 'Screenshots', viewport: { width: 1280, height: 800 }, output: SCREENSHOT_OUTPUT, suffix: '-home' },
  { label: 'OG images', viewport: { width: 1200, height: 630 }, output: OG_OUTPUT, suffix: '-og' },
]

async function main() {
  for (const cap of CAPTURES) {
    mkdirSync(cap.output, { recursive: true })
  }

  console.log(`Capturing from ${BASE_URL}\n`)

  const browser = await chromium.launch()

  for (const cap of CAPTURES) {
    console.log(`${cap.label} (${cap.viewport.width}×${cap.viewport.height}):`)

    for (const theme of THEMES) {
      const context = await browser.newContext({ viewport: cap.viewport })

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

      const filename = `${theme}${cap.suffix}.png`
      await page.screenshot({ path: join(cap.output, filename), type: 'png' })

      console.log(`  ${filename}`)
      await context.close()
    }

    console.log()
  }

  await browser.close()
  console.log('Done!')
  console.log('  Screenshots: public/images/screenshots/')
  console.log('  OG images:   public/images/og/')
}

main().catch((err) => {
  console.error('Capture failed:', err)
  process.exit(1)
})
