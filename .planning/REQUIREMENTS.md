# Requirements Specifications

> **Sources:**
> - `docs/csmc-adaptation-instructions.md` (repo-specific task list)
> - `docs/csmc-website-redesign-spec.md` (general UX/UI/multi-device spec)

## User Stories

### 1. Unauthenticated Browsing
- **As a** guest citizen visiting the site (typically 30-60 yrs, Marathi-speaking, budget Android phone, mobile data),
- **I want to** read announcements, view active tenders, look up department contacts, and search for municipal services without logging in,
- **So that** I can get the information I need in under 10 seconds without any registration friction.

### 2. Guest Transaction
- **As a** citizen without a registered account,
- **I want to** file a civic complaint and track its resolution progress using a temporary reference identifier or phone lookup,
- **So that** I can report issues in my neighborhood without completing a signup flow, and resume checking from a different device later.

### 3. Accessible & Multilingual UI
- **As a** Marathi-speaking resident on a low-end mobile device,
- **I want** the website to load under 3 seconds on 3G/weak 4G, display clearly in Marathi with font-size controls that persist my choice,
- **So that** I can comfortably navigate and complete tasks even on a slow connection.

### 4. Cross-Device Task Continuity
- **As a** citizen who starts filling a complaint on mobile at a shop counter,
- **I want** to receive a complaint reference ID I can use on any device later,
- **So that** I am never trapped in one device's local state.

---

## v1 Requirements

### Public Routing & Homepage
- [ ] **REQ-PUB-01**: Implement the unauthenticated `(public)` route group.
- [ ] **REQ-PUB-02**: Rebuild the root landing page under `(public)/page.tsx` as a public portal.
- [ ] **REQ-PUB-03**: Move the homepage hero banner to a static, compressed image block and lazy-mount any promotional video.
- [ ] **REQ-PUB-04**: Place the new ServiceCardGrid component above any politician/leadership photos in the DOM and visual order.

### Shared UI Components
- [ ] **REQ-SHR-01**: `ServiceCard` / `ServiceCardGrid` component with container query responsiveness for adaptive styling.
- [ ] **REQ-SHR-02**: `AnnouncementList` rendering a compact list of announcements with date badges and document-type indicators.
- [ ] **REQ-SHR-03**: `NewsCard` supporting responsive card styles, lazy-loaded images, and blur placeholders.
- [ ] **REQ-SHR-04**: `Breadcrumb` navigator to show current path hierarchy on all subpages.
- [ ] **REQ-SHR-05**: `StatusBadge` providing visual status representations (Received, In Progress, Resolved) with semantic icons and translated labels.
- [ ] **REQ-SHR-06**: `CategorySelect` grid picker mapping icons and labels for water, road, sanitation, streetlight, etc.
- [ ] **REQ-SHR-07**: `ConfirmationReceipt` component highlighting the newly created complaint identifier with a copy-to-clipboard trigger.

### Navigation Systems
- [ ] **REQ-NAV-01**: Expand `Header` component to display a persistent language toggle (Marathi/English) and font-size controls (A-/A/A+) across all breakpoints.
- [ ] **REQ-NAV-02**: Update `navbar.tsx` to handle the 6-group IA (Home, Services, About, Tenders, Documents, Contact) with hover/click dropdowns.
- [ ] **REQ-NAV-03**: Create `mobile-nav-drawer.tsx` supplying full navigation lists triggered via a hamburger button with a minimum 44x44px touch target.

### i18n & Marathi Translation
- [ ] **REQ-LAN-01**: Remove/Reassign `hi.json` (Hindi) and establish `mr.json` (Marathi) as the system default translation dictionary.
- [ ] **REQ-LAN-02**: Extract all hardcoded Marathi/English strings in components into the locale dictionary structures.
- [ ] **REQ-LAN-03**: Implement a lightweight translation hook (`useTranslation()`) or routing framework (`next-intl`) to toggle languages dynamically without full page reloads.

### Public Informational Pages
- [ ] **REQ-PAG-01**: Services Hub page (`(public)/services`) outlining available municipal services with login requirements clearly demarcated.
- [ ] **REQ-PAG-02**: About sub-pages (`(public)/about/*`) breaking down administration, mission, and FAQs into bite-sized components.
- [ ] **REQ-PAG-03**: Tenders page (`(public)/tenders`) rendering filterable, date-sorted tender lists.
- [ ] **REQ-PAG-04**: Documents index (`(public)/documents`) providing public access to RTS, RTI, and city plans.
- [ ] **REQ-PAG-05**: Contact directory (`(public)/contact`) containing structured office directories, hours, and an embedded map widget.

### Guest Complaint Flow & Security
- [ ] **REQ-SEC-01**: Guest mode for `ComplaintForm` capturing name and phone validation without profile dependencies.
- [ ] **REQ-SEC-02**: Expose a rate-limited lookup route supporting status queries by complaint ID or phone number.
- [ ] **REQ-SEC-03**: Update `firestore.rules` to allow write-only access for guest complaints matching schema constraints and prevent unauthorized read listings.
- [ ] **REQ-SEC-04**: Integrate lightweight CAPTCHA bot protection on the public form.

### Mobile & Performance
- [ ] **REQ-PER-01**: CSS fluid typography using `clamp()` so heading/body sizes scale smoothly between mobile min and desktop max without breakpoint jumps.
- [ ] **REQ-PER-02**: Integrate Lighthouse CI in GitHub workflows configured with throttled Slow 4G + mid-range Android hardware emulation profile.
- [ ] **REQ-PER-03**: All interactive elements have minimum 44x44px touch targets with adequate spacing; no hover-only functionality.
- [ ] **REQ-PER-04**: LCP target ≤ 2.5s on simulated Slow 3G/4G mobile; homepage total payload (excluding lazy-loaded images) ≤ 1.5MB.
- [ ] **REQ-PER-05**: Responsive images via `next/image` `srcset`/`sizes` — no oversized single image served to all device tiers.
- [ ] **REQ-PER-06**: Below-the-fold images, social embeds, and map widgets are lazy-loaded on all devices.
- [ ] **REQ-PER-07**: Explicit width/height or `aspect-ratio` CSS on image containers to prevent Cumulative Layout Shift (CLS) on slow connections.
- [ ] **REQ-PER-08**: CSS container queries (`@tailwindcss/container-queries`) applied to `ServiceCard`, `NewsCard`, and `AnnouncementListItem` for component-level responsiveness.

### Multi-Device Layout
- [ ] **REQ-DEV-01**: Single responsive codebase — no separate mobile subdomain or `m.` URL. Same URL, adaptive layout via CSS.
- [ ] **REQ-DEV-02**: Mobile-first CSS with breakpoints set at content-driven thresholds (~360–480px, ~600–767px, ~768–1023px, ~1024px+).
- [ ] **REQ-DEV-03**: Max content width capped (~1200–1280px) to prevent edge-to-edge text stretch on large monitors.
- [ ] **REQ-DEV-04**: Navigation collapses to drawer on mobile, expands to grouped horizontal menu on tablet/desktop.
- [ ] **REQ-DEV-05**: Forms use correct `inputmode`/`type` attributes (numeric keypad for mobile numbers, etc.) and do not shift layout when on-screen keyboard opens.
- [ ] **REQ-DEV-06**: Layouts verified in both portrait and landscape orientation on phone and tablet.

### Content Quality Gates
- [ ] **REQ-CON-01**: No placeholder text anywhere ("Name", "Title", "Description goes here").
- [ ] **REQ-CON-02**: No dead, `#`-only, or localhost/dev-URL links on any functional element.
- [ ] **REQ-CON-03**: All images have real, descriptive Marathi alt text; decorative images use `alt=""`.
- [ ] **REQ-CON-04**: No autoplay video anywhere on any page.
- [ ] **REQ-CON-05**: Announcements and news show date + title text — never image-only cards.
- [ ] **REQ-CON-06**: Social media sections render as embedded widgets or simple icon links — never raw plugin iFrame URLs as visible text.

---

## Out of Scope
- Modifying transactional officer dashboard operations or database structures.
- Implementing administrative role management dashboards.
- Real backend integration for tax/water payment gateways (link out to existing government portals as-is).
- Real authentication/login system changes (keep existing `(citizen)/(admin)/(officer)` groups intact).
- Actual RTI/RTS government workflow logic (link to existing dashboards).
- Multi-department admin CMS.

---

## Definition of Done
- [ ] All `(public)` route pages load without requiring authentication.
- [ ] Homepage service cards render above any politician/leadership photos in both DOM and visual order.
- [ ] Localization toggle shifts all text labels without full page reload; choice persists across sessions.
- [ ] `public/locales/mr.json` exists and is the default locale; `hi.json` removed or clearly reassigned.
- [ ] No component has hardcoded Marathi or English strings outside locale files.
- [ ] Guest complaint filing and tracking work without login and are rate-limited.
- [ ] `next/image` used for all content images; no raw `<img>` tags for photos/news/service icons.
- [ ] `@tailwindcss/container-queries` installed and applied on `ServiceCard`, `NewsCard`, `AnnouncementListItem`.
- [ ] Mobile nav drawer and desktop grouped nav both implement the 6-group IA.
- [ ] Lighthouse CI step added and passing on `(public)` pages under throttled mobile profile.
- [ ] Firestore rules updated for unauthenticated complaint-write path.
- [ ] All tap targets ≥ 44×44px; no hover-only critical functionality.
- [ ] Layouts stable in portrait and landscape on phone and tablet.
- [ ] LCP ≤ 2.5s on simulated Slow 4G + mid-range Android in Lighthouse.
