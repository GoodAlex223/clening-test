# Goals

Project objectives and success metrics for CleanSpark.

**Last Updated**: 2026-02-17
**Review Cycle**: Per phase completion
**Status**: All objectives achieved

---

## Mission

Demonstrate senior-level frontend engineering skills through a multi-theme cleaning business website that showcases architecture, design systems, performance, and production quality.

---

## Current Objectives

### Objective 1: Portfolio Impact

**Description**: Create a project that stands out in a developer portfolio and demonstrates skills not shown in existing GitHub projects.

**Key Results**:
| Key Result | Target | Current | Status |
|------------|--------|---------|--------|
| Unique tech stack in portfolio | Astro (new) | Astro 5.x deployed | Achieved |
| Design themes implemented | 5 | 5 (Minimal Zen, Bold Spark, Trust Shield, Bubbly Clean, Noir Luxe) | Achieved |
| Lighthouse performance score | 90+ all metrics | 100/100/100/100 (mobile and desktop) | Exceeded |
| Accessibility compliance | WCAG 2.1 AA | Verified with axe-core on all 30 theme/page combinations | Achieved |
| README with visual showcase | Screenshots of all 5 themes | 5 above-the-fold screenshots + Theme Showcase section | Achieved |

**Timeline**: Phase 1-4 (completed 2026-02-17)

### Objective 2: Technical Excellence

**Description**: Build a production-quality codebase that demonstrates advanced patterns.

**Key Results**:
| Key Result | Target | Current | Status |
|------------|--------|---------|--------|
| Type-safe content system | Zod schemas, zero `any` | 5 Zod-validated collections, TypeScript strict mode | Achieved |
| Multi-theme architecture | 5 full layout swaps | 5 complete layout systems with compile-time resolver | Achieved |
| Test coverage | E2E on all pages × all themes | 962 tests (78 unit + 884 E2E across 4 browsers) | Achieved |
| Build size (JS) | <100KB total | Minimal JS (4 interactive islands only) | Achieved |
| Mobile responsiveness | All pages, all themes, 320px+ | All 30 theme/page combinations responsive | Achieved |

**Timeline**: Phase 1-3 (completed 2026-02-13)

### Objective 3: Real-World Authenticity

**Description**: The cleaning website should feel like a real business, not a demo placeholder.

**Key Results**:
| Key Result | Target | Current | Status |
|------------|--------|---------|--------|
| Realistic service descriptions | 6+ services with details | 7 services (3 residential, 1 commercial, 3 specialty) with detailed descriptions | Achieved |
| Authentic testimonials | 8+ varied reviews | 10 testimonials with names, ratings, service tags | Achieved |
| Competitive pricing tiers | 3 tiers, market-accurate | 3 tiers (Standard, Deep Clean, Premium) with features | Achieved |
| Professional imagery | High-quality, non-stock feel | CSS-only art (shield, diamond, bubbles, geometric shapes) + SVG placeholders | Achieved |
| Working contact form | Validation + success state | Zod schema validation with inline field errors + success state | Achieved |

**Timeline**: Phase 1-2 (completed 2026-02-12)

---

## Non-Goals

Things we explicitly are NOT trying to do:

- **Backend API** — No server-side business logic, no database. SSR is used only for cookie-based theme reading, not data persistence or API endpoints.
- **Real business operations** — No actual booking system, payment processing, or CRM integration.
- **CMS integration** — Content managed via code (Content Collections), not a headless CMS.
- **Multi-language i18n** — English only for MVP.
- **Blog section** — Not in MVP scope despite being common on cleaning sites.
- **User authentication** — No login, accounts, or user dashboards.

---

## Constraints

Limitations we're working within:

| Constraint        | Description                                       | Impact                                                          |
| ----------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| SSR only          | Server-side rendering via Vercel serverless        | Cookie-based theme switching requires server; forms use client-side validation |
| No budget         | Free-tier tools only                              | Vercel free tier, free fonts, free icons                        |
| Portfolio context | Must be visually impressive in README/screenshots | Design quality is as important as code quality                  |
| Single developer  | No team, no review process                        | Self-review via Claude Code, automated testing critical         |
| Time-boxed        | MVP, not a full product                           | Cut scope before quality                                        |

---

_See [ROADMAP.md](ROADMAP.md) for release planning._
_See [MILESTONES.md](MILESTONES.md) for key dates._
_See [TODO.md](TODO.md) for tactical execution._
