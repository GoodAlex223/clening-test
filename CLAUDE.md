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

- **Multi-theme system**: 5 complete layout systems (Minimal Zen, Bold Spark, Trust Shield, Bubbly Clean, Noir Luxe) — full layout swap, not CSS variable themes
- **Content Collections**: Astro Content Collections with Zod schemas for services, testimonials, team, gallery, pricing
- **Theme Engine**: Cookie-based persistence, resolver maps theme name to layout components, middleware reads theme on request
- **Islands Architecture**: Static HTML by default, `client:load` only for ThemeSwitcher, contact form, gallery filter
- **Pages**: 6 routes — Home, Services, About, Pricing, Gallery, Contact
- **File structure**: `src/components/{theme}/`, `src/layouts/{theme}/`, `src/themes/`, `src/content/`, `src/lib/`

<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: conventions -->

## Code Conventions

- Components: PascalCase `.astro` files, theme-prefixed (`MinimalHero.astro`)
- Layouts: `{Theme}Layout.astro` per theme
- Content: kebab-case `.md` or `.json` in Content Collections
- TypeScript: Strict mode, no `any`, prefer `interface` over `type`
- Styling: Tailwind utilities (mobile-first), avoid `@apply` except theme base styles
- Theme IDs: lowercase single word (`minimal`, `bold`, `trust`, `bubbly`, `noir`)

<!-- END AUTO-MANAGED -->

<!-- AUTO-MANAGED: patterns -->

## Detected Patterns

- **Theme isolation**: Each theme's components and layouts are fully independent
- **Content-design separation**: Business content in Content Collections, never hardcoded in components
- **Progressive enhancement**: Core content works without JS
- **Cookie-based state**: Theme persisted in cookie for server-side reading (no FOUC)

<!-- END AUTO-MANAGED -->

<!-- MANUAL -->

## Custom Notes

- **MCP setup**: Copy `.mcp.json.example` to `.mcp.json` and set `MEMORY_FILE_PATH` to your local memory file path. Configured servers: memory, context7, playwright.
- **Detailed docs**: See [PROJECT.md](PROJECT.md) for full tech stack, [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for system design, [docs/planning/TODO.md](docs/planning/TODO.md) for task list.
- **Theme design specs**: See [docs/planning/plans/2026-02-09_theme-designs.md](docs/planning/plans/2026-02-09_theme-designs.md) for detailed color, typography, and layout specifications per theme.

<!-- END MANUAL -->
