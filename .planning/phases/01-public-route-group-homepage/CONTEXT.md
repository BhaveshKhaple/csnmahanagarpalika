# Phase 1 Discussion Context
# Public Route Group and Homepage Rebuild

**Date:** 2026-07-12
**Phase:** 1 of 8
**Source spec:** docs/csmc-adaptation-instructions.md (Sections 0, 1, 2, 10)

---

## What exists right now

| Item | Current state |
|------|--------------|
| Route groups | **None.** No `(public)`, `(auth)`, `(citizen)`, `(admin)`, `(officer)` wrappers. Routes are flat. |
| Homepage | `src/app/page.tsx` — renders Header + 7 section components from `src/components/home/` |
| Current section order | Hero → About → OnlineServices → Officials → News → Social → QuickLinks |
| Auth enforcement | **Client-side only.** `middleware.ts` handles locale prefix stripping only; no route-based auth. |
| Locales in middleware | `en`, `mr`, `hi` recognized; locale prefix stripped on redirect |
| Existing services section | `online-services-section.tsx` — 8 service cards (all link to `/citizen/...` routes) |
| `routes.ts` | Has `CITIZEN`, `OFFICER`, `ADMIN` groups; public routes defined as flat top-level keys |

## Decisions Made in Discussion

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Keep AboutSection **above** OnlineServices | Services are already above Officials — spec requirement satisfied. Don't move what works. |
| 2 | **Minimal scope**: create `(public)/` group only; leave all other existing routes in place | Other pages addressed in Phases 3-5. Reducing blast radius of Phase 1. |
| 3 | **Skip middleware auth-gating** in Phase 1 | No auth is middleware-enforced today; adding it now is out of scope and risky. Phase 6 task if needed. |
| 4 | **Reuse existing home components** in `(public)/page.tsx` | Phase 4 handles i18n/migration. Phase 1 focuses on structure/routing only, not component rebuilds. |

## What Phase 1 Must Deliver

1. `src/app/(public)/layout.tsx` — public layout (no auth check, clean wrapper)
2. `src/app/(public)/page.tsx` — homepage rebuilt to: fix DOM order (services above officials), use `next/image` for hero, no autoplay video
3. Root `src/app/page.tsx` → redirect to `(public)/page.tsx` (or replace with a redirect)
4. `src/lib/constants/routes.ts` → add `PUBLIC` namespace with 6-group IA routes
5. Middleware: no change needed; `(public)` route group is transparent to the current middleware

## What Phase 1 Does NOT Do

- Component rebuilds (ServiceCardGrid, AnnouncementList, NewsCard) → Phase 2
- i18n migration (mr.json) → Phase 4
- Nav overhaul (mobile drawer, desktop grouped menu) → Phase 3
- Remaining public pages (services, about, tenders, documents, contact) → Phase 5
- Guest complaint flow → Phase 6
- Auth middleware gating → deferred indefinitely (no current requirement)

## Current DOM Order vs Target

| Current | Target (Phase 1) |
|---------|-----------------|
| Header | Header |
| Hero | Hero (static `next/image`, no autoplay) |
| **AboutSection** | **AboutSection** (keep above services — user decision) |
| OnlineServicesSection | OnlineServicesSection |
| OfficialsSection | OfficialsSection |
| NewsSection | NewsSection |
| SocialMediaSection | SocialMediaSection |
| QuickLinksSection | QuickLinksSection |
| Footer | Footer |

The critical spec requirement is already met: services **are** above officials in both current and target order.

## Risks

- The root `src/app/page.tsx` and `src/app/(public)/page.tsx` will both try to serve `/` — Next.js App Router disambiguates via route groups, but the root `page.tsx` **wins** if it still exists. Must delete/replace root `page.tsx` when `(public)/page.tsx` is created.
- `(public)` route group folder name is transparent to URLs — this is the intended behavior.
- No middleware auth risk since we're not touching middleware.
