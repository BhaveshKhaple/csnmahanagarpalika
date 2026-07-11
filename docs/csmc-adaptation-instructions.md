# CSMC Website Redesign — Adaptation Instructions for `csnmahanagarpalika` Repo

**Target repo:** https://github.com/upadesh94/csnmahanagarpalika
**Stack found in repo:** Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + Firebase (Firestore/Auth/Storage/Functions) + Zustand + React Query

**Purpose of this doc:** This is a task list for an AI coding agent (Claude Code or similar) working *inside this repo*. It maps everything from the earlier requirements doc (`csmc-website-redesign-spec.md`, including the Multi-Device Optimization section) onto this repo's actual folder structure, and calls out where the current architecture doesn't yet match what the redesign needs. Read this together with the earlier spec — this file tells the agent *where in the repo* to make each change; the earlier spec explains *why*.

---

## 0. Important Mismatch to Resolve First

The current repo is architected as a **login-first, role-based citizen portal** (`(auth)`, `(citizen)`, `(admin)`, `(officer)` route groups, Firebase Auth, JWT/MFA). This is appropriate for the transactional parts of the platform (payment history, digital locker, saved applications).

However, the CSMC audience we're designing for is mostly **anonymous, low-tech, mobile-data-constrained citizens who need to browse public info and start simple transactions without creating an account first** (check a tender, read an announcement, file a complaint, check a complaint's status, find office contact info). Forcing login/registration before any of that is a major drop-off risk for this audience.

**Required architectural change:** Add a **public, no-login route group** for informational + lightweight-transactional pages, and keep the existing `(auth)`/`(citizen)`/`(admin)`/`(officer)` groups strictly for account-based flows (saved payment history, digital locker, application status tied to a profile, etc.). Where a task can be done without an account (e.g., filing a complaint by phone number, checking status by complaint ID), build it in the public group — do not require login for it.

```
src/app/
├── (public)/                # NEW — no login required
│   ├── page.tsx             # replaces current root landing page.tsx content
│   ├── about/
│   ├── services/
│   ├── tenders/
│   ├── documents/
│   ├── contact/
│   └── complaints/          # public complaint file + track (guest flow)
│       ├── new/
│       └── track/
├── (auth)/                  # existing — unchanged
├── (citizen)/                # existing — unchanged, becomes the "logged-in" deeper experience
├── (admin)/                  # existing — unchanged
└── (officer)/                # existing — unchanged
```

Note: `(citizen)/complaints/new` and `(citizen)/complaints/track` already exist in the current structure — keep those for logged-in users who want history tied to their account, and add a parallel guest-accessible version under `(public)/complaints/`. Share the same form component (see Section 3) so there's one implementation, just rendered inside a different route/layout.

---

## 1. Information Architecture → Route Mapping

Implement the 6-group navigation from the earlier spec as actual routes inside `(public)`:

| Nav group (Marathi) | Route | Notes |
|---|---|---|
| मुख्यपृष्ठ (Home) | `(public)/page.tsx` | Replace current landing page content entirely — see Section 2 |
| नागरी सेवा (Citizen Services) | `(public)/services/page.tsx` | Hub page — card grid linking to property-tax, water-bills, certificates, complaints, gunthewari calculator (some links point into `(citizen)` for account-bound flows, clearly labeled "requires login") |
| महानगरपालिकेविषयी (About) | `(public)/about/page.tsx` + `about/mission/`, `about/officials/`, `about/faqs/`, `about/emergency-plan/` | Break into short sub-pages, not one dense page |
| निविदा व भरती (Tenders & Recruitment) | `(public)/tenders/page.tsx` | Merged, filterable, sorted newest-first |
| कागदपत्रे व माहिती (Documents & Info) | `(public)/documents/page.tsx` | RTI, RTS, census, DP plan, ward/dept lists |
| संपर्क (Contact) | `(public)/contact/page.tsx` | HQ + emergency contacts + map + feedback form |

Update `src/lib/constants/routes.ts` to add all new public route constants alongside the existing ones — do not hardcode route strings in components.

---

## 2. Homepage (`src/app/(public)/page.tsx`)

Rebuild using the existing `src/components/layout/` and new `src/components/shared/` components:

1. `<Header>` (existing `components/layout/header.tsx`, extended — see Section 4) with font-size control and language toggle.
2. Hero: static compressed image via `next/image`, no autoplay video. If a promotional video is wanted later, load it behind an explicit play button, lazy-mounted.
3. **New `ServiceCardGrid` component** (`components/shared/service-card-grid.tsx`, composed of new `components/shared/service-card.tsx`) — 4-6 cards (Pay Tax, Pay Water Bill, File Complaint, Track Complaint, Get Certificate, All Services), icon + Marathi label + English subtitle, linking into `(public)/services/*`. This must render above any leadership/politician photo section in the DOM and visually.
4. Short About block (2-3 lines, "read more" → `(public)/about`).
5. **New `AnnouncementList` component** (`components/shared/announcement-list.tsx`) — max 5 on homepage, date + title + doc-type icon, "View all" → new `(public)/announcements` page (add this route; currently has no equivalent).
6. **New `NewsCard` component** (`components/shared/news-card.tsx`) — image + headline + date, lazy-loaded images with blur placeholder (`next/image` `placeholder="blur"`).
7. Leadership/officials section: reuse/adapt existing patterns, place below services and news, compact grid not full carousel.
8. Social links: simple icon links out to Facebook/Instagram/YouTube — do not embed raw plugin iframe URLs as visible text.
9. `<Footer>` (existing `components/layout/footer.tsx`, extended per Section 6).

---

## 3. Complaint Flow (Public + Citizen)

Build one shared form, used in two places:

- `src/components/forms/complaint-form.tsx` (already exists — extend it) with props to toggle "guest mode" (name + mobile number only, no account) vs "logged-in mode" (pre-filled from profile).
- `(public)/complaints/new/page.tsx` renders `<ComplaintForm guestMode />`.
- `(citizen)/complaints/new/page.tsx` renders `<ComplaintForm guestMode={false} />` (existing page, just wire to the shared component if not already).
- Category selection uses icons (water/road/sanitation/streetlight/other) — add to `components/shared/` as `category-select.tsx`.
- On submit, show the complaint ID prominently with a "save/copy" affordance — add `components/shared/confirmation-receipt.tsx`.
- `(public)/complaints/track/page.tsx` and `(citizen)/complaints/track/page.tsx`: single field (complaint ID or mobile number) → status via existing `src/app/api/complaints/[id]/route.ts` (extend to support lookup by mobile number for guest users, with rate limiting — see Section 7).
- Status must render as icon + Marathi text (Received/In Progress/Resolved), not just a color dot — add `components/shared/status-badge.tsx`.

---

## 4. Navigation Components

Modify existing files, don't create parallel ones:

- `src/components/layout/navbar.tsx`: implement the 6-group structure from Section 1. On mobile, collapse into a drawer (`components/layout/mobile-nav-drawer.tsx` — new) triggered by a hamburger icon with a 44x44px tap target. On desktop, show as a horizontal grouped menu (dropdowns for groups with sub-pages).
- `src/components/layout/header.tsx`: add font-size control (A-/A/A+) and language toggle here; both should be visible on every breakpoint, not hidden behind a menu.
- Add `src/components/shared/breadcrumb.tsx` and render it on every `(public)` page except the homepage, using route metadata (extend `lib/constants/routes.ts` with human-readable labels per route for this purpose).
- Ensure every route added under `(public)` has a clean, human-readable slug (already the Next.js App Router default via folder names — just avoid any dynamic hashed segments for these pages).

---

## 5. Internationalization (Marathi/English)

Current repo only has `public/locales/en.json` and `public/locales/hi.json` (Hindi) — **this needs to change to Marathi, not Hindi**, since the target audience reads Marathi, not Hindi.

1. Rename/replace `public/locales/hi.json` → `public/locales/mr.json` (Marathi).
2. Restructure both `en.json` and `mr.json` as flat or nested key-based dictionaries (e.g., `{"nav.services": "नागरी सेवा", "nav.services_en": "Citizen Services"}` or two separate trees) so every component pulls strings from keys, never hardcodes Marathi or English text inline.
3. Introduce a lightweight i18n approach if one doesn't already exist in `src/lib/` — either add `next-intl` or a simple custom `useTranslation()` hook backed by the locale JSON + React Context, stored under `src/lib/i18n/`.
4. Audit every existing hardcoded string in `components/` and `app/(public)/` and move it into the locale files during this work — this is required to fix the current site's mixed-language nav problem identified earlier.
5. Language toggle (in header) switches the active locale and persists the choice (e.g., cookie or `localStorage` via the existing `use-local-storage.ts` hook) — no page reload required if using Context; acceptable to reload once if using `next-intl` routing-based locales.
6. No page/component may render English and Marathi in the same nav item when a single language is selected (fixes the current live site's "CSMC महत्वाचे पोर्टल"-style mixing).

---

## 6. Footer & Misc Content Fixes

- `src/components/layout/footer.tsx`: single row of app-download badges (currently duplicated content on the live site — make sure this component is only rendered once per page, and don't duplicate the same badge list elsewhere).
- Add real address + embedded map (use `components/maps/interactive-map.tsx` if suitable, or a lightweight static map embed) instead of address-as-plain-text only.
- Add office hours and phone/email as structured fields, not buried in a paragraph.
- Visitor counter, if kept at all, renders as small unobtrusive footer text, not a prominent heading.

---

## 7. Guest Access & Security Considerations

Since Section 0 introduces unauthenticated complaint filing/tracking:

- Rate-limit the public complaint-submission and status-lookup API routes (extend existing rate-limiting approach referenced in `docs/SECURITY.md`/`firebase/functions` patterns) to prevent abuse, since these no longer sit behind login.
- Add CAPTCHA or equivalent lightweight bot protection on the public complaint form only (not on browsing pages).
- Firestore security rules (`firestore.rules`) need a scoped rule allowing create-only, unauthenticated writes to a constrained `complaints` document shape (no arbitrary field writes), and read access to complaint status only via a lookup key (complaint ID) — not full collection listing. Update `firestore.rules` accordingly and document the change in `docs/SECURITY.md`.

---

## 8. Multi-Device Optimization — Mapped to This Codebase

(Full rationale is in the earlier spec's Section 8 — this is the "where to implement it" version.)

- **Tailwind config (`tailwind.config.ts`)**: extend `theme.screens` only if the default Tailwind breakpoints (`sm/md/lg/xl/2xl`) don't match the content-driven breakpoints found during build/testing — don't guess upfront, adjust as components are built. Add `fontSize` scale using `clamp()`-based values for headings/body (Tailwind supports arbitrary values, e.g. `text-[clamp(1rem,2vw,1.5rem)]`) instead of fixed `rem` jumps per breakpoint.
- **Container queries**: Tailwind CSS v3.4+ supports `@container` via the official `@tailwindcss/container-queries` plugin — add it as a dependency and use it on `ServiceCard`, `NewsCard`, and `AnnouncementListItem` so they adapt to the grid column they're placed in, not just viewport width.
- **Images**: use `next/image` everywhere (already a Next.js 14 project, so this should be the default, not `<img>`) for automatic responsive `srcset`, lazy loading, and blur placeholders. Populate `next.config.js` `images.domains`/`remotePatterns` for any Firebase Storage or external image sources.
- **Fonts**: use `next/font` (already idiomatic in Next.js 14) to load Inter (per the existing design-system note) with proper subsetting — avoids render-blocking font requests, helps low-end device performance.
- **Touch targets & interaction**: audit `components/ui/button.tsx` and form inputs to guarantee a minimum 44x44px hit area at all breakpoints; ensure no component relies on `:hover` alone for critical functionality (check `components/ui/dropdown.tsx`, `tabs.tsx` for hover-only reveal patterns and add tap/click equivalents).
- **Performance budget**: since this is Next.js, use SSR/SSG (`generateStaticParams`/static rendering) for all `(public)` pages where content doesn't need to be per-request dynamic (About, Tenders list, Documents, Contact) so they ship fast HTML with minimal JS needed for first paint — reserve client components (`"use client"`) for interactive pieces only (forms, language toggle, mobile drawer).
- **Testing**: add Lighthouse CI to the existing `.github/workflows/` (there's already `ci.yml`) with a mobile config (throttled 4G, mid-tier device CPU) and fail the build if LCP/CLS budgets are exceeded on `(public)` pages specifically, since those are the highest-traffic, most performance-sensitive pages for this audience.
- **Orientation/responsive QA**: since there's already a `use-media-query.ts` hook, use it for any JS-driven layout branching (avoid it for pure CSS-solvable cases — prefer Tailwind responsive classes/container queries first, JS hook only when layout logic genuinely needs it, e.g. switching a chart's orientation).

---

## 9. Accessibility — Mapped to This Codebase

- `components/ui/` primitives (`button.tsx`, `input.tsx`, `modal.tsx`, `dropdown.tsx`, `tabs.tsx`) are the right place to bake in ARIA roles/labels and keyboard handling once, so every page inherits it — audit these first before building new public pages on top of them.
- All `next/image` usages require real, locale-aware `alt` text sourced from the same i18n system in Section 5 — no `alt=""` except genuinely decorative images.
- Confirm color tokens in `tailwind.config.ts` meet WCAG AA contrast (repo's README already claims "WCAG 2.2 AA compliant" — verify this is actually enforced, e.g. with an automated contrast-check step in CI, not just asserted).
- Font-size control (Section 4) must actually scale rendered text site-wide — verify it affects the `clamp()`-based Tailwind classes from Section 8, not just a subset of components.

---

## 10. Task Order for the Agent

1. Add `(public)` route group and move/rebuild the homepage (Sections 0, 1, 2).
2. Build shared components: `ServiceCard`, `ServiceCardGrid`, `AnnouncementList`, `NewsCard`, `Breadcrumb`, `StatusBadge`, `CategorySelect`, `ConfirmationReceipt` (Sections 2-3).
3. Wire navigation: `navbar.tsx`, `header.tsx`, `mobile-nav-drawer.tsx` (Section 4).
4. Set up i18n and migrate `hi.json` → `mr.json`, remove hardcoded strings from any component touched so far (Section 5).
5. Build out remaining `(public)` pages: services hub, about sub-pages, tenders, documents, contact (Section 1).
6. Extend complaint form/routes for guest access + add rate limiting/Firestore rule changes (Sections 3, 7).
7. Apply multi-device + accessibility work across everything touched (Sections 8-9) — treat this as an ongoing constraint during steps 1-6, not a separate pass at the end, but do a final dedicated audit pass using the checklist below.
8. Add Lighthouse CI check.

---

## 11. Final Acceptance Checklist (repo-specific, in addition to the earlier spec's general checklist)

- [ ] `(public)` route group exists and none of its pages require authentication.
- [ ] Homepage service cards render above leadership/photo content in both DOM order and visual order.
- [ ] `public/locales/mr.json` exists (Marathi) and is the default locale; `hi.json` removed or clearly repurposed if Hindi is still needed for a different reason.
- [ ] No component has hardcoded Marathi or English strings outside the locale files.
- [ ] Guest complaint filing and guest complaint tracking both work without login, and both are rate-limited.
- [ ] `next/image` used for all content images; no raw `<img>` tags for photos/news/service icons.
- [ ] `@tailwindcss/container-queries` (or equivalent) installed and used on at least `ServiceCard`, `NewsCard`, `AnnouncementListItem`.
- [ ] Mobile nav drawer and desktop grouped nav both implement the same 6-group IA from Section 1.
- [ ] Lighthouse CI step added and passing on `(public)` pages under a throttled mobile profile.
- [ ] Firestore rules updated and reviewed for the new unauthenticated complaint-write path.
