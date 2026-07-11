# Directory Structure

> Mapped: 2026-07-12

## High-Level Layout

The repository is structured with the main Next.js web application inside `csnmahanagarpalika/`, Firebase configuration files at the root, and Firebase Cloud Functions in the `functions/` directory.

```
c:\Users\yadne\Downloads\CSMC\
├── csnmahanagarpalika/         # Next.js 14 Frontend Application
│   ├── public/                 # Static assets (images, logos)
│   ├── src/                    # App source code
│   │   ├── app/                # App Router (pages and layouts)
│   │   ├── components/         # Reusable React components
│   │   ├── contexts/           # React context providers
│   │   ├── lib/                # Shared logic and configurations
│   │   └── types/              # TypeScript interfaces
│   ├── package.json            # NPM dependencies & scripts
│   ├── tailwind.config.ts      # Styling design system config
│   └── tsconfig.json           # TypeScript configuration
├── functions/                  # Cloud Functions Backend (Node.js)
│   ├── index.js                # Core Cloud Functions entry point
│   └── package.json            # Node.js dependencies for Cloud Functions
├── firestore.rules             # Database security policies
└── storage.rules               # Storage security policies
```

---

## Detailed Directory Map

### 1. `csnmahanagarpalika/src/app` (Next.js Routing)

Follows Next.js 14 App Router conventions. Key subdirectories include:

*   **Public/Common Pages:**
    *   `page.tsx` — Public landing page (HomePage).
    *   `layout.tsx` — App root layout, includes fonts (`Noto Sans Devanagari` and `Inter`) and global Toast notifications configuration.
    *   `globals.css` — Tailored styling system containing CSS variables and custom animations.
    *   `login/` — User authentication portal (Login/Register/OTP).
    *   `assistant/` — Voice and text-based AI assistant dashboard.
    *   `about/`, `contact/`, `faq/`, `news/`, `rti/`, `services/` — General public information portals.

*   **`citizen/` (Citizen Portal Area):**
    *   `page.tsx` — Dashboard landing page with overview stats.
    *   `dashboard/page.tsx` — Main interactive dashboard for managing taxes, certificates, and utilities.
    *   `complaints/` — Filing new complaints and tracking active issue statuses.
        *   `new/` — Multi-step ticket generation form with media upload support.
        *   `track/` — Status timelines and historical records.
    *   `certificates/` — Apply for legal documents.
        *   `birth/`, `death/`, `marriage/` — Specific registrar application workflows.
    *   `licenses/` — Enterprise license requests.
        *   `trade/`, `building/` — Corporate request forms.
    *   `property-tax/` — Property registration, billing invoice view, and payments.
    *   `water-bills/` — Active connection ledger and billing invoices.
    *   `digital-locker/` — Secure container for citizen documents.
    *   `payments/` — Invoice settlement portal.
    *   `notifications/` — Citizen alert logs.

*   **`officer/` (Municipal Staff Portal Area):**
    *   `page.tsx` — Staff entry page.
    *   `dashboard/` — Pending queue overview, assignment statistics, SLA alerts.
    *   `tasks/` / `complaints/` — Complaint triage and resolution processing forms.

*   **`admin/` (Administrative Portal Area):**
    *   `page.tsx` — Administrator gate.
    *   `dashboard/` — System health and resource telemetry graphs.
    *   `users/` — Identity provider roles management (RBAC panel).
    *   `departments/` — Department hierarchy and staff assignments.
    *   `audit-logs/` — Immutable audit records logs.
    *   `gis-map/` — Visual complaint heatmap (Google Maps).
    *   `analytics/`, `reports/`, `settings/` — Config metrics.

---

### 2. `csnmahanagarpalika/src/components` (Reusable UI Elements)

Modular visual blocks partitioned into four groups:

*   **`ui/` (Design Tokens):**
    *   `button.tsx` — Standard buttons with standard hover and loading animation states.
    *   `card.tsx` — Basic surface container.
*   **`layout/` (Structure):**
    *   `header.tsx` — Navigation bar supporting localized language toggles (EN / HI / MR).
    *   `footer.tsx` — Legal disclosures, public links, and emergency helpline indices.
*   **`home/` (Landing Blocks):**
    *   `hero-section.tsx` — Landing banner using dynamic auto-cycling image sliders.
    *   `about-section.tsx` / `online-services-section.tsx` / `news-section.tsx` — Informational landing sections.
*   **`pages/` (Shell wrappers):**
    *   `page-shell.tsx` — Universal layout templates wrapping internal views.

---

### 3. `csnmahanagarpalika/src/lib` (Core Infrastructure)

*   **`firebase/` (BaaS services):**
    *   `config.ts` — Firebase API singleton initializer.
    *   `auth.ts` — Handlers for credential registers, OAuth, and custom claims lookup.
    *   `firestore.ts` — Custom queries and transactions.
    *   `storage.ts` — File upload helpers with sizing checks.
*   **`constants/`:**
    *   `routes.ts` — Typed dictionary of all system paths (`ROUTES.HOME`, `ROUTES.CITIZEN.DASHBOARD`, etc.).
*   **`utils/`:**
    *   `cn.ts` — Combines dynamic classes (`clsx` & `tailwind-merge`).

---

### 4. `functions/` (Cloud Functions)

*   `index.js` — Serverless entry point containing v2 HTTPS request triggers.
*   `package.json` — Independent package.json mapping external Node APIs (e.g. firebase-functions, logger).
