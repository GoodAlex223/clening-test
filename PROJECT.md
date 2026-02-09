# PROJECT.md

Project-specific configuration. Universal rules are in [CLAUDE.md](CLAUDE.md).

**Last Updated**: 2026-02-09

---

## Project Overview

**CleanSpark** — A cleaning business MVP website built as a developer portfolio piece. Features 5 radically different design themes (layout, UX, animations, typography) with a real-time theme switcher. Demonstrates frontend architecture skills, multi-theme systems, responsive design, and modern web development patterns.

**Purpose**: Dual-purpose — functional cleaning business website AND developer skills showcase.

### Tech Stack

| Component | Technology |
|-----------|------------|
| Language | TypeScript 5.x |
| Framework | Astro 5.x |
| Styling | Tailwind CSS 4.x |
| Animations | CSS animations + View Transitions API |
| Icons | Lucide Icons (via astro-icon) |
| Deployment | Vercel (static) |
| Package Manager | pnpm |
| Linting | ESLint + Prettier |
| Testing | Playwright (E2E) + Vitest (unit) |

### Why Astro

- **Not in portfolio yet** — complements existing Next.js, Django, vanilla JS projects
- **Purpose-built** for content/marketing sites — perfect match for cleaning business
- **Islands architecture** — demonstrates understanding of modern performance patterns
- **Multi-framework capable** — can embed React/Svelte components inside Astro pages
- **Static-first** — 40% faster loads, 90% less JS than React frameworks
- **Built-in View Transitions** — smooth page transitions without JS frameworks

---

## Project Structure

| Component | Location | Purpose |
|-----------|----------|---------|
| Entry Point | `src/pages/` | Astro pages (file-based routing) |
| Layouts | `src/layouts/` | 5 theme layout systems |
| Components | `src/components/` | Shared + theme-specific components |
| Themes | `src/themes/` | Theme configuration, tokens, styles |
| Content | `src/content/` | Content Collections (services, testimonials, etc.) |
| Assets | `src/assets/` | Images, fonts, icons |
| Styles | `src/styles/` | Global styles, Tailwind config |
| Public | `public/` | Static assets (favicon, robots.txt) |
| Tests | `tests/` | E2E and unit tests |
| Config | `astro.config.mjs` | Astro configuration |

---

## Pages (6)

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, services overview, testimonials, CTA, trust indicators |
| Services | `/services` | Detailed service cards, process steps, what's included |
| About | `/about` | Company story, team, certifications, values |
| Pricing | `/pricing` | Pricing tiers, comparison, quote form |
| Gallery | `/gallery` | Before/after photos, filterable by service type |
| Contact | `/contact` | Contact form, map, service areas, booking |

---

## 5 Design Themes

| # | Theme Name | Visual Identity | Key Characteristics |
|---|------------|-----------------|---------------------|
| 1 | **Minimal Zen** | Warm neutrals, Cloud Dancer white | Whitespace-heavy, subtle micro-interactions, oversized clean sans-serif, Apple-like simplicity |
| 2 | **Bold Spark** | Neo-mint + electric orange | Parallax scrolling, large expressive type, diagonal sections, dopamine design, dynamic motion |
| 3 | **Trust Shield** | Professional navy + slate grey | Traditional grid, trust badges, formal serif headings, structured sections, corporate tone |
| 4 | **Bubbly Clean** | Soft pastels + rounded shapes | Custom illustrations, handwritten accents, bouncy CSS animations, friendly casual tone |
| 5 | **Noir Luxe** | Dark charcoal + champagne gold | Elegant serif typography, sophisticated fade-ins, grain texture overlay, premium high-end feel |

Each theme is a **complete layout system** — different component structures, animations, typography, color schemes, and UX patterns. Not just CSS variable swaps.

---

## Commands

### Development

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Linting
pnpm lint

# Type checking
pnpm astro check

# Format code
pnpm format

# All pre-commit hooks
pre-commit run --all-files
```

### Testing

```bash
# Run E2E tests
pnpm test:e2e

# Run unit tests
pnpm test:unit

# Run all tests
pnpm test
```

---

## Critical Systems (Tier Classification)

| Tier | Description | Examples | Modification Rules |
|------|-------------|----------|-------------------|
| 1 | Critical | Theme switching engine, routing | Requires explicit user approval |
| 2 | Important | Layout systems, content collections | Requires plan review |
| 3 | Standard | Individual components, pages | Standard workflow |
| 4 | Low-risk | Documentation, static content, tests | Proceed with normal care |

---

## Project-Specific Conventions

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `HeroSection.astro` |
| Theme components | `{Theme}{Component}` | `MinimalHero.astro`, `BoldHero.astro` |
| Layouts | `{Theme}Layout.astro` | `MinimalLayout.astro` |
| CSS classes | Tailwind utilities + BEM for custom | `theme-minimal__hero` |
| Pages | kebab-case | `services.astro` |
| Content files | kebab-case | `deep-cleaning.md` |
| Theme tokens | camelCase in config | `primaryColor`, `headingFont` |

### Code Patterns

- **Theme isolation**: Each theme's components live in `src/components/{theme}/`
- **Content separation**: Business content in Content Collections, design in components
- **Progressive enhancement**: Core content works without JS, interactivity added via islands
- **Mobile-first**: All styles written mobile-first with Tailwind breakpoints

### Error Handling

- Graceful fallback to "Minimal Zen" theme if selected theme fails to load
- 404 page styled per active theme
- Contact form shows inline validation errors
- Image loading with blur-up placeholders

---

## External Dependencies

### APIs

| Service | Purpose | Docs Location |
|---------|---------|---------------|
| None (MVP) | Static site, no backend APIs | — |

### Configuration

| Variable | Purpose | Location |
|----------|---------|----------|
| `PUBLIC_SITE_URL` | Base URL for SEO | `.env` |
| `PUBLIC_DEFAULT_THEME` | Default theme name | `.env` |

---

## Language Standards

| Language | Policy |
|----------|--------|
| TypeScript | `.claude/LANGUAGES/typescript.md` |

---

*For universal Claude Code rules, see [CLAUDE.md](CLAUDE.md).*
*For documentation index, see [docs/README.md](docs/README.md).*
