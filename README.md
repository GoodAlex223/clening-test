# CleanSpark

A multi-theme cleaning business website built with Astro 5, TypeScript, and Tailwind CSS 4. Features 5 radically different design themes with real-time switching.

**Live Demo**: [cleanspark-virid.vercel.app](https://cleanspark-virid.vercel.app)

## Highlights

- **5 complete design themes** — not CSS variable swaps, but full layout systems with different component structures, animations, typography, and UX patterns
- **Real-time theme switching** — cookie-based persistence with server-side rendering (no flash of wrong theme)
- **962 automated tests** — 78 unit tests (Vitest) + 218 E2E tests across 4 browsers (Playwright)
- **Accessibility-first** — WCAG 2.1 AA compliance verified with axe-core across all 30 theme/page combinations
- **Islands architecture** — static HTML by default, JavaScript only for interactive components

## Themes

| Theme | Style | Key Characteristics |
|-------|-------|---------------------|
| **Minimal Zen** | Warm neutrals, Inter | Apple-like simplicity, generous whitespace, subtle micro-interactions |
| **Bold Spark** | Orange/yellow, Space Grotesk | Diagonal sections, offset shadows, clip-paths, energetic motion |
| **Trust Shield** | Navy/slate, Merriweather | Corporate professional, trust badges, CSS-only shield illustration |
| **Bubbly Clean** | Pastels, Fredoka One | Floating bubbles, wave dividers, bouncy animations, pill-shaped UI |
| **Noir Luxe** | Black/gold, Playfair Display | Minimalist luxury, film grain overlay, gold diamond hero art |

## Tech Stack

- **Framework**: Astro 5.x (SSR, islands architecture)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4.x (CSS-first config)
- **Testing**: Vitest (unit) + Playwright (E2E, 4 browsers)
- **Deployment**: Vercel (serverless)
- **Package Manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command          | Description              |
| ---------------- | ------------------------ |
| `pnpm dev`       | Start dev server         |
| `pnpm build`     | Type-check and build     |
| `pnpm lint`      | Run ESLint               |
| `pnpm format`    | Format with Prettier     |
| `pnpm test:unit` | Run unit tests           |
| `pnpm test:e2e`  | Run E2E tests            |
| `pnpm test`      | Run all tests            |

## Architecture

Each theme is a **complete layout system** — different component structures, animations, typography, color schemes, and UX patterns. Business content is stored in Astro Content Collections with Zod schemas, fully decoupled from design.

```
Page Request → Middleware (read cookie) → Theme Resolver → Layout + Components → Static HTML + JS Islands
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full system design.

## Documentation

- [PROJECT.md](PROJECT.md) — Project configuration and conventions
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — System design
- [docs/planning/TODO.md](docs/planning/TODO.md) — Active tasks
