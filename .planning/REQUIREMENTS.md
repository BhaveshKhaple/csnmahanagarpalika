# Requirements Specifications

## User Stories

### 1. Unauthenticated Browsing
- **As a** guest citizen visiting the site,
- **I want to** read announcements, view active tenders, look up department contacts, and search for municipal services without logging in,
- **So that** I can get the information I need instantly without friction.

### 2. Guest Transaction
- **As a** citizen without a registered account,
- **I want to** file a civic complaint and track its resolution progress using a temporary reference identifier or phone lookup,
- **So that** I can report issues in my neighborhood without having to complete a signup flow.

### 3. Accessible & Multilingual UI
- **As a** Marathi-speaking resident on a low-end mobile device,
- **I want** the website to load instantly, display clearly in Marathi, and have large, readable text size controls,
- **So that** I can comfortably navigate and utilize the services over my mobile data connection.

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

### Mobile & Performance Audits
- [ ] **REQ-PER-01**: CSS scaling using `clamp()` fluid sizing for container sizes and text elements.
- [ ] **REQ-PER-02**: Integrate Lighthouse CI in GitHub workflows configured with throttled 4G mobile settings.
- [ ] **REQ-PER-03**: Establish minimum 44x44px target sizing audits for buttons and inputs.

---

## Out of Scope
- Modifying transactional officer dashboard operations or database structures.
- Implementing administrative role management dashboards.
- Dynamic calculations or database integrations for property listings.

---

## Definition of Done
- All public route pages load without requiring user authentication.
- Localization toggle shifts all text labels instantly.
- Forms validate input constraints before submission.
- Mobile layout passes target-size validation on responsive audits.
- Automated verifications and security rules checks compile without errors.
