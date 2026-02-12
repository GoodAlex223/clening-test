# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- AUTO-MANAGED: project-description -->

## Overview

**CleanSpark** — A multi-theme cleaning business MVP website built as a developer portfolio piece. Features 5 radically different design themes with real-time switching. Built with Astro 5.x + TypeScript + Tailwind CSS 4.x.

**Tech stack**: Astro, TypeScript (strict), Tailwind CSS, pnpm, Vitest, Playwright
**Purpose**: Portfolio showcase demonstrating frontend architecture, multi-theme systems, and production-quality code.

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

- **Multi-theme system**: 5 complete layout systems (3 implemented: Minimal Zen, Bold Spark, Trust Shield; 2 planned: Bubbly Clean, Noir Luxe) — full layout swap via layout resolver, not CSS-only theming
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
- **File structure**: `src/components/{theme}/`, `src/components/{theme}/pages/`, `src/layouts/{theme}/`, `src/themes/`, `src/content/`, `src/lib/`
- **Theme implementations**:
  - **Minimal Zen** (complete): Soft pastels, sans-serif (Inter), rounded corners, clean spacing
  - **Bold Spark** (complete): Vibrant orange/yellow, sans-serif (Poppins), 3px borders, offset shadows, clip-paths
  - **Trust Shield** (complete): Navy/slate grey, serif (Merriweather), 1px borders, trust badges, corporate professional
  - **Bubbly Clean** (planned): Pink/teal, rounded fonts, bubble shapes, playful animations
  - **Noir Luxe** (planned): Black/gold, elegant serif, minimalist luxury

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
- **Scoped component class prefixes**: Theme-specific prefixes prevent style leaking (`.mn`/`.mf` for Minimal, `.bn`/`.bf` for Bold, `.tn`/`.tf` for Trust)
- **CSS-only illustrations**: Complex decorative elements built entirely with CSS (Trust shield: gradients, absolute positioning, border-radius, dashed borders) — demonstrates CSS art skills without external dependencies
- **Trust credentials pattern**: Footer trust strip with certifications/badges unique to Trust theme; reinforces corporate reliability (could be reused in other professional themes)
- **Inline SVG icons**: All themes use inline SVG for icons (shields, checkmarks, stars, user icons) for performance and customization via `currentColor`
- **Service category grouping**: Services organized by type (residential/commercial/specialty) in Trust theme; improves scanability for corporate audiences

<!-- END AUTO-MANAGED -->

<!-- MANUAL -->

## Custom Notes

- **MCP setup**: Copy `.mcp.json.example` to `.mcp.json` and set `MEMORY_FILE_PATH` to your local memory file path. Configured servers: memory, context7, playwright.
- **Detailed docs**: See [PROJECT.md](PROJECT.md) for full tech stack, [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design, [docs/planning/TODO.md](docs/planning/TODO.md) for task list.
- **Theme design specs**: See [docs/planning/plans/2026-02-09_theme-designs.md](docs/planning/plans/2026-02-09_theme-designs.md) for detailed color, typography, and layout specifications per theme.

<!-- END MANUAL -->
