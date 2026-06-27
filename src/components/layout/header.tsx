'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Home, Menu, PhoneCall, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';

type NavItem = {
  label: string;
  href: string;
  description?: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: 'महानगरपालिका',
    items: [
      { label: 'आमच्याविषयी', href: ROUTES.ABOUT, description: 'संस्था, इतिहास आणि कार्यक्षेत्र' },
      { label: 'संपर्क कार्यालय', href: ROUTES.CONTACT, description: 'मुख्य कार्यालय व हेल्पलाइन' },
      { label: 'बातम्या', href: ROUTES.NEWS, description: 'ताज्या सूचना व घडामोडी' },
      { label: 'RTI माहिती', href: ROUTES.RTI, description: 'माहिती अधिकार सेवा' },
    ],
  },
  {
    label: 'नागरिक सेवा',
    items: [
      { label: 'मालमत्ता कर', href: ROUTES.CITIZEN.PROPERTY_TAX, description: 'कर भरणा आणि पावती' },
      { label: 'पाणीपट्टी बिल', href: ROUTES.CITIZEN.WATER_BILLS, description: 'बिल तपासणी आणि पेमेंट' },
      { label: 'तक्रार नोंदवा', href: ROUTES.CITIZEN.COMPLAINTS.NEW, description: 'ऑनलाइन तक्रार नोंदणी' },
      { label: 'तक्रार स्थिती', href: ROUTES.CITIZEN.COMPLAINTS.TRACK, description: 'लाईव्ह ट्रॅकिंग' },
    ],
  },
  {
    label: 'प्रमाणपत्रे व परवाने',
    items: [
      { label: 'जन्म प्रमाणपत्र', href: ROUTES.CITIZEN.CERTIFICATES.BIRTH, description: 'जन्म दाखला अर्ज' },
      { label: 'मृत्यू प्रमाणपत्र', href: ROUTES.CITIZEN.CERTIFICATES.DEATH, description: 'मृत्यू दाखला अर्ज' },
      { label: 'विवाह नोंदणी', href: ROUTES.CITIZEN.CERTIFICATES.MARRIAGE, description: 'विवाह प्रमाणपत्र सेवा' },
      { label: 'व्यापार परवाना', href: ROUTES.CITIZEN.LICENSES.TRADE, description: 'नवीन/नूतनीकरण' },
    ],
  },
  {
    label: 'सहाय्य व संसाधने',
    items: [
      { label: 'सेवा सूची', href: ROUTES.SERVICES, description: 'सर्व ऑनलाइन सेवा एकत्र' },
      { label: 'FAQ', href: ROUTES.FAQ, description: 'सामान्य प्रश्नांची उत्तरे' },
      { label: 'डिजिटल लॉकर', href: ROUTES.CITIZEN.DIGITAL_LOCKER, description: 'दस्तऐवज सुरक्षित संग्रह' },
      { label: 'नागरिक डॅशबोर्ड', href: ROUTES.CITIZEN.DASHBOARD, description: 'आपली सेवा क्रिया' },
    ],
  },
];

const quickActionLinks = [
  { label: 'मालमत्ता कर भरा', href: ROUTES.CITIZEN.PROPERTY_TAX },
  { label: 'पाणीपट्टी शुल्क', href: ROUTES.CITIZEN.WATER_BILLS },
  { label: 'तक्रार नोंदवा', href: ROUTES.CITIZEN.COMPLAINTS.NEW },
  { label: 'तक्रार स्थिती', href: ROUTES.CITIZEN.COMPLAINTS.TRACK },
  { label: 'प्रमाणपत्र सेवा', href: ROUTES.CITIZEN.CERTIFICATES.BASE },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState<string | null>(null);
  const [openMobileSections, setOpenMobileSections] = React.useState<Record<string, boolean>>({});
  const desktopNavRef = React.useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileSections({});
  };

  React.useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

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
      if (!desktopNavRef.current) {
        return;
      }

      if (!desktopNavRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isGroupActive = (items: NavItem[]) => items.some((item) => isActiveLink(item.href));

  const toggleMobileSection = (label: string) => {
    setOpenMobileSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-700 bg-zinc-900 text-zinc-100 shadow-lg backdrop-blur-md">
      <div className="border-b border-zinc-800 bg-zinc-950/90">
        <div className="container-custom flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
          <div className="flex min-w-0 items-center gap-3 text-zinc-200">
            <PhoneCall className="h-3.5 w-3.5 text-amber-300" />
            <span className="truncate">हेल्पलाइन: 1800-000-000 | सोमवार-शनिवार, 10am-6pm</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link href={ROUTES.NEWS} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-zinc-200 transition hover:bg-zinc-800 hover:text-white">
              <Bell className="h-3.5 w-3.5" />
              सूचना
            </Link>
            <span className="text-zinc-500">|</span>
            <span className="rounded-md bg-zinc-800 px-2 py-1 text-zinc-200">मराठी</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="container-custom flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <Link href={ROUTES.HOME} className="block text-sm font-semibold text-white sm:text-base">
              छत्रपती संभाजीनगर महानगरपालिका
            </Link>
            <p className="hidden text-xs text-zinc-300 sm:block">स्मार्ट नागरी सेवा पोर्टल</p>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href={ROUTES.SERVICES}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-1.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              <Search className="h-4 w-4" />
              सेवा शोधा
            </Link>
            <Button size="sm" className="bg-amber-600 text-white hover:bg-amber-500">
              <Link href={ROUTES.LOGIN}>नागरिक लॉगिन</Link>
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-zinc-700 p-2 text-zinc-100 lg:hidden"
            aria-label="Open mobile menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-800 bg-zinc-900/95">
        <div ref={desktopNavRef} className="container-custom hidden items-center justify-between gap-4 py-2 lg:flex">
          <nav className="flex min-w-0 flex-1 items-center gap-1">
            <Link
              href={ROUTES.HOME}
              className="inline-flex items-center rounded-md px-2 py-1 text-zinc-100 transition hover:bg-zinc-700"
              aria-label="मुख्यपृष्ठ"
            >
              <Home className="h-4 w-4" />
            </Link>

            {navGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(group.label)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button
                  type="button"
                  className={`group inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition ${
                    isGroupActive(group.items)
                      ? 'bg-zinc-700 font-semibold text-white'
                      : 'text-zinc-200 hover:bg-zinc-700 hover:text-white'
                  }`}
                  aria-expanded={openDesktopMenu === group.label}
                  onClick={() => setOpenDesktopMenu((prev) => (prev === group.label ? null : group.label))}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${openDesktopMenu === group.label ? 'rotate-180 text-zinc-200' : 'text-zinc-400 group-hover:text-zinc-200'}`}
                  />
                </button>

                {openDesktopMenu === group.label ? (
                  <div className="absolute left-0 top-full mt-2 w-[34rem] rounded-xl border border-zinc-700 bg-zinc-900 p-3 shadow-2xl">
                    <div className="grid grid-cols-2 gap-2">
                      {group.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className={`rounded-lg border p-3 transition ${
                            isActiveLink(item.href)
                              ? 'border-amber-400 bg-zinc-800 text-white'
                              : 'border-zinc-700 text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800'
                          }`}
                        >
                          <p className="text-sm font-medium">{item.label}</p>
                          {item.description ? <p className="mt-1 text-xs text-zinc-400">{item.description}</p> : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="hidden border-t border-zinc-800 bg-zinc-900/95 lg:block">
        <div className="container-custom flex items-center gap-2 overflow-x-auto py-2">
          {quickActionLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-amber-400 hover:bg-zinc-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Close mobile menu overlay"
          onClick={closeMenu}
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-zinc-900 text-zinc-100 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-zinc-700 px-5 py-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase">Menu</p>
              <p className="text-sm text-zinc-300">नागरी सेवा नेव्हिगेशन</p>
            </div>
            <button
              type="button"
              className="rounded-md border border-zinc-700 p-2 text-zinc-200"
              aria-label="Close mobile menu"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <div className="mb-4 space-y-2">
              <Link
                href={ROUTES.LOGIN}
                className="block rounded-lg bg-amber-600 px-4 py-3 text-center font-medium text-white transition hover:bg-amber-500"
                onClick={closeMenu}
              >
                नागरिक लॉगिन
              </Link>

              <Link
                href={ROUTES.HOME}
                className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-100"
                onClick={closeMenu}
              >
                <Home className="h-4 w-4" />
                मुख्यपृष्ठ
              </Link>

              <Link
                href={ROUTES.SERVICES}
                className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-100"
                onClick={closeMenu}
              >
                <Search className="h-4 w-4" />
                सेवा शोधा
              </Link>
            </div>

            <div className="space-y-2">
              {navGroups.map((group) => {
                const isOpen = Boolean(openMobileSections[group.label]);

                return (
                  <div key={group.label} className="rounded-lg border border-zinc-700 bg-zinc-800/70">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-zinc-100"
                      onClick={() => toggleMobileSection(group.label)}
                      aria-expanded={isOpen}
                    >
                      <span>{group.label}</span>
                      <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen ? (
                      <div className="space-y-1 border-t border-zinc-700 px-2 py-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`block rounded-md px-3 py-2 text-sm transition ${
                              isActiveLink(item.href)
                                ? 'bg-zinc-700 text-white'
                                : 'text-zinc-200 hover:bg-zinc-700 hover:text-white'
                            }`}
                            onClick={closeMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-2">
              {quickActionLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg border border-zinc-700 px-4 py-3 text-center text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
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
  );
}
