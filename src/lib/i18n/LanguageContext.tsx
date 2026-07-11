'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import en from './dictionaries/en.json';
import mr from './dictionaries/mr.json';

export type Locale = 'mr' | 'en';

type Dictionary = typeof mr;

const dictionaries: Record<Locale, Dictionary> = {
  mr,
  en: en as unknown as Dictionary,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Translates key with dot-notation. Fallbacks to key itself if not found. */
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

/** Helper to resolve nested key paths (e.g., 'home.about.title') */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Fallback to key path itself
    }
  }
  return typeof current === 'string' ? current : path;
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('mr');
  const pathname = usePathname();
  const router = useRouter();

  // 1. Detect locale from pathname (Next.js routing source-of-truth)
  useEffect(() => {
    const isEn = pathname.startsWith('/en');
    const detectedLocale: Locale = isEn ? 'en' : 'mr';
    setLocaleState(detectedLocale);
  }, [pathname]);

  // 2. Wrap locale updater to synchronize pathname
  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocaleState(newLocale);
    localStorage.setItem('csmc-locale', newLocale);

    // Synchronize URL paths to match the locale choice
    const isEn = pathname.startsWith('/en');
    const isHi = pathname.startsWith('/hi');
    const isMr = pathname.startsWith('/mr');

    let newPathname = pathname;
    if (isEn) {
      newPathname = pathname.replace(/^\/en/, newLocale === 'mr' ? '' : '/en');
    } else if (isHi) {
      newPathname = pathname.replace(/^\/hi/, newLocale === 'mr' ? '' : '/hi');
    } else if (isMr) {
      newPathname = pathname.replace(/^\/mr/, newLocale === 'mr' ? '' : '/mr');
    } else {
      newPathname = newLocale === 'mr' ? pathname : `/en${pathname}`;
    }

    if (newPathname === '') newPathname = '/';
    router.push(newPathname);
  };

  const t = (key: string) => {
    const dict = dictionaries[locale] || dictionaries.mr;
    return getNestedValue(dict, key);
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
