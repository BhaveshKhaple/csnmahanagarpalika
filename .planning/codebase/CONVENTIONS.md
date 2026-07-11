# Coding Conventions

> Mapped: 2026-07-12

## Core Styling & Components

- **Tailwind CSS Utility Classes:** CSS classes are specified inline using Tailwind utility classes. For combining dynamic classes, use the `cn()` utility from `@/lib/utils/cn` (which relies on `clsx` and `tailwind-merge` under the hood).
- **Client vs Server Components:** Next.js 14 App Router rules apply. Components that involve user interaction, state (hooks like `useState`, `useEffect`), or context consumption must use the `'use client'` directive at the very top of the file.
- **Component File Structure:**
  - Component declarations should use standard React Functional Component syntax (`export default function MyComponent()`).
  - Group imports in order: React core/hooks, Next.js components, third-party libraries/icons, local components (`@/components`), local utilities/constants/types (`@/lib`, `@/types`).
  - Custom types and interfaces should be declared in `src/types/index.ts` if shared globally, or at the top of the file if local to the component.

---

## Language & Accessibility

- **Default Language:** The default user interface language is Marathi (`mr`), with Noto Sans Devanagari as the primary typeface.
- **Semantic HTML:** Ensure correct accessibility (WCAG 2.2 AA) by using semantic layout elements (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`, `<article>`).
- **Focus Indicators:** Interactive elements should automatically apply focus states via globals (focus outline/ring classes defined in `globals.css`).
- **Aria Attributes:** Interactive components like mobile menus must include screen reader attributes like `aria-label`, `aria-expanded`, and `aria-hidden`.

---

## State Management & Client Data Fetching

- **Context-based Authentication:** To access user authentication and profile data, use the `useAuth()` custom hook from `src/contexts/AuthContext`. Never read the auth state directly from the SDK singleton inside component bodies.
- **Static Configurations:** Configuration metadata arrays (e.g. navigation trees, option selector values) should be declared outside the component function block to prevent unnecessary re-creation on render.

---

## Type Safety & Form Validation

- **No Implicit Any:** Codebase is strictly typed. Avoid `any` types wherever possible. Use custom types defined in `src/types/index.ts`.
- **Forms & Inputs:** Use `react-hook-form` coupled with `zod` schemas for form validation (e.g., standardizing input formats for Mobile/Aadhar numbers to `XXXX-XXXX-XXXX`).
- **Routing:** Use path aliases and the centralized `ROUTES` enum from `@/lib/constants/routes` for navigation instead of hardcoding raw strings.
- **Clean Code:** Avoid leaving debug comments, commented-out dead code blocks, or active `console.log` statements in source files (console commands are configured to be auto-removed in production builds via `next.config.js`).
