# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- AUTO-MANAGED: project-description -->

## Overview

**CleanSpark** — A multi-theme cleaning business MVP website built as a developer portfolio piece. Features 5 radically different design themes with real-time switching. Built with Astro 5.x + TypeScript + Tailwind CSS 4.x.

**Live Demo**: [cleanspark-virid.vercel.app](https://cleanspark-virid.vercel.app)
**Tech stack**: Astro SSR (Vercel), TypeScript (strict), Tailwind CSS, pnpm, Vitest, Playwright
**Purpose**: Portfolio showcase demonstrating frontend architecture, multi-theme systems, production-quality code, and SSR deployment
**Performance**: Perfect Lighthouse scores (100/100/100/100 mobile and desktop)
**Testing**: Vitest unit tests + Playwright E2E across 4 browsers (Chrome, Firefox, WebKit, Mobile Chrome)

<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: build-commands -->

## Build & Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm astro check      # TypeScript checking
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm test:unit        # Vitest unit tests
pnpm test:e2e         # Playwright E2E tests
pnpm test             # All tests
```

<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: architecture -->

## Architecture

- **Multi-theme system**: 5 complete layout systems (all implemented: Minimal Zen, Bold Spark, Trust Shield, Bubbly Clean, Noir Luxe) — full layout swap via layout resolver, not CSS-only theming
- **Deployment**: Vercel serverless with `@astrojs/vercel` adapter, SSR mode (`output: 'server'`), production URL: https://cleanspark-virid.vercel.app
- **Content Collections**: Astro Content Collections with Zod schemas for services, testimonials, team, gallery, pricing
- **Theme Engine**:
  - Theme configs in `src/themes/{theme}.ts` (colors, fonts, spacing) exported via `src/themes/index.ts`
  - Middleware reads `cleanspark_theme` cookie, stores ThemeId in `Astro.locals.theme`
  - `theme-resolver.ts` maps ThemeId to layout components (static import map)
  - `page-resolver.ts` maps (ThemeId, PageName) to page content components (static import map)
  - `theme-css-vars.ts` converts ThemeConfig to inline CSS custom properties
  - `theme-store.ts` handles cookie parsing, writing, and validation
  - ThemeSwitcher component updates cookie and reloads page (no FOUC)
- **Islands Architecture**: Static HTML by default, `client:load` only for ThemeSwitcher, contact form, gallery filter, mobile nav
- **Pages**: 6 routes — Home, Services, About, Pricing, Gallery, Contact
- **File structure**: `src/components/{theme}/`, `src/components/{theme}/pages/`, `src/layouts/{theme}/`, `src/themes/`, `src/data/`, `src/lib/`, `public/images/og/`, `public/images/screenshots/`
- **SEO & Social Sharing**: Theme-aware Open Graph images (1200×630 PNG) via `getOgImageUrl()` in SEO component; static images at `public/images/og/{theme}-og.png`; automated generation via `scripts/capture-screenshots.mjs`
- **Testing Infrastructure**:
  - **Unit tests** (Vitest): theme-store, theme-configs, theme-css-vars, contact-validation
  - **E2E tests** (Playwright): cross-browser across Chrome, Firefox, WebKit, Mobile Chrome
  - **Test structure**: `tests/unit/`, `tests/e2e/helpers/`, `tests/e2e/features/`, `tests/e2e/pages/`
  - **Accessibility**: axe-core integration scans all theme/page combinations (WCAG 2.1 AA)
  - **Cross-browser**: Automated testing across desktop Chrome, Firefox, WebKit, and mobile Chrome
  - **Quality metrics**: Perfect Lighthouse scores (100/100/100/100), WCAG 2.1 AA compliance, 0.3s FCP desktop, 1.1s FCP mobile
- **Theme implementations**:
  - **Minimal Zen** (complete): Soft pastels, sans-serif (Inter), rounded corners, clean spacing
  - **Bold Spark** (complete): Vibrant orange/yellow, sans-serif (Poppins), 3px borders, offset shadows, clip-paths
  - **Trust Shield** (complete): Navy/slate grey, serif (Merriweather), 1px borders, trust badges, corporate professional
  - **Bubbly Clean** (complete): Cream/purple/cyan pastels, Fredoka One/Nunito/Caveat fonts, floating bubble decorations, wave SVG dividers, bouncy CSS keyframe animations, pill-shaped nav links, gradient footer, WCAG AA proactive contrast verification
  - **Noir Luxe** (complete): Black/gold/tan palette, Playfair Display/Lato fonts, minimalist luxury, premium aesthetic with subtle animations, elegant serif headers

<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->

## Code Conventions

- Components: PascalCase `.astro` files, theme-prefixed (`MinimalHero.astro`, `MinimalNav.astro`)
- Page components: `{Theme}{Page}.astro` in `src/components/{theme}/pages/` (e.g., `MinimalContact.astro`)
- Layouts: `{Theme}Layout.astro` per theme, inject CSS vars via `buildThemeCssVars()`
- Content: kebab-case `.md` or `.json` in Content Collections
- TypeScript: Strict mode, no `any`, prefer `interface` over `type`
- Styling: Tailwind utilities (mobile-first), avoid `@apply` except theme base styles; scoped `<style>` blocks for component-specific styles
- Theme IDs: lowercase single word (`minimal`, `bold`, `trust`, `bubbly`, `noir`)
- env.d.ts augmentation: Use inline `import()` syntax to preserve global scope
- Theme tokens: Defined in `src/themes/{theme}.ts`, consumed via CSS custom properties
- OG images: Named `{theme}-og.png` (1200×630 PNG), stored in `public/images/og/`
- **Testing conventions**:
  - Test files: `{module}.test.ts` for unit, `{feature}.spec.ts` for E2E
  - Helpers: Reusable functions in `tests/e2e/helpers/` (theme, navigation, accessibility, constants)
  - Test organization: `features/` for cross-cutting functionality, `pages/` for page-specific tests
  - Test data: Constants exported from `tests/e2e/helpers/constants.ts` (themes, pages, nav links)
  - Accessibility: Use `scanAccessibility(page, label)` helper with axe-core

<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->

## Detected Patterns

- **Theme isolation**: Each theme's components and layouts are fully independent; page components organized in `src/components/{theme}/pages/`
- **Content-design separation**: Structured business content (services, pricing, team, testimonials, gallery) stored in Content Collections; some page-specific content (about page story/values, pricing FAQ) currently inline
- **Progressive enhancement**: Core content works without JS; JS enhances UX (mobile nav, gallery filter, contact form validation, stats counters)
- **Cookie-based state**: Theme persisted in cookie for server-side reading (no FOUC)
- **Type-safe theme system**: ThemeId union type guards invalid themes, ThemeConfig interface ensures consistency across all 5 themes
- **CSS custom properties**: Theme tokens (colors, fonts, spacing) injected as CSS vars in `<html>` style attribute for consistent access
- **Static resolver pattern**: Both layout and page content components mapped at build time via satisfies operator, no runtime lookups; `resolvePageContent<P extends PageName>()` uses generic narrowing for type-safe props per page
- **Accessibility-first**: ARIA labels, semantic HTML, keyboard navigation (mobile menu Escape key, tabindex management), focus management
- **Scroll-reveal animations**: IntersectionObserver-based `.reveal` / `.revealed` pattern in `<style is:global>` for cross-component animation consistency; `.reveal-stagger` for grid children animations using descendant selectors
- **Stats counter animations**: IntersectionObserver-triggered number counting with `data-counter`, `data-target`, `data-suffix` attributes; eased animation via `requestAnimationFrame` for performance; used in Trust and Bold themes
- **Decorative SVG animations**: Theme-specific hero decorations (Trust shield, Bold spark) with CSS keyframe animations and pseudo-elements for visual depth
- **Native accordion pattern**: FAQ sections use native `<details>`/`<summary>` elements with custom styling; progressive enhancement without JS dependencies (Trust theme)
- **JS-controlled visibility via inline styles**: Astro scoped styles conflict with dynamically-toggled classes in `<script>` blocks; inline styles via JS provide reliable visibility control for mobile menu overlays
- **Thin page routes pattern**: Page route files (`src/pages/*.astro`) are data-fetching shells that call `resolvePageContent()` to delegate presentation to theme-specific page components
- **Scoped component class prefixes**: Theme-specific prefixes prevent style leaking (`.mn`/`.mf` for Minimal, `.bn`/`.bf` for Bold, `.tn`/`.tf` for Trust, `.bbn`/`.bbf` for Bubbly, `.nn`/`.nf` for Noir)
- **CSS-only illustrations**: Complex decorative elements built entirely with CSS (Trust shield: gradients, absolute positioning, border-radius, dashed borders) — demonstrates CSS art skills without external dependencies
- **Trust credentials pattern**: Footer trust strip with certifications/badges unique to Trust theme; reinforces corporate reliability (could be reused in other professional themes)
- **Inline SVG icons**: All themes use inline SVG for icons (shields, checkmarks, stars, user icons) for performance and customization via `currentColor`
- **Service category grouping**: Services organized by type (residential/commercial/specialty) in Trust theme; improves scanability for corporate audiences
- **Floating bubble decorations**: Bubbly theme uses CSS-only floating bubbles with keyframe animations (`@keyframes float`, staggered delays); multiple bubble sizes and speeds create depth without JS overhead
- **Wave SVG dividers**: Reusable wave path pattern (`<svg><path d="M0,40 Q200,10..."/></svg>`) separates sections in Bubbly theme; fills with CSS custom properties for color flexibility
- **Handwritten font accents**: Bubbly theme uses Caveat font for annotations and accent text to create playful, approachable feel; limited to non-critical text to maintain readability
- **Pill-shaped UI elements**: Bubbly theme uses extreme border-radius (`2rem+`) for buttons, nav links, cards, badges, and filter pills to reinforce rounded visual language
- **WCAG AA proactive verification**: Bubbly theme color selection proactively verified against WCAG AA 4.5:1 contrast ratio; cyan (#06B6D4) and accent pink (#F472B6) replaced with higher-contrast alternatives (#7C3AED, #D946B2) before implementation
- **Bouncy CSS animations**: Bubbly theme uses `cubic-bezier(0.68, -0.55, 0.265, 1.55)` for elastic bounce effect on hero title, buttons, and hover states; creates playful interaction without JS
- **Test helper pattern**: Reusable test helpers encapsulate common operations (`gotoWithTheme()`, `clickThemeButton()`, `scanAccessibility()`, `openMobileMenu()`); DRY test code across 218 E2E tests
- **Cookie-first theme testing**: `setThemeCookie()` helper sets theme cookie before navigation to avoid FOUC in tests; uses `context.addCookies()` for first-request cookie delivery
- **ClientRouter navigation handling**: Astro's `<ClientRouter />` intercepts link clicks for SPA-mode navigation; tests use `page.waitForURL(regex)` instead of `waitForLoadState('networkidle')` for deterministic navigation waits
- **Parameterized theme tests**: Use `for (const theme of THEMES)` loops to test all 5 themes with identical assertions; scales test coverage without duplication
- **Accessibility-first testing**: axe-core scans run on all 30 theme/page combinations; WCAG 2.1 AA violations fail tests (excludes design-level color-contrast issues tracked in BACKLOG)
- **Scoped selector pattern**: `.theme-switcher` prefix scopes ThemeSwitcher queries to first instance; prevents conflicts when multiple islands exist (desktop + mobile nav)
- **Cross-browser test architecture**: Playwright config defines 4 browser projects (Desktop Chrome, Mobile Chrome, Firefox, WebKit); single test suite runs against all browsers
- **Production bug discovery via testing**: Theme switching bug found during E2E test development — `querySelectorAll('[data-theme]')` matched both buttons and wrapper div, causing event bubbling; fixed with scoped selector `.theme-switcher button[data-theme]`
- **View Transitions compatibility**: `<ClientRouter />` in BaseLayout enables SPA-mode navigation; interactive islands use `document.addEventListener('astro:page-load', initFunction)` instead of immediate initialization to re-initialize after both initial page load and View Transitions navigation; prevents stale event listeners and ensures components work after client-side navigation
- **Automated screenshot capture**: `scripts/capture-screenshots.mjs` uses Playwright to capture two image sets for all 5 themes: (1) README screenshots (1280×800) → `public/images/screenshots/{theme}-home.png`, (2) OG social images (1200×630) → `public/images/og/{theme}-og.png`; sets theme cookie before navigation to avoid FOUC; supports `BASE_URL` env var for local/production testing; 2s wait for fonts/animations
- **Theme-aware OG images**: SEO component uses `getOgImageUrl(themeId, origin)` from `src/lib/og-image.ts` to resolve theme-specific Open Graph images; falls back to DEFAULT_THEME for invalid themes; supports custom image override via `image` prop
- **Compile-time completeness checking**: Static import maps with `satisfies` operator ensure all themes have registered layouts/pages at build time; adding a theme without updating maps is a compile error, not a runtime error
- **Development timeline**: Built from empty repo to production deployment with perfect Lighthouse scores in 7 days; demonstrates rapid prototyping and production-quality implementation

<!-- END AUTO-MANAGED -->

<!-- MANUAL -->

## Custom Notes

- **MCP setup**: Copy `.mcp.json.example` to `.mcp.json` and set `MEMORY_FILE_PATH` to your local memory file path. Configured servers: memory, context7, playwright.
- **Detailed docs**: See [PROJECT.md](PROJECT.md) for full tech stack, [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design, [docs/CASE_STUDY.md](docs/CASE_STUDY.md) for portfolio case study, [docs/planning/TODO.md](docs/planning/TODO.md) for task list.
- **Theme design specs**: See [docs/planning/plans/2026-02-09_theme-designs.md](docs/planning/plans/2026-02-09_theme-designs.md) for detailed color, typography, and layout specifications per theme.

<!-- END MANUAL -->
