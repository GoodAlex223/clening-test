import type { Page } from '@playwright/test'

/**
 * Click a navigation link by its visible text label.
 * Waits for navigation to complete.
 */
export async function clickNavLink(page: Page, linkText: string): Promise<void> {
  await page.getByRole('link', { name: linkText, exact: true }).first().click()
  await page.waitForLoadState('domcontentloaded')
}

/**
 * Open the mobile menu by clicking the hamburger button.
 */
export async function openMobileMenu(page: Page): Promise<void> {
  const burger = page.locator('[aria-label="Open menu"]')
  await burger.click()
  // Wait for mobile menu to become visible
  await page.locator('[aria-label="Mobile navigation"]').waitFor({ state: 'visible', timeout: 3000 })
}

/**
 * Close the mobile menu by pressing Escape.
 */
export async function closeMobileMenuWithEscape(page: Page): Promise<void> {
  await page.keyboard.press('Escape')
  // Wait for menu to hide
  await page.locator('[aria-label="Mobile navigation"]').waitFor({ state: 'hidden', timeout: 3000 })
}
