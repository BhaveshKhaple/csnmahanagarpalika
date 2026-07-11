# Technology Stack

> Mapped: 2026-07-12

## Languages & Runtime

| Language | Version | Usage |
|----------|---------|-------|
| TypeScript | ^5.4.0 | Primary language for all frontend code |
| JavaScript | ES2020 target | Cloud Functions backend |
| CSS | Tailwind 3.4 + PostCSS | Styling via utility-first framework |

- **Runtime:** Node.js >=20.0.0 (enforced in `package.json` engines)
- **Package Manager:** npm >=10.0.0

## Frontend Framework

- **Next.js 14** (App Router) — `csnmahanagarpalika/next.config.js`
  - React Strict Mode enabled
  - SWC minification
  - Image optimization with allowed domains: `chhsambhajinagarmc.org`, `firebasestorage.googleapis.com`, `lh3.googleusercontent.com`
  - Console removal in production (`compiler.removeConsole`)
  - Custom webpack config to ignore Windows system directories

- **React 18.3.1** — Client components use `'use client'` directive
- **TypeScript** — Strict mode enabled in `tsconfig.json`

## Styling

- **Tailwind CSS 3.4** — `csnmahanagarpalika/tailwind.config.ts`
  - Dark mode: `class` strategy
  - Plugins: `@tailwindcss/forms`, `@tailwindcss/typography`
  - Custom color palettes: `primary` (red), `secondary` (blue), `accent` (orange), `csmc` (brand colors)
  - Custom fonts: Inter + Noto Sans Devanagari (for Marathi)
  - Custom animations: fade-in, slide-up/down/left/right, scale-in, bounce-slow
- **clsx + tailwind-merge** — via `cn()` utility at `src/lib/utils/cn.ts`
- **CSS Variables** — HSL-based design tokens in `src/app/globals.css` (light + dark themes)

## State Management

- **Zustand ^4.5.2** — Client-side state management (declared dependency, stores not yet found in `src/store/`)
- **React Context** — `src/contexts/AuthContext.tsx` for auth state
- **TanStack Query ^5.28.0** — Server state management (declared dependency)

## UI Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Framer Motion | ^11.0.0 | Animations and transitions |
| Lucide React | ^0.358.0 | Icon library |
| React Hot Toast | ^2.4.1 | Toast notifications |
| Sonner | ^1.4.0 | Toast notifications (alternative) |
| React Dropzone | ^14.2.0 | File upload drag-and-drop |
| React Hook Form | ^7.51.0 | Form handling |
| @hookform/resolvers | ^3.3.0 | Form validation resolvers |
| Zod | ^3.22.0 | Schema validation |
| Recharts | ^2.12.0 | Charts and data visualization |
| date-fns | ^3.6.0 | Date formatting |
| Axios | ^1.6.0 | HTTP client |
| Sharp | ^0.33.0 | Image processing (server-side) |

## Backend / BaaS

- **Firebase ^10.11.0** (Client SDK) — `src/lib/firebase/config.ts`
  - Authentication (Email, Google, Phone/OTP)
  - Cloud Firestore (document database)
  - Cloud Storage (file uploads)
  - Analytics
- **Firebase Admin ^12.1.0** — Server-side SDK for API routes
- **Cloud Functions** — Node.js, v2 API, `functions/index.js` (scaffold only, maxInstances=10)

## Build & Dev Tools

| Tool | Version | Config File |
|------|---------|-------------|
| ESLint | ^8.57.0 | `csnmahanagarpalika/.eslintrc.json` |
| Prettier | ^3.2.0 | `csnmahanagarpalika/.prettierrc` |
| Jest | ^29.7.0 | Referenced in package.json scripts |
| PostCSS | ^8.4.0 | `csnmahanagarpalika/postcss.config.js` |
| Firebase CLI | ^13.6.0 | Development dependency |

## Path Aliases (tsconfig.json)

```
@/*          → ./src/*
@/components → ./src/components/*
@/lib        → ./src/lib/*
@/hooks      → ./src/hooks/*
@/types      → ./src/types/*
@/store      → ./src/store/*
@/utils      → ./src/lib/utils/*
```

## Key Configuration Files

| File | Purpose |
|------|---------|
| `csnmahanagarpalika/next.config.js` | Next.js configuration |
| `csnmahanagarpalika/tailwind.config.ts` | Tailwind CSS configuration |
| `csnmahanagarpalika/tsconfig.json` | TypeScript compiler options |
| `csnmahanagarpalika/firebase.json` | Firebase services configuration |
| `csnmahanagarpalika/.env.example` | Environment variables template |
| `csnmahanagarpalika/.env.local` | Local environment variables (gitignored) |
| `csnmahanagarpalika/middleware.ts` | Next.js middleware for locale handling |
