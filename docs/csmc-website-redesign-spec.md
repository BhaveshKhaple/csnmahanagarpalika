# CSMC Website Redesign — Build Specification

**Project:** Redesign of Chhatrapati Sambhajinagar Municipal Corporation (CSMC) public website
**Reference (current live site):** https://chhsambhajinagarmc.org/
**Purpose of this doc:** Give an AI coding agent full context to build a working prototype (HTML/CSS/JS or React) that fixes the identified UX/UI flaws, optimized for a Marathi-speaking, low-to-semi-technical, low-bandwidth citizen audience.

---

## 1. Project Context

CSMC is a municipal corporation website serving citizens of a tier-2 Indian city. Most users:
- Read Marathi first, English second (some are semi-literate in English, a portion semi-literate overall).
- Access the site primarily on **budget Android phones over mobile data**, not desktop broadband.
- Visit the site for a **small number of concrete tasks**: pay property tax, pay water bill, file a complaint, check complaint status, find a certificate/document, check tender/recruitment notices.
- Are not comfortable with cluttered navigation, jargon, or ambiguous icons/buttons.

The current site fails on: broken/placeholder content, inconsistent domains, opaque URLs, a flat 15+ item navigation menu, heavy hero video, task-critical links buried as plain text, no icons, poor accessibility, and a dated visual style (hit counters, blinking GIFs). Full audit available on request — this doc focuses only on what to build.

---

## 2. Goals (in priority order)

1. A first-time, non-technical Marathi-reading user can find and start "pay tax" or "file complaint" in **under 10 seconds** on mobile.
2. Fast load on 3G/weak 4G (target: interactive under 3 seconds on a mid-range Android device).
3. Clean, consistent navigation with human-readable URLs and no more than 6-7 top-level categories.
4. Full Marathi/English consistency — no mixed-language menu items.
5. Accessible: proper alt text, scalable font, adequate contrast, large tap targets (min 44x44px).
6. No placeholder/broken content, no dead links, no dev URLs.

---

## 3. Target Audience & Design Constraints

- **Primary persona:** Marathi-reading citizen, 30-60 years old, moderate smartphone literacy, using a budget Android phone, intermittent mobile data.
- **Secondary persona:** Younger, more tech-comfortable citizen checking tenders/recruitment or downloading a form on desktop.
- **Design implication:** Default to icon + short Marathi label for every action. Never rely on text alone for primary actions. Avoid dense paragraphs; use short lines and bullet-style structure. Avoid infinite scroll; use clear pagination or "load more."

---

## 4. Information Architecture (target nav structure)

Replace the current flat 15+ item menu with these **6 top-level groups**. Every nav label must have both Marathi (primary, larger) and English (secondary, smaller) shown together — not a toggle that hides one.

1. **मुख्यपृष्ठ (Home)**
2. **नागरी सेवा (Citizen Services)** — the most important group, should also be surfaced as homepage cards
   - मालमत्ता कर भरा (Pay Property Tax)
   - पाणीपट्टी भरा (Pay Water Bill)
   - तक्रार नोंदवा (File a Complaint)
   - तक्रारीची स्थिती तपासा (Track Complaint Status)
   - जन्म/मृत्यू दाखला (Birth/Death Certificate)
   - गुंठेवारी कॅल्क्युलेटर (Gunthewari Calculator)
3. **महानगरपालिकेविषयी (About CSMC)** — overview, vision/mission, elected officials list, FAQs, emergency plan
4. **निविदा व भरती (Tenders & Recruitment)** — merge all tender + recruitment + interview-list pages here, sorted by date, newest first, with open/closed status tags
5. **कागदपत्रे व माहिती (Documents & Information)** — RTI, RTS, census, DP plan, ward/department lists, hospital/police/fire station lists, water policy draft
6. **संपर्क (Contact)** — HQ contact, emergency contact, feedback form, map

Footer keeps: site map, privacy policy, disclaimer, social links (real embeds, not raw URLs), app download badges (deduplicated — one row, shown once), visitor stats (optional, de-emphasized, not a giant heading).

**URL requirement:** Every page must have a clean, readable slug — e.g. `/services/property-tax`, `/services/complaint/new`, `/about/mission`, `/tenders`. No opaque hash-based URLs.

---

## 5. Page-by-Page Feature Specs

### 5.1 Homepage

**Above the fold (mobile-first):**
- Slim header: CSMC logo + name (Marathi), font-size controls (A- A A+), language toggle, search icon.
- Hero: a **static, compressed hero image** (not autoplay 4K video) with a one-line welcome message. If video is required, it must be muted, lazy-loaded, and have a static poster image fallback for slow connections, with an explicit play button — never autoplay.
- **"नागरी सेवा" service cards grid**: 4-6 large tappable cards, each with a simple icon, short Marathi label, and English subtitle. These must appear before any politician photos or news carousel. Example cards:
  - 🧾 मालमत्ता कर भरा / Pay Property Tax
  - 💧 पाणीपट्टी भरा / Pay Water Bill
  - 📢 तक्रार नोंदवा / File Complaint
  - 🔍 तक्रार स्थिती / Track Complaint
  - 📄 दाखला मिळवा / Get Certificate
  - 📋 सर्व सेवा / All Services

**Below the fold:**
- Short "आपल्या महानगरपालिकेविषयी" (About) block — 2-3 lines max, with a "अधिक वाचा" (read more) link, not a wall of text.
- Announcements ("घोषणा") as a clean, scannable list — max 5 shown, each with a date, short title, and a document-type icon (PDF/link). "View all announcements" link instead of dumping everything on the homepage. Remove blinking GIF icons; use a small "नवीन" (New) badge instead if something is under 7 days old.
- News & updates: cards with **image + headline text + date** (never image-only). Lazy-load images with low-res placeholder blur-up for slow connections.
- Elected officials / leadership section: keep, but move below services and news — not the first thing seen. Compact grid, not full-width carousel.
- Social media: real embedded widgets (or simple "Follow us" icon links if embeds hurt performance) — never raw plugin URLs as visible text.
- App download section: **one row, shown once** (currently repeated 2-3 times on the page).
- Footer: contact info, address with an embedded map, office hours, RTI/RTS links, sitemap, policies.

**Explicitly remove:**
- Hit counter as a prominent element (may keep as small footer text only).
- Duplicate app badge rows.
- Placeholder/test content blocks.
- Any hardcoded localhost or dev URLs.

---

### 5.2 Citizen Services Hub (`/services`)

- Single hub page listing all citizen-facing transactional services as a card grid (same visual pattern as homepage cards, larger here).
- Each card links to either an internal form/flow or an external payment portal, but the site must clearly indicate "बाह्य संकेतस्थळ उघडेल" (opens external site) when leaving the CSMC domain, with a small icon.
- Complaint filing and complaint tracking should be **adjacent on this page**, not scattered across different site sections.

### 5.3 Complaint Flow (`/services/complaint`)

Minimum viable flow for the prototype:
1. Landing: two clear buttons — "नवीन तक्रार नोंदवा" (New Complaint) / "स्थिती तपासा" (Check Status).
2. New complaint form: category dropdown (with icons: पाणी/water, रस्ता/road, स्वच्छता/sanitation, दिवाबत्ती/streetlight, इतर/other), short description field, optional photo upload, mobile number, ward/area selector.
3. On submit: show a **complaint ID** clearly, with instructions in Marathi on how to check status later, and an option to save/screenshot it.
4. Status check: single field (complaint ID or mobile number) → status result (Received / In Progress / Resolved) with plain-language explanation, not just a status code.

### 5.4 Tenders & Recruitment (`/tenders`)

- Single merged, filterable list (Tenders / Recruitment / Interview Lists) sorted newest-first.
- Each entry: title (Marathi), publish date, closing date if applicable, status tag (चालू/Open or बंद/Closed), and a direct PDF download link.
- Search/filter by keyword and by category.
- No dead or duplicate entries — validate all links before shipping.

### 5.5 About Section (`/about/*`)

- Break the current single dense pages into short, scannable sub-pages: Overview, Vision & Mission, Elected Officials, FAQs, Emergency Plan.
- FAQs as an accordion (expand/collapse), not a long scroll of Q&A.

### 5.6 Contact (`/contact`)

- HQ address, phone, email, office hours clearly listed as structured data (not just embedded in a paragraph).
- Embedded map (not just a text address).
- Emergency contacts (fire, disaster management) visually separated/highlighted since they're urgent-use.
- Feedback form: short, mobile-friendly, clear success confirmation message in Marathi.

---

## 6. UI/Component Requirements

- **Design system**: Define a small set of reusable components — Header, Footer, ServiceCard, AnnouncementListItem, NewsCard, Accordion, Button (primary/secondary), FormField, StatusBadge, Breadcrumb.
- **Breadcrumbs** on every page except homepage (e.g., मुख्यपृष्ठ > नागरी सेवा > मालमत्ता कर).
- **Buttons/CTAs**: minimum 44x44px tap target, icon + label, high-contrast fill color for primary actions (e.g., pay/file/submit).
- **Typography**: Marathi text must use a well-hinted Devanagari web font (e.g., Noto Sans Devanagari) at a base size no smaller than 16px on mobile. Support the existing font-size increase/decrease control site-wide (persist choice in local storage).
- **Color & contrast**: meet WCAG AA contrast minimum (4.5:1 for body text). Avoid pure decorative color-only status indicators — always pair color with text/icon (e.g., not just a green dot for "resolved," but green dot + "निकाली" text).
- **Icons**: consistent icon set across all service cards and nav items — simple, universally recognizable (rupee symbol, water drop, megaphone, document, phone).
- **Images**: all images require descriptive Marathi alt text (not "..."). Lazy-load below-the-fold images. Serve responsive/compressed sizes for mobile.
- **No autoplay video** anywhere by default.

---

## 7. Performance Requirements

- Target Largest Contentful Paint under 2.5s on simulated Slow 3G / mid-range Android (Lighthouse mobile).
- Total homepage payload (excluding lazy-loaded images) under ~1.5MB.
- Lazy-load all below-the-fold images and embeds (social widgets, maps).
- Use a single consistent domain for all CSMC pages/assets in the prototype (avoid the current split across chhsambhajinagarmc.org / aurangabadmahapalika.org / aurangabadsmartcity.in).
- All internal links must resolve — no hash-only placeholder links (`href="#"`) on anything meant to be functional; use `<button>` or disabled state with a "Coming soon" label instead.

---

## 8. Multi-Device Optimization Requirements

The audience spans budget Android phones (majority of traffic), a smaller share of iPhones, tablets/desktops used by office staff and more tech-comfortable citizens, and public kiosk-style desktop terminals that may exist at ward offices. The site must work correctly and feel native on all of these — not just "not broken," but genuinely usable — and should support a citizen starting a task on one device and finishing on another (e.g., start a tax payment on mobile at a shop counter, complete it later on a desktop at home).

### 8.1 Approach
- **Mobile-first, single responsive codebase** — do not build or maintain separate mobile/desktop versions. One codebase, one URL per page, adapting via CSS.
- Design and build the mobile layout first, then progressively enhance for tablet and desktop, rather than shrinking a desktop design down.
- Set breakpoints where the **content itself starts to break**, not just at standard device widths. Common reference points to start from: ~360-480px (small phones), ~600-767px (large phones/small tablets), ~768-1023px (tablets), ~1024px+ (desktop) — but adjust per component based on actual testing.
- Use **CSS Grid + Flexbox** for page-level layout, and **CSS container queries** for reusable components (ServiceCard, NewsCard, AnnouncementListItem) so they reflow correctly regardless of which part of the page they're placed in (e.g., a ServiceCard should look right whether it's in a 2-column mobile grid or a 4-column desktop grid).
- Use **relative/fluid units** (%, rem, vw/vh, clamp()) instead of fixed pixel widths for layout containers and typography. Cap max content width on large desktop screens (e.g., ~1200-1280px) so text doesn't stretch edge-to-edge on big monitors.

### 8.2 Typography & Media Across Devices
- Use `clamp()` for headings and body text so font size scales smoothly between a mobile minimum and a desktop maximum, instead of jumping abruptly at breakpoints.
- Maintain the site-wide font-size control (A-/A/A+) consistently across all breakpoints and persist the user's choice.
- Serve **responsive images** via `srcset`/`sizes` (or Next/Image-equivalent) so a phone downloads a small image and a desktop downloads a larger one — never ship one oversized image to all devices.
- Any video (if used at all, per Section 6's no-autoplay rule) should have device-appropriate source sizes and must never auto-load a large file on mobile data.

### 8.3 Touch, Input & Interaction
- All tap targets minimum 44x44px with adequate spacing, regardless of device.
- Support both touch and mouse/keyboard interaction patterns on the same components — no hover-only functionality (many low-end Android/touch users have no equivalent to "hover").
- Forms must work well with on-screen keyboards: correct `inputmode`/`type` attributes (numeric keypad for mobile numbers, etc.), no tiny form fields, no layout shift when the keyboard opens.
- Navigation should collapse to a drawer/hamburger with large tap targets on mobile, and expand to a visible horizontal/grouped menu on tablet and desktop — avoid deeply nested menus requiring many taps on any device.

### 8.4 Performance Across Device Tiers
- Treat performance as part of "multi-device," not separate: a mid-range/low-end Android phone on 3G/weak 4G is the **primary performance target**, not an edge case.
- Set a performance budget and test against it: target Largest Contentful Paint under ~2.5s and minimal Cumulative Layout Shift on a simulated low-end Android + Slow 4G profile (Lighthouse mobile settings).
- Avoid shipping desktop-weight assets (large hero images/video, heavy embeds) to mobile — lazy-load below-the-fold content and non-critical widgets (maps, social embeds) on all devices, but especially mobile.
- Reserve space for images/ads/embeds up front (explicit width/height or aspect-ratio CSS) to prevent layout shift as content loads — this matters more on slower connections where content pops in at different times.

### 8.5 Testing Matrix
Test on real devices wherever possible, not emulators alone — emulators don't reliably catch touch behavior, font rendering, or real network conditions.
- **Minimum device/browser test set:**
  - A real mid-range/budget Android phone (most representative of the primary audience) — Chrome
  - A real iPhone — Safari
  - An Android tablet or iPad — Chrome/Safari
  - Desktop — Chrome, and at least one more browser (Edge or Firefox)
- **Minimum network conditions to test:** Fast connection (baseline), Slow 4G, and Slow 3G (throttled via Chrome DevTools/Lighthouse) — the last one matters most for this audience.
- **Orientation:** verify both portrait and landscape on phone and tablet — form fields and modals should not break in landscape.
- **Tools:** Chrome DevTools device mode + Lighthouse for fast iteration; a real-device cloud service (e.g., BrowserStack) or physical devices for final verification before each release.

### 8.6 Cross-Device Continuity
- Where a task can reasonably span devices (e.g., filling a complaint form), avoid designs that trap progress in one device's local state only — at minimum, give the user a reference ID/receipt they can use to resume or check status from a different device.
- Keep URLs and page structure identical across devices (same responsive page, not separate `m.` mobile subdomain) so a link shared from a phone opens correctly on a desktop and vice versa.

---

## 9. Accessibility Requirements

- All interactive elements keyboard-navigable and screen-reader labeled.
- Font-size control (A-/A/A+) functional site-wide, not decorative.
- Alt text required on all content images (empty/decorative images use `alt=""`).
- Sufficient color contrast (WCAG AA).
- Forms: every input has a visible label (not placeholder-only text), clear error messages in Marathi.

---

## 10. Content & Language Guidelines

- Every page/component must be built with **both** Marathi and English content variables from the start (i18n-ready), even if only Marathi is launched first. Do not hardcode mixed-language strings.
- Marathi copy should use plain, everyday bureaucratic Marathi — avoid overly formal/archaic phrasing where a simpler word exists.
- Never show English-only labels inside a Marathi-selected view (fix the current inconsistency, e.g. "CSMC महत्वाचे पोर्टल").
- Dates in Marathi numerals or clearly formatted DD-MM-YYYY, consistent site-wide.

---

## 11. Suggested Tech Stack (prototype scope)

- **Frontend:** React (or plain HTML/CSS/JS if a static prototype is preferred) with a component structure matching Section 6.
- **Styling:** Utility-first CSS (Tailwind) for fast iteration and consistent spacing/contrast.
- **Data:** Mock/static JSON for services, announcements, news, tenders — structured so it can later be swapped for a real CMS/API.
- **i18n:** Simple key-based translation object for Marathi/English strings, not per-page duplication.
- **Icons:** lucide-react or an equivalent open icon set, supplemented with custom simple civic icons if needed (rupee, water drop, megaphone, document, siren).

---

## 12. Acceptance Checklist (for the AI agent to self-verify before calling it done)

- [ ] Homepage shows service cards (with icons + Marathi/English labels) above any politician photos or hero video.
- [ ] No autoplay video anywhere.
- [ ] No placeholder text ("Name," "Title," "Description goes here") anywhere.
- [ ] No dead, `#`-only, or localhost links.
- [ ] Navigation has 6-7 top-level groups max, each with clean readable URLs.
- [ ] Complaint filing and complaint status check are on the same/adjacent page.
- [ ] All images have real Marathi alt text.
- [ ] Font-size control works across the whole site.
- [ ] Contrast passes WCAG AA on all primary buttons and body text.
- [ ] Mobile Lighthouse performance score reasonable (no huge unoptimized media on first load).
- [ ] No mixed-language nav labels within a single selected language mode.
- [ ] Announcements/news show date + text, not image-only cards.
- [ ] Social media sections render as embedded widgets/icons, not raw plugin URLs as text.
- [ ] Layout verified on a real (or emulated) budget Android phone, iPhone, tablet, and desktop — no horizontal scrolling, overlapping elements, or broken layouts on any of them.
- [ ] Tap targets are minimum 44x44px on touch devices; no hover-only functionality.
- [ ] Images use srcset/responsive sizing so mobile does not download desktop-sized assets.
- [ ] Layout tested and stable in both portrait and landscape orientation on phone/tablet.
- [ ] Performance verified under simulated Slow 3G/4G on a low-end device profile, not just on a fast desktop connection.

---

## 13. Out of Scope for Prototype

- Real backend integration for tax/water payment gateways (link out to existing government payment portals as-is).
- Real authentication/login system.
- Actual RTI/RTS government workflow logic (link to existing dashboards).
- Multi-department admin CMS (can be mocked with static JSON for prototype purposes).
