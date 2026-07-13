'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Home, Menu, PhoneCall, Search, X, Lock } from 'lucide-react';

import { useTranslation, Locale } from '@/lib/i18n/LanguageContext';
import { ROUTES } from '@/lib/constants/routes';

type NavItem = {
  labelKey: string;
  href: string;
  descKey?: string;
  requiresLogin?: boolean;
};

type NavGroup = {
  labelKey: string;
  href?: string;
  items?: NavItem[];
};

// 6-Group Information Architecture definitions using translation keys
const navGroups: NavGroup[] = [
  {
    labelKey: 'nav.home',
    href: ROUTES.PUBLIC.HOME,
  },
  {
    labelKey: 'nav.services',
    href: ROUTES.PUBLIC.SERVICES.BASE,
    items: [
      { labelKey: 'home.services.all_services', href: ROUTES.PUBLIC.SERVICES.BASE, descKey: 'home.services.all_services_desc' },
      { labelKey: 'home.services.tax', href: ROUTES.CITIZEN.PROPERTY_TAX, descKey: 'home.services.tax_desc', requiresLogin: true },
      { labelKey: 'home.services.water', href: ROUTES.CITIZEN.WATER_BILLS, descKey: 'home.services.water_desc', requiresLogin: true },
      { labelKey: 'common.guest_complaint', href: ROUTES.PUBLIC.COMPLAINTS.NEW, descKey: 'home.services.complaint_desc' },
      { labelKey: 'common.track_complaint', href: ROUTES.PUBLIC.COMPLAINTS.TRACK, descKey: 'home.services.track_desc' },
      { labelKey: 'home.services.certificates', href: ROUTES.CITIZEN.CERTIFICATES.BASE, descKey: 'home.services.certificates_desc', requiresLogin: true },
    ],
  },
  {
    labelKey: 'nav.about',
    href: ROUTES.PUBLIC.ABOUT.BASE,
    items: [
      { labelKey: 'home.about.about_csmc', href: ROUTES.PUBLIC.ABOUT.BASE, descKey: 'home.about.about_desc' },
      { labelKey: 'home.about.mission', href: ROUTES.PUBLIC.ABOUT.MISSION, descKey: 'home.about.mission_desc' },
      { labelKey: 'home.about.officials', href: ROUTES.PUBLIC.ABOUT.OFFICIALS, descKey: 'home.about.officials_desc' },
      { labelKey: 'home.about.emergency', href: ROUTES.PUBLIC.ABOUT.EMERGENCY_PLAN, descKey: 'home.about.emergency_desc' },
      { labelKey: 'home.about.faqs', href: ROUTES.PUBLIC.ABOUT.FAQS, descKey: 'home.about.faqs_desc' },
    ],
  },
  {
    labelKey: 'nav.tenders',
    href: ROUTES.PUBLIC.TENDERS,
  },
  {
    labelKey: 'nav.documents',
    href: ROUTES.PUBLIC.DOCUMENTS,
  },
  {
    labelKey: 'nav.contact',
    href: ROUTES.PUBLIC.CONTACT,
  },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = React.useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = React.useState<'small' | 'normal' | 'large'>('normal');
  
  const desktopNavRef = React.useRef<HTMLDivElement | null>(null);
  // Timer ref for debounced menu close — prevents gap between button & panel from flickering
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  // Get locale, setLocale and translator from i18n Context
  const { locale, setLocale, t } = useTranslation();

  // Apply font size stylesheet rule on root element
  const applyFontSize = (size: 'small' | 'normal' | 'large') => {
    if (typeof window === 'undefined') return;
    if (size === 'small') {
      document.documentElement.style.fontSize = '90%';
    } else if (size === 'large') {
      document.documentElement.style.fontSize = '110%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
  };

  React.useEffect(() => {
    const saved = localStorage.getItem('csmc-font-size') as 'small' | 'normal' | 'large';
    if (saved) {
      setFontSize(saved);
      applyFontSize(saved);
    }
  }, []);

  const changeFontSize = (size: 'small' | 'normal' | 'large') => {
    setFontSize(size);
    localStorage.setItem('csmc-font-size', size);
    applyFontSize(size);
  };

  const toggleLanguage = () => {
    setLocale(locale === 'mr' ? 'en' : 'mr');
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSections({});
  };

  React.useEffect(() => {
    if (!isMobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    setOpenDesktopMenu(null);
    setIsMobileMenuOpen(false);
    setOpenMobileSections({});
  }, [pathname]);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!desktopNavRef.current) return;
      if (!desktopNavRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/' && pathname !== '/') return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.href && isActiveLink(group.href)) return true;
    if (group.items) {
      return group.items.some((item) => isActiveLink(item.href));
    }
    return false;
  };

  const toggleMobileSection = (labelKey: string) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [labelKey]: !prev[labelKey],
    }));
  };

  return (
    <>
      {/* Keyboard Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:m-2 focus:bg-amber-600 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        {locale === 'mr' ? 'मुख्य मजकुराकडे जा (Skip to Content)' : 'Skip to main content'}
      </a>

      <header className="sticky top-0 z-50 border-b border-zinc-700 bg-zinc-900 text-zinc-100 shadow-lg backdrop-blur-md">
        {/* Top bar — Helpline, Language, Font Controls */}
        <div className="border-b border-zinc-800 bg-zinc-950/90">
          <div className="container-custom flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
            <div className="flex min-w-0 items-center gap-3 text-zinc-200">
              <PhoneCall className="h-3.5 w-3.5 text-amber-300 flex-shrink-0" />
              <span className="truncate">
                {t('nav.helpline')}: 1800-000-000 | {locale === 'mr' ? 'सोमवार-शनिवार, 10am-6pm' : 'Mon-Sat, 10am-6pm'}
              </span>
            </div>
            
            {/* Font & Language Controls — Visible on every breakpoint */}
            <div className="flex items-center gap-3.5 select-none shrink-0">
              {/* Font controls (A- / A / A+) */}
              <div className="flex items-center border border-zinc-700 rounded-md overflow-hidden bg-zinc-900">
                <button
                  type="button"
                  onClick={() => changeFontSize('small')}
                  className={`px-2 py-0.5 text-xs transition border-r border-zinc-700 min-w-[28px] ${fontSize === 'small' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                  aria-label="फॉन्ट आकार कमी करा (Font size small)"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => changeFontSize('normal')}
                  className={`px-2 py-0.5 text-xs transition border-r border-zinc-700 min-w-[28px] ${fontSize === 'normal' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                  aria-label="फॉन्ट आकार सामान्य ठेवा (Font size normal)"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => changeFontSize('large')}
                  className={`px-2 py-0.5 text-xs transition min-w-[28px] ${fontSize === 'large' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                  aria-label="फॉन्ट आकार वाढवा (Font size large)"
                >
                  A+
                </button>
              </div>

              <span className="text-zinc-700" aria-hidden>|</span>

              {/* Language switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
                aria-label={locale === 'mr' ? 'Switch to English' : 'मराठीत भाषा बदला'}
              >
                {locale === 'mr' ? 'English' : 'मराठी'}
              </button>
            </div>
          </div>
        </div>

        {/* Branding & Action buttons (Login, Guest complaint) */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
          <div className="container-custom flex items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <Link href={ROUTES.PUBLIC.HOME} className="block text-sm font-semibold text-white sm:text-base hover:text-amber-400 transition-colors">
                {t('home.hero.title')}
              </Link>
              <p className="hidden text-xs text-zinc-300 sm:block">{t('home.hero.subtitle')}</p>
            </div>

            {/* CTAs next to login */}
            <div className="flex items-center gap-2.5">
              {/* Public guest complaint CTA */}
              <Link
                href={ROUTES.PUBLIC.COMPLAINTS.NEW}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3.5 py-1.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700 hover:text-white hover:border-zinc-500 min-h-[40px]"
              >
                {t('common.guest_complaint')}
              </Link>

              <Link
                href={ROUTES.PUBLIC.SERVICES.BASE}
                className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white min-h-[40px]"
              >
                <Search className="h-4 w-4" />
                {t('nav.search')}
              </Link>

              <Link
                href={ROUTES.LOGIN}
                className="inline-flex items-center justify-center rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 shadow-md min-h-[38px] px-3.5 text-sm shrink-0"
              >
                {t('common.login')}
              </Link>

              {/* Mobile Drawer Trigger — Min 44x44px target (REQ-PER-03) */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 p-2.5 text-zinc-100 lg:hidden min-h-[44px] min-w-[44px] hover:bg-zinc-800 transition"
                aria-label={t('nav.menu')}
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5.5 w-5.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 6-Group Navigation Bar (Desktop) */}
        <div className="border-t border-zinc-800 bg-zinc-900/95 shadow-inner">
          <div ref={desktopNavRef} className="container-custom hidden items-center justify-between gap-4 py-1 lg:flex">
            <nav className="flex min-w-0 flex-1 items-center gap-1">
              {navGroups.map((group) => {
                const hasSubItems = Boolean(group.items && group.items.length > 0);
                const active = isGroupActive(group);

                if (!hasSubItems) {
                  return (
                    <Link
                      key={group.labelKey}
                      href={group.href!}
                      className={`inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                        active
                          ? 'bg-amber-600/10 text-amber-400 font-semibold'
                          : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {group.labelKey === 'nav.home' ? (
                        <Home className="h-4 w-4 shrink-0" aria-label={t('nav.home')} />
                      ) : (
                        t(group.labelKey)
                      )}
                    </Link>
                  );
                }

                const isMenuOpen = openDesktopMenu === group.labelKey;

                return (
                  <div
                    key={group.labelKey}
                    className="relative"
                    onMouseEnter={() => {
                      // Cancel any pending close and open this menu
                      if (closeTimer.current) clearTimeout(closeTimer.current);
                      setOpenDesktopMenu(group.labelKey);
                    }}
                    onMouseLeave={() => {
                      // Debounce close so mouse can travel across the gap to the panel
                      closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 120);
                    }}
                  >
                    <button
                      type="button"
                      className={`group inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                        active || isMenuOpen
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                      }`}
                      aria-expanded={isMenuOpen}
                      onClick={() => {
                        if (closeTimer.current) clearTimeout(closeTimer.current);
                        setOpenDesktopMenu((prev) => (prev === group.labelKey ? null : group.labelKey));
                      }}
                    >
                      <span>{t(group.labelKey)}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-zinc-200' : 'text-zinc-400 group-hover:text-zinc-200'}`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div
                        className="absolute left-0 top-full w-[34rem] z-50"
                        onMouseEnter={() => {
                          // Mouse entered the panel — cancel any pending close
                          if (closeTimer.current) clearTimeout(closeTimer.current);
                        }}
                        onMouseLeave={() => {
                          closeTimer.current = setTimeout(() => setOpenDesktopMenu(null), 120);
                        }}
                      >
                        {/* Transparent bridge that fills the gap so mouse never "leaves" the zone */}
                        <div className="h-2 w-full" />
                        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl animate-fade-in">
                          <div className="grid grid-cols-2 gap-2">
                            {group.items?.map((item) => (
                              <Link
                                key={item.labelKey}
                                href={item.href}
                                className={`rounded-lg border p-3 transition flex flex-col justify-between ${
                                  isActiveLink(item.href)
                                    ? 'border-amber-500 bg-zinc-800/80 text-white'
                                    : 'border-zinc-800 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/50'
                                }`}
                              >
                                <div>
                                  <span className="flex items-center gap-1.5 text-sm font-medium">
                                    {t(item.labelKey)}
                                    {item.requiresLogin && (
                                      <Lock size={10} className="text-amber-400" aria-label={locale === 'mr' ? 'लॉगिन आवश्यक' : 'Login Required'} />
                                    )}
                                  </span>
                                  {item.descKey && (
                                    <p className="mt-1 text-xs text-zinc-400 leading-normal">{t(item.descKey)}</p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            aria-label="Close mobile menu overlay"
            onClick={closeMenu}
          />

          {/* Drawer Body */}
          <aside
            className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-zinc-900 text-zinc-100 shadow-2xl transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase">CSMC Menu</p>
                <p className="text-sm text-zinc-300">{t('nav.menu')}</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-zinc-800 p-2.5 text-zinc-200 min-h-[44px] min-w-[44px] hover:bg-zinc-800 transition"
                aria-label={t('nav.close')}
                onClick={closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav content */}
            <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
              <div className="space-y-2">
                <Link
                  href={ROUTES.PUBLIC.COMPLAINTS.NEW}
                  className="block rounded-lg bg-orange-600 py-3 text-center font-bold text-white transition hover:bg-orange-500 shadow"
                  onClick={closeMenu}
                >
                  {t('common.guest_complaint')}
                </Link>
                <Link
                  href={ROUTES.LOGIN}
                  className="block rounded-lg bg-amber-600 py-3 text-center font-bold text-white transition hover:bg-amber-500 shadow"
                  onClick={closeMenu}
                >
                  {t('common.login')}
                </Link>
              </div>

              {/* IA groups list */}
              <div className="space-y-2.5 pt-2">
                {navGroups.map((group) => {
                  const hasSubItems = Boolean(group.items && group.items.length > 0);
                  if (!hasSubItems) {
                    return (
                      <Link
                        key={group.labelKey}
                        href={group.href!}
                        className={`flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-3 text-sm font-medium ${
                          isActiveLink(group.href!)
                            ? 'bg-zinc-800 text-amber-400 border-zinc-700'
                            : 'text-zinc-200'
                        }`}
                        onClick={closeMenu}
                      >
                        {group.labelKey === 'nav.home' ? (
                          <>
                            <Home className="h-4 w-4 text-zinc-400" />
                            <span>{t('nav.home')}</span>
                          </>
                        ) : (
                          t(group.labelKey)
                        )}
                      </Link>
                    );
                  }

                  const isSectionOpen = Boolean(openMobileSections[group.labelKey]);

                  return (
                    <div key={group.labelKey} className="rounded-lg border border-zinc-800 bg-zinc-950/20">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-zinc-100 hover:bg-zinc-800/40"
                        onClick={() => toggleMobileSection(group.labelKey)}
                        aria-expanded={isSectionOpen}
                      >
                        <span>{t(group.labelKey)}</span>
                        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isSectionOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isSectionOpen && (
                        <div className="space-y-1 border-t border-zinc-800 bg-zinc-900/40 px-2 py-2">
                          {group.items?.map((item) => (
                            <Link
                              key={item.labelKey}
                              href={item.href}
                              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition ${
                                isActiveLink(item.href)
                                  ? 'bg-zinc-800 text-white font-medium'
                                  : 'text-zinc-300 hover:bg-zinc-800/60'
                              }`}
                              onClick={closeMenu}
                            >
                              <span className="flex items-center gap-1.5">
                                {t(item.labelKey)}
                                {item.requiresLogin && (
                                  <Lock size={10} className="text-amber-400" aria-label={locale === 'mr' ? 'लॉगिन आवश्यक' : 'Login Required'} />
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          </aside>
        </div>
      </header>
    </>
  );
}
