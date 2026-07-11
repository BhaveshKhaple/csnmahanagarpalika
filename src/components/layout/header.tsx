'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bell, ChevronDown, Home, Menu, PhoneCall, Search, X, Lock } from 'lucide-react';

import { ROUTES } from '@/lib/constants/routes';

type NavItem = {
  label: string;
  href: string;
  description?: string;
  requiresLogin?: boolean;
};

type NavGroup = {
  label: string;
  href?: string;
  items?: NavItem[];
};

// 6-Group Information Architecture definitions (csmc-adaptation-instructions.md §1 & §4)
const navGroups: NavGroup[] = [
  {
    label: 'मुख्यपृष्ठ',
    href: ROUTES.PUBLIC.HOME,
  },
  {
    label: 'नागरी सेवा',
    href: ROUTES.PUBLIC.SERVICES.BASE,
    items: [
      { label: 'सर्व सेवा सूची', href: ROUTES.PUBLIC.SERVICES.BASE, description: 'सर्व उपलब्ध नागरी सेवांची एकत्रित यादी' },
      { label: 'मालमत्ता कर भरा', href: ROUTES.CITIZEN.PROPERTY_TAX, description: 'मालमत्ता कर भरणा व पावती शोध', requiresLogin: true },
      { label: 'पाणीपट्टी बिल भरा', href: ROUTES.CITIZEN.WATER_BILLS, description: 'पाणीपट्टी बिल तपासणी व पेमेंट', requiresLogin: true },
      { label: 'तक्रार नोंदवा (अतिथी)', href: ROUTES.PUBLIC.COMPLAINTS.NEW, description: 'लॉगिनशिवाय नवीन तक्रार नोंदणी' },
      { label: 'तक्रार स्थिती तपासा', href: ROUTES.PUBLIC.COMPLAINTS.TRACK, description: 'नोंदवलेल्या तक्रारीचा मागोवा' },
      { label: 'प्रमाणपत्र सेवा', href: ROUTES.CITIZEN.CERTIFICATES.BASE, description: 'जन्म, मृत्यू आणि विवाह दाखले', requiresLogin: true },
    ],
  },
  {
    label: 'महानगरपालिकेविषयी',
    href: ROUTES.PUBLIC.ABOUT.BASE,
    items: [
      { label: 'संस्थेबद्दल', href: ROUTES.PUBLIC.ABOUT.BASE, description: 'महानगरपालिकेची पार्श्वभूमी व इतिहास' },
      { label: 'दृष्टी व ध्येय', href: ROUTES.PUBLIC.ABOUT.MISSION, description: 'स्मार्ट सिटी दृष्टी आणि ध्येय' },
      { label: 'निवडून आलेले प्रतिनिधी', href: ROUTES.PUBLIC.ABOUT.OFFICIALS, description: 'महापौर, आयुक्त व पदाधिकारी सूची' },
      { label: 'आपत्कालीन योजना', href: ROUTES.PUBLIC.ABOUT.EMERGENCY_PLAN, description: 'आपत्ती व्यवस्थापन व मदत कक्ष' },
      { label: 'वारंवार विचारले जाणारे प्रश्न', href: ROUTES.PUBLIC.ABOUT.FAQS, description: 'नागरिकांच्या सामान्य शंकांचे निरसन' },
    ],
  },
  {
    label: 'निविदा व भरती',
    href: ROUTES.PUBLIC.TENDERS,
  },
  {
    label: 'कागदपत्रे व माहिती',
    href: ROUTES.PUBLIC.DOCUMENTS,
  },
  {
    label: 'संपर्क',
    href: ROUTES.PUBLIC.CONTACT,
  },
];

const quickActionLinks = [
  { label: 'तक्रार नोंदवा (अतिथी)', href: ROUTES.PUBLIC.COMPLAINTS.NEW },
  { label: 'तक्रार स्थिती तपासा', href: ROUTES.PUBLIC.COMPLAINTS.TRACK },
  { label: 'मालमत्ता कर भरा', href: ROUTES.CITIZEN.PROPERTY_TAX },
  { label: 'पाणीपट्टी बिल', href: ROUTES.CITIZEN.WATER_BILLS },
  { label: 'सर्व सेवा सूची', href: ROUTES.PUBLIC.SERVICES.BASE },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = React.useState<Record<string, boolean>>({});
  const [fontSize, setFontSize] = React.useState<'small' | 'normal' | 'large'>('normal');
  
  const desktopNavRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Determine current locale from pathname
  const currentLocale = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/hi') ? 'hi' : 'mr';

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

  // Toggle locale using Next.js routing and existing middleware compatibility
  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'mr' ? 'en' : 'mr';
    const isEn = pathname.startsWith('/en');
    const isHi = pathname.startsWith('/hi');
    const isMr = pathname.startsWith('/mr');

    let newPathname = pathname;
    if (isEn) {
      newPathname = pathname.replace(/^\/en/, nextLocale === 'mr' ? '' : '/en');
    } else if (isHi) {
      newPathname = pathname.replace(/^\/hi/, nextLocale === 'mr' ? '' : '/hi');
    } else if (isMr) {
      newPathname = pathname.replace(/^\/mr/, nextLocale === 'mr' ? '' : '/mr');
    } else {
      newPathname = nextLocale === 'mr' ? pathname : `/en${pathname}`;
    }

    if (newPathname === '') newPathname = '/';
    router.push(newPathname);
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

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      {/* Keyboard Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:m-2 focus:bg-amber-600 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg focus:font-bold focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
      >
        मुख्य मजकुराकडे जा (Skip to Content)
      </a>

      <header className="sticky top-0 z-50 border-b border-zinc-700 bg-zinc-900 text-zinc-100 shadow-lg backdrop-blur-md">
        {/* Top bar — Helpline, Language, Font Controls */}
        <div className="border-b border-zinc-800 bg-zinc-950/90">
          <div className="container-custom flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
            <div className="flex min-w-0 items-center gap-3 text-zinc-200">
              <PhoneCall className="h-3.5 w-3.5 text-amber-300 flex-shrink-0" />
              <span className="truncate">हेल्पलाइन: 1800-000-000 | सोमवार-शनिवार, 10am-6pm</span>
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
                aria-label={currentLocale === 'mr' ? 'Switch to English' : 'मराठीत भाषा बदला'}
              >
                {currentLocale === 'mr' ? 'English' : 'मराठी'}
              </button>
            </div>
          </div>
        </div>

        {/* Branding & Action buttons (Login, Guest complaint) */}
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
          <div className="container-custom flex items-center justify-between gap-4 py-3">
            <div className="min-w-0">
              <Link href={ROUTES.PUBLIC.HOME} className="block text-sm font-semibold text-white sm:text-base hover:text-amber-400 transition-colors">
                छत्रपती संभाजीनगर महानगरपालिका
              </Link>
              <p className="hidden text-xs text-zinc-300 sm:block">स्मार्ट नागरी सेवा पोर्टल (CSMC)</p>
            </div>

            {/* CTAs next to login */}
            <div className="flex items-center gap-2.5">
              {/* Public guest complaint CTA */}
              <Link
                href={ROUTES.PUBLIC.COMPLAINTS.NEW}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3.5 py-1.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700 hover:text-white hover:border-zinc-500 min-h-[40px]"
              >
                તકરાર नोंदवा (अतिथी)
              </Link>

              <Link
                href={ROUTES.SERVICES}
                className="hidden lg:inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white min-h-[40px]"
              >
                <Search className="h-4 w-4" />
                सेवा शोधा
              </Link>

              <Link
                href={ROUTES.LOGIN}
                className="inline-flex items-center justify-center rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-all duration-200 shadow-md min-h-[38px] px-3.5 text-sm shrink-0"
              >
                नागरिक लॉगिन
              </Link>

              {/* Mobile Drawer Trigger — Min 44x44px target (REQ-PER-03) */}
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-700 p-2.5 text-zinc-100 lg:hidden min-h-[44px] min-w-[44px] hover:bg-zinc-800 transition"
                aria-label="Open mobile navigation menu"
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
                      key={group.label}
                      href={group.href!}
                      className={`inline-flex items-center rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                        active
                          ? 'bg-amber-600/10 text-amber-400 font-semibold'
                          : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      {group.label === 'मुख्यपृष्ठ' ? (
                        <Home className="h-4 w-4 shrink-0" aria-label="मुख्यपृष्ठ" />
                      ) : (
                        group.label
                      )}
                    </Link>
                  );
                }

                const isMenuOpen = openDesktopMenu === group.label;

                return (
                  <div
                    key={group.label}
                    className="relative"
                    onMouseEnter={() => setOpenDesktopMenu(group.label)}
                    onMouseLeave={() => setOpenDesktopMenu(null)}
                  >
                    <button
                      type="button"
                      className={`group inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                        active || isMenuOpen
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-200 hover:bg-zinc-800 hover:text-white'
                      }`}
                      aria-expanded={isMenuOpen}
                      onClick={() => setOpenDesktopMenu((prev) => (prev === group.label ? null : group.label))}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180 text-zinc-200' : 'text-zinc-400 group-hover:text-zinc-200'}`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute left-0 top-full mt-1.5 w-[34rem] rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl animate-fade-in z-50">
                        <div className="grid grid-cols-2 gap-2">
                          {group.items?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={`rounded-lg border p-3 transition flex flex-col justify-between ${
                                isActiveLink(item.href)
                                  ? 'border-amber-500 bg-zinc-800/80 text-white'
                                  : 'border-zinc-800 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-800/50'
                              }`}
                            >
                              <div>
                                <span className="flex items-center gap-1.5 text-sm font-medium">
                                  {item.label}
                                  {item.requiresLogin && (
                                    <Lock size={10} className="text-amber-400" aria-label="लॉगिन आवश्यक" />
                                  )}
                                </span>
                                {item.description && (
                                  <p className="mt-1 text-xs text-zinc-400 leading-normal">{item.description}</p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Quick actions ticker bar (desktop/tablet) */}
        <div className="hidden border-t border-zinc-800 bg-zinc-950/50 lg:block">
          <div className="container-custom flex items-center gap-2 overflow-x-auto py-2">
            {quickActionLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap rounded-md border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-amber-500 hover:bg-zinc-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
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
                <p className="text-sm text-zinc-300">नागरी सेवा नेव्हिगेशन</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-zinc-800 p-2.5 text-zinc-200 min-h-[44px] min-w-[44px] hover:bg-zinc-800 transition"
                aria-label="Close mobile menu"
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
                  तक्रार नोंदवा (लॉगिनशिवाय)
                </Link>
                <Link
                  href={ROUTES.LOGIN}
                  className="block rounded-lg bg-amber-600 py-3 text-center font-bold text-white transition hover:bg-amber-500 shadow"
                  onClick={closeMenu}
                >
                  नागरिक लॉगिन
                </Link>
              </div>

              {/* IA groups list */}
              <div className="space-y-2.5 pt-2">
                {navGroups.map((group) => {
                  const hasSubItems = Boolean(group.items && group.items.length > 0);
                  if (!hasSubItems) {
                    return (
                      <Link
                        key={group.label}
                        href={group.href!}
                        className={`flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-3 text-sm font-medium ${
                          isActiveLink(group.href!)
                            ? 'bg-zinc-800 text-amber-400 border-zinc-700'
                            : 'text-zinc-200'
                        }`}
                        onClick={closeMenu}
                      >
                        {group.label === 'मुख्यपृष्ठ' ? (
                          <>
                            <Home className="h-4 w-4 text-zinc-400" />
                            <span>मुख्यपृष्ठ (Home)</span>
                          </>
                        ) : (
                          group.label
                        )}
                      </Link>
                    );
                  }

                  const isSectionOpen = Boolean(openMobileSections[group.label]);

                  return (
                    <div key={group.label} className="rounded-lg border border-zinc-800 bg-zinc-950/20">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-zinc-100 hover:bg-zinc-800/40"
                        onClick={() => toggleMobileSection(group.label)}
                        aria-expanded={isSectionOpen}
                      >
                        <span>{group.label}</span>
                        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isSectionOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isSectionOpen && (
                        <div className="space-y-1 border-t border-zinc-800 bg-zinc-900/40 px-2 py-2">
                          {group.items?.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={`flex items-center justify-between rounded-md px-3 py-2 text-sm transition ${
                                isActiveLink(item.href)
                                  ? 'bg-zinc-800 text-white font-medium'
                                  : 'text-zinc-300 hover:bg-zinc-800/60'
                              }`}
                              onClick={closeMenu}
                            >
                              <span className="flex items-center gap-1.5">
                                {item.label}
                                {item.requiresLogin && (
                                  <Lock size={10} className="text-amber-400" aria-label="लॉगिन आवश्यक" />
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

              {/* Quick links footer */}
              <div className="border-t border-zinc-800 pt-4 space-y-1.5">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">महत्वाच्या लिंक्स</p>
                {quickActionLinks.slice(2).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      </header>
    </>
  );
}
