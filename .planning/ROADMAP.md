# Project Roadmap

## Milestone 1: Citizen Redesign & Public Services Hub

### Phase 1: Public Route Group and Homepage Rebuild
**Goal:** Create the unauthenticated routing group and implement the new mobile-first homepage.
**Mode:** mvp
**Success Criteria:**
1. Next.js App Router route group `(public)` is created and bypassed by authentication checks.
2. Public landing page at `(public)/page.tsx` renders without requiring login credentials.
3. Hero block uses compressed image formats and lazy-loads video content.
4. Landing layout matches DOM order requirements (ServiceCardGrid renders above public official banners).
**Mapped Requirements:**
- `REQ-PUB-01`
- `REQ-PUB-02`
- `REQ-PUB-03`
- `REQ-PUB-04`

---

### Phase 2: Shared Component Infrastructure
**Goal:** Build responsive and accessible UI primitives for layouts, cards, lists, and forms.
**Mode:** mvp
**Success Criteria:**
1. `ServiceCard` and `NewsCard` components adapt structurally utilizing container queries.
2. `AnnouncementList` presents latest alerts with proper date formatting and mime icons.
3. `StatusBadge` maps numeric status codes to readable Marathi text and icons.
4. `CategorySelect` and `ConfirmationReceipt` are fully functional and ready for form integrations.
**Mapped Requirements:**
- `REQ-SHR-01`
- `REQ-SHR-02`
- `REQ-SHR-03`
- `REQ-SHR-04`
- `REQ-SHR-05`
- `REQ-SHR-06`
- `REQ-SHR-07`

---

### Phase 3: Navigation Overhaul
**Goal:** Create accessible, multi-device header and navigation menus with font-size controls.
**Mode:** mvp
**Success Criteria:**
1. Persistent language toggle and font-size controls (A-/A/A+) are rendered on all breakpoints.
2. Grouped desktop navigation handles hover/click triggers for the 6-group municipal taxonomy.
3. Mobile hamburger menu triggers the nav drawer providing access to all service categories.
4. Touch target audits confirm a minimum 44x44px hit-box on all interactive nav items.
**Mapped Requirements:**
- `REQ-NAV-01`
- `REQ-NAV-02`
- `REQ-NAV-03`

---

### Phase 4: Internationalization and Marathi Migration
**Goal:** Setup translation context and replace Hindi (`hi.json`) with Marathi (`mr.json`) locale configuration.
**Mode:** mvp
**Success Criteria:**
1. `hi.json` is replaced with `mr.json`, and Marathi is initialized as the primary default language.
2. All hardcoded text strings in public pages and components are extracted to resource dictionaries.
3. Translation context hook toggles language variants instantly without full-page reloads.
4. No navigation links or layouts contain mixed English and Marathi text.
**Mapped Requirements:**
- `REQ-LAN-01`
- `REQ-LAN-02`
- `REQ-LAN-03`

---

### Phase 5: Public Informational Pages
**Goal:** Implement static and query-based informational pages for services, tenders, documents, and contact details.
**Mode:** mvp
**Success Criteria:**
1. Public services page presents a categorized grid of all municipal services.
2. Filterable, date-sorted tenders view lists active opportunities.
3. Structured directory lists department heads, office hours, and interactive Map widgets.
4. Document directory compiles RTS/RTI files for download.
**Mapped Requirements:**
- `REQ-PAG-01`
- `REQ-PAG-02`
- `REQ-PAG-03`
- `REQ-PAG-04`
- `REQ-PAG-05`

---

### Phase 6: Guest Complaint Integration and Security Sandbox
**Goal:** Build the guest-accessible complaint filing flow, configure public status lookups, and restrict Firestore writes.
**Mode:** mvp
**Success Criteria:**
1. `ComplaintForm` supports guest fields (name, phone) and submits without active user profiles.
2. Unauthenticated lookup returns complaint resolution status without exposing personal details.
3. Firestore rules allow create-only, schema-conforming writes to `complaints` without auth credentials.
4. Submission endpoint is rate-limited and secured with lightweight CAPTCHA bot protection.
**Mapped Requirements:**
- `REQ-SEC-01`
- `REQ-SEC-02`
- `REQ-SEC-03`
- `REQ-SEC-04`

---

### Phase 7: Accessibility and Multi-Device Audit
**Goal:** Execute accessibility checklist verification and enforce responsive layout adjustments.
**Mode:** mvp
**Success Criteria:**
1. Tailwind spacing and text styles scale fluidly using `clamp()` properties.
2. Responsive layout verification checks layout orientation changes across all pages.
3. Interactive elements are fully navigable via keyboards and have clear focus indicators.
4. Contrast verification validates that all visual text elements pass WCAG AA standards.
**Mapped Requirements:**
- `REQ-PER-01`
- `REQ-PER-03`

---

### Phase 8: Lighthouse CI Automation
**Goal:** Integrate automated performance audits to prevent regressions in mobile speed budgets.
**Mode:** mvp
**Success Criteria:**
1. Lighthouse CI actions are configured under `.github/workflows/ci.yml`.
2. Checks run audits using throttled mobile profiles (4G, mid-tier mobile hardware emulation).
3. Pull Request checks block merge branches if LCP/CLS metrics fall below performance budgets.
**Mapped Requirements:**
- `REQ-PER-02`
