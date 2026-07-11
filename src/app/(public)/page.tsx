import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/home/hero-section';
import AboutSection from '@/components/home/about-section';
import OnlineServicesSection from '@/components/home/online-services-section';
import OfficialsSection from '@/components/home/officials-section';
import NewsSection from '@/components/home/news-section';
import SocialMediaSection from '@/components/home/social-media-section';
import QuickLinksSection from '@/components/home/quick-links-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'छत्रपती संभाजीनगर महानगरपालिका (CSMC) — नागरी सेवा पोर्टल',
  description:
    'मालमत्ता कर, पाणीपट्टी, तक्रार नोंदणी, प्रमाणपत्रे आणि अधिक — घरबसल्या नागरी सेवा मिळवा.',
  openGraph: {
    title: 'छत्रपती संभाजीनगर महानगरपालिका',
    description: 'नागरी सेवा पोर्टल — Citizen Services Portal',
    type: 'website',
    locale: 'mr_IN',
  },
};

/**
 * Public homepage — src/app/(public)/page.tsx
 *
 * This page is served at the root URL `/` via the Next.js App Router
 * (public) route group. No authentication is required.
 *
 * DOM order (Phase 1 decision — CONTEXT.md):
 *   Header → Hero → About → Services → Officials → News → Social → QuickLinks → Footer
 *
 * The spec requires service cards to render ABOVE the officials/leadership
 * section. The AboutSection stays above services (user decision in discuss-phase).
 *
 * Phase-specific notes:
 * - HeroSection now uses next/image instead of CSS backgroundImage (T5).
 * - OnlineServicesSection now shows 6 primary cards with Marathi + English
 *   labels, points complaint cards to (public) routes, and shows lock icons
 *   for account-required services (T6).
 * - i18n extraction deferred to Phase 4.
 * - Navigation overhaul (6-group IA, mobile drawer) deferred to Phase 3.
 */
export default function PublicHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow" id="main-content">
        {/* Skip-to-content target for keyboard/screen-reader users */}
        <HeroSection />
        <AboutSection />
        {/*
          OnlineServicesSection renders ABOVE OfficialsSection.
          This satisfies spec: "service cards must appear before
          politician photos" (csmc-website-redesign-spec.md §5.1).
        */}
        <OnlineServicesSection />
        <OfficialsSection />
        <NewsSection />
        <SocialMediaSection />
        <QuickLinksSection />
      </main>

      <Footer />
    </div>
  );
}
