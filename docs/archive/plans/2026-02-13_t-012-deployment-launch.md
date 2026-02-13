# T-012: Deployment & Launch

**Status**: Complete
**Created**: 2026-02-13
**Completed**: 2026-02-13
**Branch**: feature/t-012-deployment-launch

---

## 1. Goal

Configure Vercel deployment for CleanSpark SSR site, verify production performance with Lighthouse, and update README/config files with live URL.

## 2. Scope Decision

User selected **"Core deployment only"** — deploy to Vercel, Lighthouse audit, update README with live URL. Deferred: screenshots, case study, social share images, docs review, custom domain.

## 3. Implementation

### 3a. Adapter Swap

- Removed `@astrojs/node` (9.5.2), installed `@astrojs/vercel` (9.0.4)
- Changed `astro.config.mjs`: `output: 'static'` -> `'server'`, adapter `node()` -> `vercel()`
- Build verified: 0 errors, 0 warnings

### 3b. Vercel Deployment

- Installed Vercel CLI v50.17.1
- Created project via `vercel project add cleanspark`
- First deploy (local prebuilt) failed with 500 FUNCTION_INVOCATION_FAILED
- Second deploy (remote build) succeeded: https://cleanspark-virid.vercel.app
- Verified with Playwright: theme switching, page navigation all working

### 3c. Post-Deploy Updates

- Set `PUBLIC_SITE_URL` and `PUBLIC_DEFAULT_THEME` env vars on Vercel
- Updated `.env.example` with descriptive comments
- Updated `robots.txt` with Sitemap directive
- Enhanced `README.md` with live demo link, highlights, themes table
- Added `.vercel/` to `.gitignore`
- Redeployed to pick up env vars

### 3d. Lighthouse Audit

- **Mobile**: 100/100/100/100 (FCP 1.1s, LCP 1.1s, TBT 0ms, CLS 0)
- **Desktop**: 100/100/100/100 (FCP 0.3s, LCP 0.3s, TBT 0ms, CLS 0)

## 4. Key Discoveries

- Vercel CLI `vercel link` fails in non-interactive terminals — workaround: `vercel project add` + manual `.vercel/project.json`
- Local prebuilt deploy (`--prebuilt`) causes 500 errors on Windows — remote build works correctly
- Astro 5 config had `output: 'static'` with `prerender = false` pages and `@astrojs/node` adapter — contradictory config that worked locally but needed cleanup

## 5. Future Improvements

1. **README screenshots of all 5 themes** — Capture and embed screenshots showing each theme's distinct visual identity (deferred from T-012 scope)
2. **Portfolio case study writeup** — Document design decisions, architecture choices, and technical challenges for portfolio presentation (deferred from T-012 scope)
3. **Social share / OG images per theme** — Generate theme-specific Open Graph images for better social media sharing
4. **Automated Lighthouse CI** — Add GitHub Actions step to run Lighthouse on PRs and fail if scores drop below 90
5. **Custom domain setup** — Configure custom domain when available

## 6. Files Modified

- `astro.config.mjs` — Adapter and output mode
- `package.json` / `pnpm-lock.yaml` — Dependency swap
- `.gitignore` — Added `.vercel/`
- `.env.example` — Added comments
- `public/robots.txt` — Added Sitemap
- `README.md` — Enhanced with live demo info
