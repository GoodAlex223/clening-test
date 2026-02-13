import { test, expect } from '@playwright/test'
import { THEMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'

test.describe('Gallery Filter', () => {
  for (const theme of THEMES) {
    test(`${theme}: filter buttons exist and "All" is active by default`, async ({ page }) => {
      await gotoWithTheme(page, theme, '/gallery')

      const allButton = page.locator('[data-filter="all"]')
      await expect(allButton).toBeVisible()
      await expect(allButton).toHaveAttribute('aria-pressed', 'true')

      // All gallery items should be visible
      const items = page.locator('[data-gallery-item]')
      const count = await items.count()
      expect(count).toBeGreaterThan(0)

      for (let i = 0; i < count; i++) {
        await expect(items.nth(i)).toBeVisible()
      }
    })
  }

  test('clicking a filter hides non-matching items', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/gallery')

    // Get all filter buttons (excluding "All")
    const filterButtons = page.locator('[data-filter]:not([data-filter="all"])')
    const filterCount = await filterButtons.count()
    expect(filterCount).toBeGreaterThan(0)

    // Click the first category filter
    const firstFilter = filterButtons.first()
    const filterValue = await firstFilter.getAttribute('data-filter')
    await firstFilter.click()

    // The clicked filter should be active
    await expect(firstFilter).toHaveAttribute('aria-pressed', 'true')

    // "All" should no longer be active
    await expect(page.locator('[data-filter="all"]')).toHaveAttribute('aria-pressed', 'false')

    // Only matching items should be visible
    const allItems = page.locator('[data-gallery-item]')
    const itemCount = await allItems.count()
    for (let i = 0; i < itemCount; i++) {
      const item = allItems.nth(i)
      const itemService = await item.getAttribute('data-service')
      if (itemService === filterValue) {
        await expect(item).toBeVisible()
      } else {
        await expect(item).toBeHidden()
      }
    }
  })

  test('clicking "All" after a filter shows all items again', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/gallery')

    // Apply a filter
    const firstFilter = page.locator('[data-filter]:not([data-filter="all"])').first()
    await firstFilter.click()

    // Click "All" to reset
    await page.locator('[data-filter="all"]').click()

    // All items should be visible again
    const allItems = page.locator('[data-gallery-item]')
    const count = await allItems.count()
    for (let i = 0; i < count; i++) {
      await expect(allItems.nth(i)).toBeVisible()
    }
  })

  test('filter buttons update aria-pressed correctly', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/gallery')

    const filterButtons = page.locator('[data-filter]')
    const count = await filterButtons.count()

    // Click each filter button and verify only it has aria-pressed="true"
    for (let i = 0; i < Math.min(count, 3); i++) {
      await filterButtons.nth(i).click()

      for (let j = 0; j < count; j++) {
        const expected = i === j ? 'true' : 'false'
        await expect(filterButtons.nth(j)).toHaveAttribute('aria-pressed', expected)
      }
    }
  })
})
