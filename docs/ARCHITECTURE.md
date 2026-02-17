# Architecture

System design and technical architecture for CleanSpark.

**Last Updated**: 2026-02-17

---

## Overview

CleanSpark is a **server-rendered, multi-theme cleaning business website** built with Astro's islands architecture and deployed on Vercel serverless. The core architectural challenge is rendering the same business content through 5 radically different design systems, switchable in real-time via a cookie-based theme engine.

### System Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Astro Pages                         │
│  (index, services, about, pricing, gallery, contact)    │
└──────────────────────┬──────────────────────────────────┘
                       │ selects layout based on theme
                       ▼
┌─────────────────────────────────────────────────────────┐
│                   Theme Engine                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ State    │  │ Resolver │  │ Persister│             │
│  │ (cookie/ │──│ (maps    │──│ (saves   │             │
│  │  store)  │  │  to      │  │  choice) │             │
│  └──────────┘  │  layout) │  └──────────┘             │
│                └────┬─────┘                             │
└─────────────────────┼───────────────────────────────────┘
                      │ resolves to 1 of 5
                      ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Minimal │ │ Bold   │ │ Trust  │ │Bubbly  │ │ Noir   │
│  Zen   │ │ Spark  │ │Shield  │ │ Clean  │ │ Luxe   │
│Layout  │ │Layout  │ │Layout  │ │Layout  │ │Layout  │
│        │ │        │ │        │ │        │ │        │
│┌──────┐│ │┌──────┐│ │┌──────┐│ │┌──────┐│ │┌──────┐│
││Comps ││ ││Comps ││ ││Comps ││ ││Comps ││ ││Comps ││
│└──────┘│ │└──────┘│ │└──────┘│ │└──────┘│ │└──────┘│
│┌──────┐│ │┌──────┐│ │┌──────┐│ │┌──────┐│ │┌──────┐│
││Styles││ ││Styles││ ││Styles││ ││Styles││ ││Styles││
│└──────┘│ │└──────┘│ │└──────┘│ │└──────┘│ │└──────┘│
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│               Content Collections (shared)              │
│  services.json │ testimonials.json │ team.json │ ...    │
└─────────────────────────────────────────────────────────┘
```

---

## Layers

### Presentation Layer (Theme System)

**Purpose**: Renders business content through 5 distinct visual identities.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| BaseLayout | HTML shell, ClientRouter, head slot | `src/layouts/BaseLayout.astro` |
| Theme Layouts | Per-theme wrappers with CSS vars, fonts, nav/footer | `src/layouts/{theme}/` |
| Theme Components | Nav, Footer per theme | `src/components/{theme}/` |
| Page Components | Theme-specific page content | `src/components/{theme}/pages/` |
| Shared Components | ThemeSwitcher, SEO, BeforeAfterSlider | `src/components/shared/` |
| Theme Config | Design tokens (colors, fonts, spacing) per theme | `src/themes/` |

**Key Interfaces**:

- Every theme layout wraps BaseLayout and injects CSS vars via `buildThemeCssVars()`
- Every page component receives content data via Astro props (not fetched internally)
- ThemeSwitcher, contact forms, gallery filters, and mobile navs are interactive islands (`client:load`)
- `resolveLayout()` and `resolvePageContent()` map theme IDs to components at compile time

### Content Layer (Data)

**Purpose**: Stores all business content as structured data, decoupled from design.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| Services Collection | 7 service definitions (Markdown, glob loader) | `src/data/services/` |
| Testimonials Collection | 10 customer reviews (JSON, file loader) | `src/data/testimonials.json` |
| Team Collection | 5 team member profiles (JSON, file loader) | `src/data/team.json` |
| Gallery Collection | 8 before/after photo sets (JSON, file loader) | `src/data/gallery.json` |
| Pricing Collection | 3 pricing tiers (JSON, file loader) | `src/data/pricing.json` |
| Site Config | Company info, contact, areas served (TypeScript) | `src/lib/site-config.ts` |

**Key Interfaces**:

- All content uses Astro 5 Content Layer API with Zod schemas (defined in `src/content.config.ts`)
- Content is type-safe at build time
- Services use Markdown (glob loader) for rich text; others use JSON (file loader)

### Theme Engine Layer (State Management)

**Purpose**: Manages theme selection, persistence, and resolution.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| ThemeStore | Cookie parsing, writing, validation | `src/lib/theme-store.ts` |
| ThemeResolver | Maps ThemeId to layout component (static import map) | `src/lib/theme-resolver.ts` |
| PageResolver | Maps (ThemeId, PageName) to page content component | `src/lib/page-resolver.ts` |
| ThemeCssVars | Converts ThemeConfig to inline CSS custom properties | `src/lib/theme-css-vars.ts` |
| ThemeSwitcher | Interactive UI for changing themes (cookie + reload) | `src/components/shared/ThemeSwitcher.astro` |
| ThemeConfig | Design tokens per theme | `src/themes/{theme}.ts` |
| Theme Registry | Validation, constants, getThemeConfig | `src/themes/index.ts` |

### Routing Layer (Pages)

**Purpose**: File-based routing, thin data-fetching shells that delegate rendering to theme system.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| Page routes | Data fetching + delegation to resolvers | `src/pages/` |
| Middleware | Read theme cookie into `Astro.locals.theme` | `src/middleware.ts` |

### Utilities Layer

**Purpose**: Shared interactive behavior and validation.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| Contact Validation | Zod schema with field-level + form validation | `src/lib/contact-validation.ts` |
| Gallery Filter | Data-attribute based category filtering | `src/lib/gallery-filter.ts` |
| Scroll Spy | requestAnimationFrame-throttled nav highlighting | `src/lib/scroll-spy.ts` |
| OG Image | Theme-aware Open Graph image URL resolution | `src/lib/og-image.ts` |

---

## Data Flow

### Page Request Flow

```
1. User requests /services
   └─▶ 2. Astro router matches src/pages/services.astro
       └─▶ 3. Middleware reads theme cookie (default: "minimal")
           └─▶ 4. Page fetches content from Content Collections
               └─▶ 5. Page passes content + theme to ThemeResolver
                   └─▶ 6. ThemeResolver returns correct Layout component
                       └─▶ 7. Layout renders theme-specific components with content
                           └─▶ 8. Static HTML delivered (with JS islands for interactivity)
```

### Theme Switch Flow

```
1. User clicks theme button in ThemeSwitcher (interactive island)
   └─▶ 2. JavaScript updates cleanspark_theme cookie
       └─▶ 3. Full page reload (bypasses ClientRouter)
           └─▶ 4. New request picks up updated cookie via middleware
               └─▶ 5. Different layout + component tree renders
```

---

## Data Model

### Content Entities

| Entity      | Description               | Key Fields                                          |
| ----------- | ------------------------- | --------------------------------------------------- |
| Service     | Cleaning service offering | name, slug, description, icon, features[], category |
| Testimonial | Customer review           | name, text, rating, photo, service, date            |
| TeamMember  | Staff profile             | name, role, photo, bio                              |
| GalleryItem | Before/after photo set    | before, after, service, description                 |
| PricingTier | Pricing plan              | name, price, frequency, features[], highlighted     |
| SiteConfig  | Company information       | name, phone, email, address, areas[], hours         |

### Theme Configuration Shape

```typescript
type ThemeId = 'minimal' | 'bold' | 'trust' | 'bubbly' | 'noir'

interface ThemeConfig {
  id: ThemeId
  displayName: string    // "Minimal Zen"
  description: string
  colors: {
    background: string
    surface: string
    text: string
    textMuted: string
    primary: string
    secondary: string
    accent: string
    cta: string
    ctaText: string
  }
  fonts: {
    heading: string      // CSS font-family for headings
    body: string         // CSS font-family for body text
    accent?: string      // Optional decorative font
  }
  spacing: {
    borderRadius: { sm: string; md: string; lg: string; full: string }
    sectionPadding: string
    containerMax: string
  }
}
```

---

## External Dependencies

### Libraries

| Library            | Purpose                             |
| ------------------ | ----------------------------------- |
| astro 5.x          | Core framework (SSR)                |
| @astrojs/vercel    | Vercel serverless adapter           |
| @astrojs/check     | TypeScript checking                 |
| @tailwindcss/vite  | Tailwind CSS 4.x (CSS-first config) |
| @fontsource/*      | Self-hosted fonts (10 font packages) |
| zod                | Content schema validation            |
| playwright         | E2E testing (4 browsers)            |
| vitest             | Unit testing                        |

---

## Configuration

### Environment Variables

| Variable          | Purpose                              | Required |
| ----------------- | ------------------------------------ | -------- |
| `PUBLIC_SITE_URL` | Base URL for canonical tags, sitemap | Yes      |

### Configuration Files

| File                 | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `astro.config.mjs`   | Astro config (SSR, Vercel adapter, Vite) |
| `tsconfig.json`      | TypeScript strict config with path aliases |
| `eslint.config.js`   | ESLint v9 flat config                    |
| `.prettierrc`        | Code formatting rules                    |
| `vitest.config.ts`   | Vitest unit test config                  |
| `playwright.config.ts` | Playwright E2E config (4 browsers)     |

---

## Key Architecture Decisions

### 1. Full Layout Swap (not CSS-only themes)

Each theme has its **own layout component tree**, not just different CSS variables. This is because the 5 designs differ in:

- Section ordering and structure
- Animation patterns
- Component composition
- Navigation style (hamburger vs sidebar vs horizontal)
- Grid systems and spacing philosophy

### 2. Content Collections for Business Data

All cleaning business content (services, prices, testimonials) lives in **Astro Content Collections**, completely decoupled from visual design. This means:

- Content changes don't require touching any theme code
- Type-safe content access with Zod schemas
- Easy to add/remove services without design knowledge

### 3. Cookie-Based Theme Persistence

Theme choice stored in a `cleanspark_theme` cookie so Astro middleware can read it before rendering — avoiding a flash of wrong theme. Full page reload on theme switch (bypasses ClientRouter) ensures clean component tree swap.

### 4. Progressive Enhancement

All content is server-rendered HTML. JavaScript only loads for 4 interactive islands:

- ThemeSwitcher (`client:load`) — cookie update + page reload
- Contact form validation (`client:load`) — Zod schema, inline field errors
- Gallery filter (`client:load`) — data-attribute based filtering + BeforeAfterSlider
- Mobile navigation (`client:load`) — hamburger overlay with keyboard support

Non-interactive enhancements (scroll-reveal, stats counter, scroll-spy) use IntersectionObserver in `<script>` tags, re-initialized via `astro:page-load` for View Transitions compatibility.

---

_See [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) for decisions and patterns._
_See [planning/TODO.md](planning/TODO.md) for planned architectural changes._
