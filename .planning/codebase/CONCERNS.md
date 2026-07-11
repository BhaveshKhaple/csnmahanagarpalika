# Architectural & Implementation Concerns

> Mapped: 2026-07-12

## 1. Static/Hardcoded Localization

### Description
Next.js middleware is configured to handle locale redirects for English, Hindi, and Marathi (`/en`, `/hi`, `/mr`), and the routing tree supports a dynamic `[locale]` segment. However:
- All page and component contents (e.g. `src/components/home/about-section.tsx`, `src/app/citizen/page.tsx`) have hardcoded Marathi strings.
- There is no dynamic localization setup (like `next-intl`, `react-i18next`, or localized dictionary files) implemented in the codebase.
- Selecting alternative languages currently leaves the UI fully in Marathi.

### Impact
The portal cannot function as a truly multi-lingual application for citizens until an i18n translation system is set up and hardcoded strings are moved to dictionary files.

---

## 2. Empty Firestore Indexes

### Description
The configuration file `firestore.indexes.json` contains no defined indexes.
- Dashboard queries, filtering operations (such as query queries in `getUserComplaints`, `getUserApplications`, `getUserBills` in `src/lib/firebase/firestore.ts`), and auditing listings require compound and sorted queries.

### Impact
Under real deployment, Firestore queries sorting by timestamp alongside where constraints (e.g. fetching only the current user's "assigned" complaints sorted by `createdAt`) will throw runtime errors due to missing composite indexes.

---

## 3. Empty Custom Test Coverage

### Description
Jest is declared in the runtime dependencies and setup commands are present in `package.json`. However, no test suites are present for custom components, contexts, or services.

### Impact
Any future updates to auth flows, payment interfaces, or certificate logic carry a high regression risk since there are no automated unit or integration tests to assert correct behavior.

---

## 4. Unimplemented External Service Integrations

### Description
Environment variables exist for Sentry, Twilio, Razorpay, OpenAI, and Google Maps, but the codebase does not yet contain client or server handlers to call these APIs.
- GIS Mapping routes exist in the admin zone, but no API interfaces are wired up to populate Map layers.
- Payment triggers (`payments` pages) lack actual Razorpay script initialization.
- Notification triggers lack Twilio or SendGrid backend handlers.

### Impact
These core features are currently "mocked" or stubbed on the client side, requiring significant API implementation work in subsequent phases.
