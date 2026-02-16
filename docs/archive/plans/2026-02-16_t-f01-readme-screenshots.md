# T-F01: README Screenshots & Visual Showcase

**Status**: Complete
**Created**: 2026-02-16
**Completed**: 2026-02-16
**Branch**: feature/t-f01-readme-screenshots

---

## 1. Goal

Capture high-quality above-the-fold screenshots of all 5 CleanSpark themes and embed them in README.md as a visual showcase for portfolio visitors.

## 2. Approach

- Created reusable Playwright script (`scripts/capture-screenshots.mjs`) to capture screenshots programmatically
- Targets live production URL by default, supports `BASE_URL` env var for local use
- Sets theme cookie via `context.addCookies()` (reuses existing E2E test pattern)
- Viewport: 1280x800, above-the-fold capture with 2s wait for fonts/animations
- Vertical stack layout in README for maximum visual impact

## 3. Implementation

### Files Created
- `scripts/capture-screenshots.mjs` — Playwright screenshot automation
- `public/images/screenshots/minimal-home.png` (11KB)
- `public/images/screenshots/bold-home.png` (74KB)
- `public/images/screenshots/trust-home.png` (44KB)
- `public/images/screenshots/bubbly-home.png` (47KB)
- `public/images/screenshots/noir-home.png` (343KB)

### Files Modified
- `README.md` — Added Theme Showcase section with 5 screenshots
- `CLAUDE.md` — Auto-updated with automated screenshot capture pattern

## 4. Key Discoveries

- Playwright `context.addCookies()` works for external domains (Vercel), not just localhost
- 2s wait after `networkidle` is sufficient for custom font loading and hero animations
- Noir Luxe produces the largest screenshot (343KB) due to dark gradients and detailed art; Minimal Zen is smallest (11KB) due to whitespace
- Total screenshot payload is ~519KB — acceptable for a portfolio README

## 5. Future Improvements

1. **WebP format with PNG fallback**: Convert screenshots to WebP for ~60% size reduction while maintaining PNG for older browsers. Would reduce total from ~519KB to ~200KB.
2. **Additional page screenshots**: Capture 1-2 more pages per theme (Services, Gallery) to show layout variety beyond just the home hero. Could use the same script with a `PAGES` config.
3. **Mobile viewport screenshots**: Add a mobile (375x812) capture variant to showcase responsive design in README. Script already supports viewport customization.

### Execution Log

#### 2026-02-16 13:10 — PHASE: Planning
- Goal understood: Screenshot all 5 themes, update README
- Approach chosen: Playwright script + vertical stack README layout
- Risks identified: Font loading timing, animation state, dark theme file size

#### 2026-02-16 13:15 — PHASE: Implementation
- Created capture script using Playwright API
- Captured all 5 screenshots from live site (cleanspark-virid.vercel.app)
- Added Theme Showcase section to README.md
- Build verified clean

#### 2026-02-16 13:20 — PHASE: Complete
- Final approach: Playwright script + above-the-fold + vertical stack
- Tests passing: Yes (build clean)
- User approval: Received
