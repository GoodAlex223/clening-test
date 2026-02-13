import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

/**
 * Known accessibility rule exclusions.
 * color-contrast: Requires design-level color changes — tracked in BACKLOG.
 */
const EXCLUDED_RULES = ['color-contrast']

/**
 * Run axe-core accessibility scan against the current page.
 * Asserts zero WCAG 2.1 AA violations (excluding known design-level issues).
 */
export async function scanAccessibility(page: Page, label: string): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules(EXCLUDED_RULES)
    .analyze()

  expect(results.violations, `${label}: accessibility violations found`).toEqual([])
}
