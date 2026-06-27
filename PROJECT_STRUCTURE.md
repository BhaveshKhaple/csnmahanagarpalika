# Project Structure - Firebase Edition

## Complete Directory Layout

```
smart-municipal-portal/
│
├── src/                                # Next.js Application
│   ├── app/                           # Next.js 14 App Router
│   │   ├── (auth)/                   # Auth routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── verify-email/
│   │   │       └── page.tsx
│   │   ├── (citizen)/                # Citizen portal
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── property-tax/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── water-bills/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── certificates/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── birth/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── death/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── marriage/
│   │   │   │       └── page.tsx
│   │   │   ├── licenses/
│   │   │   │   ├── trade/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── building/
│   │   │   │       └── page.tsx
│   │   │   ├── complaints/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── track/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── payments/
│   │   │   │   └── page.tsx
│   │   │   ├── notifications/
│   │   │   │   └── page.tsx
│   │   │   ├── digital-locker/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── (admin)/                  # Admin portal
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── departments/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── reports/
│   │   │   │   └── page.tsx
│   │   │   ├── audit-logs/
│   │   │   │   └── page.tsx
│   │   │   ├── gis-map/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── (officer)/                # Officer portal
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── tasks/
│   │   │   │   └── page.tsx
│   │   │   └── complaints/
│   │   │       └── page.tsx
│   │   ├── api/                      # API Routes (Next.js API)
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   └── logout/
│   │   │   │       └── route.ts
│   │   │   ├── complaints/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── payments/
│   │   │   │   └── route.ts
│   │   │   ├── certificates/
│   │   │   │   └── route.ts
│   │   │   ├── ai/
│   │   │   │   ├── chatbot/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── classify/
│   │   │   │   │   └── route.ts
│   │   │   │   └── sentiment/
│   │   │   │       └── route.ts
│   │   │   └── webhooks/
│   │   │       └── payment/
│   │   │           └── route.ts
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── error.tsx                 # Error page
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                       # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── dropdown.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   └── loader.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── navbar.tsx
│   │   ├── forms/                    # Form components
│   │   │   ├── complaint-form.tsx
│   │   │   ├── certificate-form.tsx
│   │   │   ├── payment-form.tsx
│   │   │   └── profile-form.tsx
│   │   ├── dashboard/                # Dashboard widgets
│   │   │   ├── stats-card.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   └── chart-widget.tsx
│   │   ├── maps/                     # GIS components
│   │   │   ├── interactive-map.tsx
│   │   │   ├── complaint-markers.tsx
│   │   │   └── heatmap.tsx
│   │   ├── ai/                       # AI components
│   │   │   ├── chatbot.tsx
│   │   │   ├── voice-assistant.tsx
│   │   │   └── sentiment-widget.tsx
│   │   ├── charts/                   # Chart components
│   │   │   ├── line-chart.tsx
│   │   │   ├── bar-chart.tsx
│   │   │   ├── pie-chart.tsx
│   │   │   └── area-chart.tsx
│   │   └── shared/                   # Shared components
│   │       ├── file-upload.tsx
│   │       ├── date-picker.tsx
│   │       ├── pagination.tsx
│   │       ├── search-bar.tsx
│   │       └── data-table.tsx
│   │
│   ├── lib/                          # Core libraries
│   │   ├── firebase/                 # Firebase configuration
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   ├── firestore.ts
│   │   │   ├── storage.ts
│   │   │   ├── functions.ts
│   │   │   └── admin.ts              # Firebase Admin (server-side)
│   │   ├── utils/                    # Utility functions
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   ├── date.ts
│   │   │   ├── currency.ts
│   │   │   └── file.ts
│   │   ├── constants/                # Constants
│   │   │   ├── routes.ts
│   │   │   ├── roles.ts
│   │   │   └── status.ts
│   │   └── api-client.ts             # API client wrapper
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-firebase.ts
│   │   ├── use-toast.ts
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-media-query.ts
│   │   └── use-intersection-observer.ts
│   │
│   ├── store/                        # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── user-store.ts
│   │   ├── notification-store.ts
│   │   └── theme-store.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── user.ts
│   │   ├── complaint.ts
│   │   ├── payment.ts
│   │   ├── certificate.ts
│   │   ├── department.ts
│   │   └── api.ts
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── firebase/                         # Firebase backend
│   ├── functions/                    # Cloud Functions
│   │   ├── src/
│   │   │   ├── index.ts             # Main entry point
│   │   │   ├── auth/                # Auth functions
│   │   │   │   ├── onUserCreate.ts
│   │   │   │   ├── onUserDelete.ts
│   │   │   │   └── sendVerificationEmail.ts
│   │   │   ├── complaints/          # Complaint functions
│   │   │   │   ├── onComplaintCreate.ts
│   │   │   │   ├── assignComplaint.ts
│   │   │   │   └── notifyOfficer.ts
│   │   │   ├── payments/            # Payment functions
│   │   │   │   ├── processPayment.ts
│   │   │   │   ├── generateReceipt.ts
│   │   │   │   └── sendPaymentNotification.ts
│   │   │   ├── notifications/       # Notification functions
│   │   │   │   ├── sendEmail.ts
│   │   │   │   ├── sendSMS.ts
│   │   │   │   ├── sendPushNotification.ts
│   │   │   │   └── sendWhatsApp.ts
│   │   │   ├── ai/                  # AI functions
│   │   │   │   ├── classifyComplaint.ts
│   │   │   │   ├── analyzeSentiment.ts
│   │   │   │   ├── chatbot.ts
│   │   │   │   └── ocrDocument.ts
│   │   │   ├── analytics/           # Analytics functions
│   │   │   │   ├── generateReports.ts
│   │   │   │   └── calculateMetrics.ts
│   │   │   ├── scheduled/           # Scheduled functions
│   │   │   │   ├── dailyReports.ts
│   │   │   │   ├── overdueReminders.ts
│   │   │   │   └── cleanupOldData.ts
│   │   │   └── utils/               # Utility functions
│   │   │       ├── email-templates.ts
│   │   │       ├── validators.ts
│   │   │       └── helpers.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .eslintrc.js
│   │
│   ├── firestore.rules               # Firestore security rules
│   ├── firestore.indexes.json        # Firestore indexes
│   ├── storage.rules                 # Storage security rules
│   └── firebase.json                 # Firebase config
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero.png
│   │   └── illustrations/
│   ├── icons/
│   │   ├── favicon.ico
│   │   └── manifest-icons/
│   ├── fonts/
│   └── locales/
│       ├── en.json
│       └── hi.json
│
├── docs/                             # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── FIREBASE_SETUP.md
│   ├── USER_GUIDE.md
│   ├── DEVELOPER_GUIDE.md
│   ├── DEPLOYMENT.md
│   ├── SECURITY.md
│   └── TESTING.md
│
├── scripts/                          # Utility scripts
│   ├── setup-firebase.sh
│   ├── seed-data.js
│   ├── deploy.sh
│   └── backup-firestore.js
│
├── .github/                          # GitHub Actions
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       └── test.yml
│
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables
├── .eslintrc.json                    # ESLint config
├── .prettierrc                       # Prettier config
├── next.config.js                    # Next.js config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── package.json                      # Dependencies
├── .gitignore
├── LICENSE
├── CONTRIBUTING.md
└── README.md
```

## Firebase Architecture

### Firestore Collections Structure

```
users/
  {userId}/
    - email, name, phone, role, etc.
    - subcollections:
      - notifications/
      - documents/

departments/
  {departmentId}/
    - name, code, head, etc.
    - subcollections:
      - officers/

properties/
  {propertyId}/
    - owner, address, area, etc.
    - subcollections:
      - taxes/

waterConnections/
  {connectionId}/
    - user, property, status, etc.
    - subcollections:
      - bills/

certificates/
  - birth/
  - death/
  - marriage/

licenses/
  - trade/
  - building/

complaints/
  {complaintId}/
    - title, description, status, etc.
    - subcollections:
      - attachments/
      - statusHistory/
      - comments/

payments/
  {paymentId}/
    - amount, status, method, etc.

auditLogs/
  {logId}/
    - action, user, timestamp, etc.

aiLogs/
  - chatHistory/
  - classifications/
  - sentiments/
  - predictions/

gis/
  - assets/
  - layers/
  - zones/

systemSettings/
  {settingKey}/
    - value, description, etc.
```

### Firebase Services Used

1. **Firebase Authentication**
   - Email/Password authentication
   - Phone authentication
   - OAuth providers (Google, Facebook)
   - Custom claims for roles

2. **Cloud Firestore**
   - NoSQL document database
   - Real-time updates
   - Offline support
   - Security rules

3. **Cloud Storage**
   - File uploads (images, videos, documents)
   - Secure access with signed URLs
   - Automatic backup

4. **Cloud Functions**
   - Server-side logic
   - Event-driven triggers
   - Scheduled jobs
   - HTTP endpoints

5. **Firebase Hosting**
   - Static site hosting
   - CDN distribution
   - SSL certificates

6. **Firebase Cloud Messaging (FCM)**
   - Push notifications
   - Multi-device support

7. **Firebase Analytics**
   - User analytics
   - Event tracking

8. **Firebase Performance Monitoring**
   - Performance metrics
   - Network monitoring

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Maps**: Google Maps API / Leaflet
- **Icons**: Lucide React
- **Date/Time**: date-fns

### Backend
- **Platform**: Firebase
- **Runtime**: Node.js 20+
- **Cloud Functions**: TypeScript
- **Database**: Cloud Firestore
- **Storage**: Cloud Storage
- **Auth**: Firebase Authentication

### AI & ML
- **LLM**: OpenAI API (GPT-4)
- **Framework**: LangChain
- **OCR**: Tesseract.js / Google Vision API
- **Image Processing**: Sharp

### Payment Integration
- **Razorpay** (Primary)
- **Stripe** (Alternative)
- **PayU** (Alternative)

### Third-party Services
- **Maps**: Google Maps API
- **SMS**: Twilio / SNS
- **Email**: SendGrid / Resend
- **WhatsApp**: Twilio WhatsApp API

### Development Tools
- **Version Control**: Git / GitHub
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library
- **API Testing**: Postman

## Key Features by Role

### Citizen Features
- Property tax payment & history
- Water bill payment
- Digital certificates application
- Trade & building licenses
- Complaint registration with GPS & media
- Real-time complaint tracking
- Digital locker
- AI chatbot assistance
- Payment history & receipts

### Officer Features
- Assigned task management
- Complaint resolution
- Certificate verification
- License approval workflow
- Performance dashboard
- Mobile app access

### Admin Features
- User & department management
- Analytics & reporting
- GIS mapping dashboard
- AI insights
- Audit log access
- System configuration
- Role & permission management

## Security Features

- Firebase Authentication with MFA
- Firestore Security Rules
- Storage Security Rules
- HTTPS-only communication
- Rate limiting on Cloud Functions
- Input validation & sanitization
- XSS & CSRF protection
- Secure API keys management
- Audit logging
- Data encryption at rest

## Performance Optimizations

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization (Next.js Image)
- Code splitting & lazy loading
- Firebase query optimization
- CDN caching
- Service worker for offline support
- Progressive Web App (PWA)
