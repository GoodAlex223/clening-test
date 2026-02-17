# T-F03: OG/Social Share Images

**Status**: Complete
**Created**: 2026-02-17
**Completed**: 2026-02-17
**Branch**: `feature/t-f03-og-social-images`

## Goal

Generate theme-specific Open Graph images for better social media sharing.

## Approach

Minimal approach: 1 new utility file, 2 modified files, extend existing capture script.

- Screenshot capture via Playwright (1200x630 viewport) — always matches live site
- `Astro.url.origin` for absolute URL construction — works in dev/preview/production
- SEO component auto-resolves OG image from active theme when no explicit `image` prop

## Implementation

### Files Changed

| File | Change | Lines |
|------|--------|-------|
| `src/lib/og-image.ts` | NEW — `getOgImageUrl(themeId, origin)` utility | +16 |
| `src/components/shared/SEO.astro` | Auto-resolve OG image, add dimensions/alt meta | +8/-4 |
| `scripts/capture-screenshots.mjs` | Dual-purpose: README screenshots + OG images | +50/-31 |
| `public/images/og/*.png` | NEW — 5 theme-specific OG images (1200x630) | binary |

### Key Decisions

1. **Keep ThemeConfig purely visual** — OG URL logic in separate utility, not in theme configs
2. **Use `Astro.url.origin`** over hardcoded URL — correct for all environments
3. **Extend existing script** over creating separate capture-og.mjs — DRY, single invocation
4. **Always render OG image** — removed conditional `{image && ...}`, every page now has OG image

### Verification

- TypeScript: 0 errors, 0 warnings, 0 hints (99 files)
- Production build: passes
- Unit tests: 78/78 passing
- OG images: 5 generated, visually verified

## Key Discoveries

- OG spec recommends `og:image:width` and `og:image:height` for faster social platform crawling
- `twitter:image:alt` improves accessibility for Twitter card previews
- Capture script data-driven loop pattern scales cleanly to multiple image sets

## Future Improvements

1. **Per-page OG images** — Currently homepage-only; could generate 30 images (5 themes x 6 pages) for page-specific social previews
2. **WebP OG images with PNG fallback** — Reduce file sizes ~60% while maintaining compatibility with older social platform crawlers
3. **OG image validation in CI** — Add build step to verify all 5 OG images exist and meet 1200x630 dimensions

## Execution Log

#### 2026-02-17 — PHASE: Planning
- Goal understood: Theme-specific OG images for social sharing
- Approach chosen: Minimal — extend existing infrastructure
- Risks identified: URL construction for SSR, image file sizes

#### 2026-02-17 — PHASE: Implementation
- Created og-image.ts utility with theme validation and fallback
- Updated SEO.astro with auto-resolve, dimensions, alt text
- Extended capture-screenshots.mjs with data-driven dual-capture loop
- Generated 5 OG images from production site (10KB–295KB)

#### 2026-02-17 — PHASE: Quality Review
- Code review found 2 issues: missing dimensions (fixed), origin validation (skipped — Vercel handles safely)
- Added og:image:width/height/alt and twitter:image:alt meta tags

#### 2026-02-17 — PHASE: Complete
- Final approach: Minimal — 1 new file, 2 modified, 5 images
- Tests passing: yes (78 unit, build clean)
- User approval: received
