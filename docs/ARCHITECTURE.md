# Architecture

System design and technical architecture for CleanSpark.

**Last Updated**: 2026-02-09

---

## Overview

CleanSpark is a **static-first, multi-theme cleaning business website** built with Astro's islands architecture. The core architectural challenge is rendering the same business content through 5 radically different design systems, switchable in real-time via a theme engine.

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
| Theme Layouts | Top-level page wrappers per theme | `src/layouts/{theme}/` |
| Theme Components | Theme-specific UI elements | `src/components/{theme}/` |
| Shared Components | Cross-theme utilities (ThemeSwitcher, SEO) | `src/components/shared/` |
| Theme Config | Design tokens, fonts, colors per theme | `src/themes/` |

**Key Interfaces**:

- Every theme layout MUST accept the same props: `{ title, description, theme }`
- Every theme component receives content data via Astro props (not fetched internally)
- ThemeSwitcher is a shared interactive island (client:load)

### Content Layer (Data)

**Purpose**: Stores all business content as structured data, decoupled from design.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| Services Collection | Service definitions (name, description, icon, price) | `src/content/services/` |
| Testimonials Collection | Customer reviews with names, ratings, photos | `src/content/testimonials/` |
| Team Collection | Team member profiles | `src/content/team/` |
| Gallery Collection | Before/after photos with metadata | `src/content/gallery/` |
| Pricing Collection | Pricing tiers and features | `src/content/pricing/` |
| Site Config | Company info, contact, areas served | `src/content/config/` |

**Key Interfaces**:

- All content uses Astro Content Collections with Zod schemas
- Content is type-safe at build time
- Markdown/MDX for rich text fields, JSON for structured data

### Theme Engine Layer (State Management)

**Purpose**: Manages theme selection, persistence, and resolution.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| ThemeStore | Current theme state (cookie-based) | `src/lib/theme-store.ts` |
| ThemeResolver | Maps theme name to layout/components | `src/lib/theme-resolver.ts` |
| ThemeSwitcher | Interactive UI for changing themes | `src/components/shared/ThemeSwitcher.astro` |
| ThemeConfig | Design tokens per theme | `src/themes/{theme}.ts` |

### Routing Layer (Pages)

**Purpose**: File-based routing, delegates rendering to theme system.

**Components**:
| Component | Responsibility | Location |
|-----------|---------------|----------|
| Page files | Route definitions, content fetching | `src/pages/` |
| Dynamic theme selection | Read theme from cookie/URL, pass to layout | `src/middleware.ts` |

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
1. User clicks theme in ThemeSwitcher (interactive island)
   └─▶ 2. JavaScript updates cookie with new theme name
       └─▶ 3. Page reloads (or View Transition navigates)
           └─▶ 4. New request picks up updated cookie
               └─▶ 5. Different layout + components render
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
interface ThemeConfig {
  name: string // "minimal" | "bold" | "trust" | "bubbly" | "noir"
  displayName: string // "Minimal Zen"
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    muted: string
  }
  fonts: {
    heading: string // Google Font family
    body: string
    accent?: string // Optional decorative font
  }
  borderRadius: string // "0" to "2rem"
  animations: {
    pageTransition: string // CSS animation name
    sectionReveal: string
    hoverEffect: string
  }
}
```

---

## External Dependencies

### Libraries (Planned)

| Library           | Version | Purpose                  |
| ----------------- | ------- | ------------------------ |
| astro             | 5.x     | Core framework           |
| @astrojs/tailwind | latest  | Tailwind CSS integration |
| @astrojs/check    | latest  | TypeScript checking      |
| tailwindcss       | 4.x     | Utility-first CSS        |
| astro-icon        | latest  | Icon components (Lucide) |
| @fontsource/\*    | latest  | Self-hosted Google Fonts |
| sharp             | latest  | Image optimization       |
| playwright        | latest  | E2E testing              |
| vitest            | latest  | Unit testing             |

---

## Configuration

### Environment Variables

| Variable               | Purpose                              | Required                   |
| ---------------------- | ------------------------------------ | -------------------------- |
| `PUBLIC_SITE_URL`      | Base URL for canonical tags, sitemap | Yes                        |
| `PUBLIC_DEFAULT_THEME` | Fallback theme if no cookie          | No (defaults to "minimal") |

### Configuration Files

| File                 | Purpose                |
| -------------------- | ---------------------- |
| `astro.config.mjs`   | Astro framework config |
| `tailwind.config.ts` | Tailwind CSS config    |
| `tsconfig.json`      | TypeScript config      |
| `.prettierrc`        | Code formatting rules  |
| `.eslintrc.cjs`      | Linting rules          |

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

Theme choice stored in a cookie (not localStorage) so the server (or edge) can read it before rendering — avoiding a flash of wrong theme.

### 4. Progressive Enhancement

All content is server-rendered static HTML. JavaScript only loads for:

- ThemeSwitcher (interactive island)
- Contact form validation (interactive island)
- Gallery filter (interactive island)
- Animations that require IntersectionObserver

---

_See [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) for decisions and patterns._
_See [planning/TODO.md](planning/TODO.md) for planned architectural changes._
