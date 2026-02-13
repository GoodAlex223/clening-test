import { test, expect } from '@playwright/test'
import { THEMES } from '../helpers/constants'
import { gotoWithTheme } from '../helpers/theme'

test.describe('Contact Form', () => {
  for (const theme of THEMES) {
    test(`${theme}: contact form renders with all required fields`, async ({ page }) => {
      await gotoWithTheme(page, theme, '/contact')

      // Core form fields
      await expect(page.locator('input[name="name"]')).toBeVisible()
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('textarea[name="message"]')).toBeVisible()

      // Submit button
      const submitButton = page.locator('button[type="submit"], input[type="submit"]')
      await expect(submitButton).toBeVisible()
    })
  }

  test('shows validation error on empty name blur', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/contact')

    const nameInput = page.locator('input[name="name"]')
    await nameInput.focus()
    await nameInput.blur()

    // Error message should appear
    const errorMessage = page.locator('text=/at least 2 characters/i')
    await expect(errorMessage).toBeVisible({ timeout: 3000 })
  })

  test('shows validation error on invalid email blur', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/contact')

    const emailInput = page.locator('input[name="email"]')
    await emailInput.fill('not-an-email')
    await emailInput.blur()

    const errorMessage = page.locator('text=/valid email/i')
    await expect(errorMessage).toBeVisible({ timeout: 3000 })
  })

  test('shows validation error on short message blur', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/contact')

    const messageInput = page.locator('textarea[name="message"]')
    await messageInput.fill('Short')
    await messageInput.blur()

    const errorMessage = page.locator('text=/at least 10 characters/i')
    await expect(errorMessage).toBeVisible({ timeout: 3000 })
  })

  test('clears error when valid input is provided', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/contact')

    // Trigger error
    const nameInput = page.locator('input[name="name"]')
    await nameInput.focus()
    await nameInput.blur()

    const errorMessage = page.locator('text=/at least 2 characters/i')
    await expect(errorMessage).toBeVisible({ timeout: 3000 })

    // Fix the input
    await nameInput.fill('John Doe')
    await nameInput.blur()

    // Error should disappear
    await expect(errorMessage).toBeHidden({ timeout: 3000 })
  })

  test('prevents form submission with invalid data', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/contact')

    // Bypass browser native validation so custom JS handler fires
    await page.evaluate(() => {
      document.querySelector('form')?.setAttribute('novalidate', '')
    })

    // Submit empty form
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    // Should stay on the contact page (no navigation away)
    expect(page.url()).toContain('/contact')

    // Error messages should appear (custom JS validation)
    await expect(page.locator('text=/at least 2 characters/i')).toBeVisible({ timeout: 3000 })
    await expect(page.locator('text=/valid email/i')).toBeVisible({ timeout: 3000 })
  })

  test('service dropdown is populated with services', async ({ page }) => {
    await gotoWithTheme(page, 'minimal', '/contact')

    const serviceSelect = page.locator('select[name="service"]')
    // Service dropdown might not exist in all themes (some use radio buttons or similar)
    const selectExists = await serviceSelect.count()
    if (selectExists > 0) {
      const options = serviceSelect.locator('option')
      const count = await options.count()
      // Should have at least a default option + some services
      expect(count).toBeGreaterThan(1)
    }
  })
})
