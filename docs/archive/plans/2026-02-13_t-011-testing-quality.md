# T-011: Testing & Quality

**Status**: Complete
**Created**: 2026-02-13
**Branch**: `feature/t-011-testing-quality`

---

## 1. Objective

Implement comprehensive testing infrastructure for CleanSpark: Playwright E2E tests (6 pages x 5 themes = 30 test cases), theme switching roundtrip tests, mobile viewport tests, Vitest unit tests (theme store, theme configs, CSS vars, contact validation), accessibility audit (axe-core), and cross-browser testing (Chrome, Firefox, WebKit).

## 2. Approach

**Chosen**: Approach B — Clean/Nested architecture with `features/` + `pages/` subdirectories.

```
tests/
  unit/                          # Vitest unit tests
    theme-store.test.ts
    theme-configs.test.ts
    theme-css-vars.test.ts
    contact-validation.test.ts
  e2e/
    helpers/                     # Shared helpers
      constants.ts
      theme.ts
      accessibility.ts
      navigation.ts
    features/                    # Feature-focused E2E
      theme-switching.spec.ts
      navigation.spec.ts
      gallery-filter.spec.ts
      contact-form.spec.ts
    pages/                       # Page x theme matrix
      home.spec.ts
      services.spec.ts
      about.spec.ts
      pricing.spec.ts
      gallery.spec.ts
      contact.spec.ts
```

## 3. Key Discoveries

### Production Bug Found: ThemeSwitcher Event Bubbling
- **Issue**: `document.querySelectorAll('[data-theme]')` in ThemeSwitcher.astro matched both theme buttons AND layout wrapper `<div data-theme={themeId}>`, causing event bubbling where the wrapper's handler reset the cookie after the button's handler set it.
- **Fix**: Changed selector to `.theme-switcher button[data-theme]` (scoped to buttons only).
- **Impact**: This was a real production bug — theme switching was broken for all themes.

### ClientRouter (View Transitions) Affects Navigation Testing
- Astro's `<ClientRouter />` (formerly ViewTransitions) intercepts link clicks and uses History API for SPA-mode navigation.
- Playwright's `page.waitForLoadState('networkidle')` doesn't detect SPA navigation.
- **Fix**: Use `page.waitForURL(regex, { timeout: 10000 })` for all navigation waits.

### CSS Custom Properties Applied to Wrapper, Not HTML
- Theme CSS vars are set on `<div data-theme>` wrapper, not on `<html>`.
- `getAppliedPrimaryColor` helper needed to query `[data-theme]` element.

### Browser Native Validation Blocks Custom JS Validation
- Form fields with `required` attribute trigger browser native validation before `submit` event fires.
- Test for custom JS validation must set `novalidate` on form first.

## 4. Implementation Summary

### Unit Tests (Vitest) — 78 tests
| File | Tests | Coverage |
|------|-------|----------|
| theme-store.test.ts | 34 | Cookie parsing, writing, edge cases |
| theme-configs.test.ts | 18 | Theme registry, config structure |
| theme-css-vars.test.ts | 8 | CSS var generation |
| contact-validation.test.ts | 18 | Field & form validation |

### E2E Tests (Playwright) — 218 per browser
| File | Tests | Scope |
|------|-------|-------|
| theme-switching.spec.ts | 10 | Theme buttons, cookies, CSS props, persistence |
| navigation.spec.ts | 17 | Desktop nav, mobile nav, burger, logo |
| gallery-filter.spec.ts | 8 | Filter buttons, aria-pressed, visibility |
| contact-form.spec.ts | 11 | Form fields, validation, submission |
| home.spec.ts | 30 | Hero, services, testimonials, a11y (5 themes) |
| services.spec.ts | 30 | Cards, categories, a11y (5 themes) |
| about.spec.ts | 30 | Team, company info, a11y (5 themes) |
| pricing.spec.ts | 30 | Tiers, CTA, a11y (5 themes) |
| gallery.spec.ts | 25 | Grid, filters, a11y (5 themes) |
| contact.spec.ts | 25 | Form, info, a11y (5 themes) |

### Cross-Browser Results
| Browser | Passed | Failed | Skipped |
|---------|--------|--------|---------|
| Desktop Chrome | 210 | 0 | 8 |
| Mobile Chrome | 194 | 0 | 16 |
| Firefox | 195 | 0 | 8 |
| WebKit | 207 | 0 | 8 |
| **Total E2E** | **806** | **0** | **40** |
| **Unit Tests** | **78** | **0** | **0** |

## 5. Future Improvements

1. **Extract timeout constants** — Hardcoded timeout values (3000ms, 10000ms) scattered across tests should be centralized in constants.ts for environment-specific tuning.
2. **Shared page test factory** — The 6 page spec files have near-identical structure (page identifier, title, a11y audit per theme). A factory function could eliminate ~200 lines of boilerplate.
3. **Better error messages in helpers** — Helper functions lack contextual error handling; unclear failures in CI.
4. **Visual regression testing** — Add Playwright screenshot comparison tests to catch visual regressions across themes.

## 6. Files Changed

### New Files (tests)
- `tests/unit/theme-store.test.ts`
- `tests/unit/theme-configs.test.ts`
- `tests/unit/theme-css-vars.test.ts`
- `tests/unit/contact-validation.test.ts`
- `tests/e2e/helpers/constants.ts`
- `tests/e2e/helpers/theme.ts`
- `tests/e2e/helpers/accessibility.ts`
- `tests/e2e/helpers/navigation.ts`
- `tests/e2e/features/theme-switching.spec.ts`
- `tests/e2e/features/navigation.spec.ts`
- `tests/e2e/features/gallery-filter.spec.ts`
- `tests/e2e/features/contact-form.spec.ts`
- `tests/e2e/pages/home.spec.ts`
- `tests/e2e/pages/services.spec.ts`
- `tests/e2e/pages/about.spec.ts`
- `tests/e2e/pages/pricing.spec.ts`
- `tests/e2e/pages/gallery.spec.ts`
- `tests/e2e/pages/contact.spec.ts`

### Modified Files
- `src/components/shared/ThemeSwitcher.astro` — Fixed event bubbling bug
- `package.json` — Added test scripts and dependencies
- `vitest.config.ts` — Updated config for unit tests
- `playwright.config.ts` — 4 browser projects, webServer config

---

### Execution Log

#### 2026-02-13 — PHASE: Planning
- Analyzed T-011 scope from TODO.md
- Explored codebase: 5 themes, 6 pages, theme engine, interactive features
- Chose Approach B (Clean/Nested) architecture

#### 2026-02-13 — PHASE: Implementation
- Installed deps: @axe-core/playwright, vitest, @playwright/test
- Created test helpers (constants, theme, a11y, navigation)
- Wrote 78 unit tests (4 files), all passing
- Wrote E2E feature tests (4 files)
- Wrote E2E page tests (6 files)

#### 2026-02-13 — PHASE: Debugging (42 → 12 → 2 → 0 failures)
- First run: 42 failures (initial issues with selectors and server state)
- Fixed selectors, reduced to 12 failures
- Discovered ThemeSwitcher event bubbling bug — fixed in production code
- Discovered ClientRouter affecting navigation tests — updated waitFor strategy
- Discovered CSS vars on wrapper not html — fixed helper
- Discovered browser native validation blocking custom validation — fixed test
- Replaced `waitForTimeout()` anti-pattern with deterministic wait

#### 2026-02-13 — PHASE: Complete
- All 4 browsers: 0 failures
- Total: 884 E2E tests + 78 unit tests = 962 tests passing
