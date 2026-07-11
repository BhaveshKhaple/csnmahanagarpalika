# Phase 1 Summary — Public Route Group & Homepage Rebuild

**Status:** ✅ Complete
**Commit:** `c5a5b39`
**Date:** 2026-07-12

---

## What Was Built

### 1. `(public)` Route Group
- **`src/app/(public)/layout.tsx`** — Thin unauthenticated layout with per-group metadata (title template, OG locale set to `mr_IN`). No auth check. All pages under this group are served without login.
- **`src/app/(public)/page.tsx`** — Homepage now lives in the public group. Includes code comments documenting the DOM order decision and phase scope.
- **`src/app/page.tsx`** — Deleted. Next.js App Router now serves `/` exclusively from `(public)/page.tsx`.

### 2. Routes Constants
- **`src/lib/constants/routes.ts`** — Added `PUBLIC` namespace with all 6-group IA routes (HOME, SERVICES.*, ABOUT.*, TENDERS, DOCUMENTS, CONTACT, COMPLAINTS.*, ANNOUNCEMENTS).
- Added `ROUTE_LABELS` export — a bilingual (Marathi + English) map from every public route path to its human-readable label. Used by the `<Breadcrumb />` component in Phase 2.

### 3. Hero Section — `next/image` Migration
- **`src/components/home/hero-section.tsx`** — CSS `backgroundImage` replaced with `next/image` component.
  - First slide: `priority={true}` (LCP candidate, fetched eagerly).
  - Additional slides: lazy-loaded.
  - `fill` + `sizes="100vw"` gives browser correct srcsets for every viewport.
  - No autoplay video — spec requirement met.
  - Fallback rendered (branded gradient) when `public/images/home-slider/` is empty.

### 4. Online Services Section — Spec-Compliant Cards
- **`src/components/home/online-services-section.tsx`** — Complete rebuild:
  - 6 primary service cards matching spec: Pay Tax, Pay Water Bill, File Complaint, Track Complaint, Get Certificate, All Services.
  - **Complaint and track cards** now link to `ROUTES.PUBLIC.COMPLAINTS.*` (no login needed) instead of `/citizen/complaints/*`.
  - All cards carry **Marathi primary label + English subtitle** for Phase 4 i18n extraction.
  - Lock icon (`🔒`) on login-required services with visible legend.
  - `min-h-[44px]` on quick links bar — touch target spec met.
  - `aria-label`, `role="list"`, `role="listitem"` for screen readers.
  - Secondary services row for certificates/marriage/trade license.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/(public)/layout.tsx` | **NEW** — public group layout |
| `src/app/(public)/page.tsx` | **NEW** — homepage in public group |
| `src/app/page.tsx` | **DELETED** — public/page.tsx owns `/` |
| `src/lib/constants/routes.ts` | **MODIFIED** — PUBLIC namespace + ROUTE_LABELS |
| `src/components/home/hero-section.tsx` | **MODIFIED** — next/image, fallback, LCP priority |
| `src/components/home/online-services-section.tsx` | **MODIFIED** — 6-card grid, public routes, English subtitles, a11y |
| `docs/csmc-adaptation-instructions.md` | **MOVED** from root → `docs/` |
| `docs/csmc-website-redesign-spec.md` | **TRACKED** — was untracked |

---

## Verification

- `npx tsc --noEmit` → **0 errors** after clearing `.next/` cache.
- DOM order: Hero → About → Services → Officials → News → Social → QuickLinks → Footer. **Services above Officials ✓**
- `(public)/page.tsx` imports no auth middleware. **No login required ✓**
- Hero uses `next/image` with `priority`. **No autoplay video ✓**
- Complaint cards point to `/complaints/new` and `/complaints/track`. **Public routes ✓**
- Touch targets: quick links have `min-h-[44px]`. **44px minimum ✓**

---

## Deferred to Later Phases

| Item | Phase |
|------|-------|
| i18n extraction of hardcoded Marathi strings | Phase 4 |
| Navigation 6-group IA (navbar, mobile drawer) | Phase 3 |
| Remaining public pages (services hub, about, tenders, documents, contact) | Phase 5 |
| Guest complaint form and Firestore rules | Phase 6 |
| `@tailwindcss/container-queries` on ServiceCard | Phase 2 |
| Breadcrumb component | Phase 2 |

---

## Next Phase

**Phase 2: Shared Component Infrastructure**
Build `ServiceCard`, `AnnouncementList`, `NewsCard`, `Breadcrumb`, `StatusBadge`, `CategorySelect`, `ConfirmationReceipt`.

Run `/gsd-plan-phase 2` to begin.
