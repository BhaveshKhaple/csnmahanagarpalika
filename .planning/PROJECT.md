# Project: Smart Municipal Citizen Portal (CSMC) - Redesign

## Core Value
To deliver a redesigned, accessible, multi-device optimized, and guest-friendly citizen experience for Chhatrapati Sambhajinagar Municipal Corporation, removing login barriers for public information and basic interactions (like guest complaint filing and tracking).

---

## What This Is
The CSMC Citizen Portal is a Next.js 14 application integrated with Firebase services. This project introduces a new unauthenticated public route group `(public)` to host guest-accessible views (home, about, services, tenders, documents, contact, and guest complaints) while retaining the existing authenticated dashboard structure (`(citizen)`, `(officer)`, `(admin)`) for account-based features.

---

## Requirements

### Validated
- ✓ Next.js 14 App Router and TypeScript codebase structure
- ✓ Client-side Firebase Authentication wrapper (Email, Google, Phone/OTP)
- ✓ Firestore service layer with schema constraints and collection mappings
- ✓ Firebase Storage integrations with size/MIME-type validations
- ✓ Responsive grid UI components matching base municipal styling
- ✓ Centralized route management and utility configurations

### Active
- [ ] **PUB-01**: Unauthenticated `(public)` route group to bypass login requirements.
- [ ] **PUB-02**: Redesigned landing page (`(public)/page.tsx`) with accessible content layout.
- [ ] **PUB-03**: Interactive services hub displaying municipal services with clear auth labels.
- [ ] **PUB-04**: Shared, adaptive UI component primitives (cards, badges, select menus).
- [ ] **PUB-05**: Responsive header with instant language toggle and accessibility size controls.
- [ ] **PUB-06**: Mobile navigation drawer with 44x44px touch targets.
- [ ] **PUB-07**: Marathi translation dictionary and locale fallback configuration.
- [ ] **PUB-08**: Guest complaint submission form with Captcha protection.
- [ ] **PUB-09**: Guest complaint tracking using ID/phone number queries.
- [ ] **PUB-10**: Scoped Firestore rules and API rate limiting for public actions.
- [ ] **PUB-11**: Lighthouse CI automated audits for mobile performance budgets.

### Out of Scope
- Rebuilding the existing authenticated citizen dashboard logic.
- Implementing administrative GIS mapping features or department queues.
- Real billing settlement integrations (Razorpay remains client-side mock).

---

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| **Public Route Group `(public)`** | Citizen experience should be browse-first without requiring credentials for informational and basic tasks. | Approved |
| **Marathi Translation Focus** | The local community primarily consumes content in Marathi. Hindi locale is removed/reassigned. | Approved |
| **Component Coexistence** | Guest forms and authenticated forms share identical underlying logic with toggled props. | Approved |
| **Firestore Write Sandbox** | Unauthenticated writes to `complaints` must be sandboxed via rules and schema restrictions. | Approved |

---

## Evolution
This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason.
2. Requirements validated? → Move to Validated with phase reference.
3. New requirements emerged? → Add to Active.
4. Decisions to log? → Add to Key Decisions.
5. "What This Is" still accurate? → Update if drifted.

**After each milestone:**
1. Full review of all sections.
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state.

---
*Last updated: 2026-07-12 after initialization*
