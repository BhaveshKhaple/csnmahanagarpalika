# External Integrations

> Mapped: 2026-07-12

## Firebase (Google Cloud Platform)

The application is built entirely on Firebase as its Backend-as-a-Service (BaaS).

### Firebase Authentication
- **Config:** `src/lib/firebase/auth.ts`
- **Methods supported:**
  - Email/Password signup and signin
  - Google OAuth (popup flow via `GoogleAuthProvider`)
  - Phone/OTP authentication (with reCAPTCHA verification)
  - Password reset via email
- **User document creation:** On signup/OAuth, a Firestore document is created in `users/{uid}` with role defaulting to `'citizen'`
- **Roles:** `citizen`, `officer`, `admin`, `superadmin`

### Cloud Firestore
- **Config:** `src/lib/firebase/firestore.ts`
- **Collections:**
  - `users` — User profiles with roles and metadata
  - `complaints` — Citizen complaints with GPS, attachments
  - `applications` — Certificate and license applications
  - `bills` — Utility bills (property tax, water)
  - `payments` — Payment transaction records
  - `notifications` — User notifications
  - `properties` — Property records
  - `waterConnections` — Water connection records
  - `news` — Public news/announcements (public read)
  - `officials` — Municipal officials (public read)
  - `departments` — Department info (public read)
  - `settings` — System settings (public read)
  - `auditLogs` — Immutable audit trail (create-only, admin read)
- **Security Rules:** `csnmahanagarpalika/firestore.rules` — Role-based access with helper functions `isAuthenticated()`, `isOwner()`, `isAdmin()`, `isOfficer()`
- **Indexes:** `firestore.indexes.json` — Currently empty (no composite indexes defined)
- **Generic CRUD:** `createDocument`, `getDocument`, `updateDocument`, `deleteDocument`, `getAllDocuments`, `queryDocuments` with full pagination support

### Cloud Storage
- **Config:** `src/lib/firebase/storage.ts`
- **Storage paths:**
  - `users/{userId}/` — Profile photos (10MB limit, images only)
  - `complaints/{userId}/{complaintId}/` — Complaint images/videos (50MB limit)
  - `applications/{userId}/{applicationId}/` — Application documents (PDF, images, 10MB limit)
  - `properties/{userId}/{propertyId}/` — Property documents
  - `public/` — News images, official photos (admin only)
  - `temp/{userId}/` — Temporary uploads (50MB limit)
- **Features:** Resumable uploads with progress tracking, multi-file upload, file type/size validation
- **Security Rules:** `csnmahanagarpalika/storage.rules` — Content-type and size validation

### Firebase Analytics
- Browser-only initialization in `src/lib/firebase/config.ts`
- Measurement ID via `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Firebase Emulators
- **Config:** `csnmahanagarpalika/firebase.json`
- Auth: port 9099
- Functions: port 5001
- Firestore: port 8080
- Storage: port 9199
- Hosting: port 5000
- Emulator UI: port 4000

## External APIs (Configured but Not Yet Implemented)

These are defined in `.env.example` but no implementation code was found:

| Service | Env Variable | Purpose |
|---------|-------------|---------|
| **Google Maps API** | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | GIS mapping, complaint location |
| **OpenAI API** | `OPENAI_API_KEY` | AI chatbot, NLP features |
| **Razorpay** | `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Payment gateway |
| **Twilio (SMS)** | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` | SMS notifications |
| **Twilio (WhatsApp)** | `TWILIO_WHATSAPP_NUMBER` | WhatsApp notifications |
| **SendGrid** | `SENDGRID_API_KEY` | Email notifications |
| **Sentry** | `SENTRY_DSN` | Error monitoring |
| **Google Analytics** | `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | Web analytics |

## Hosting & Deployment

- **Firebase Hosting** — Static export to `out/` directory
  - SPA rewrite: all routes → `/index.html`
  - Cache headers: 1-year immutable for images, CSS, JS
  - Security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy
- **Image Domains:** `chhsambhajinagarmc.org`, `firebasestorage.googleapis.com`, `lh3.googleusercontent.com`

## Fonts (External)

- **Google Fonts:**
  - Inter (via `next/font/google`)
  - Noto Sans Devanagari (via `<link>` tag in `src/app/layout.tsx`)
