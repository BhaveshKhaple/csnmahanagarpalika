import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'mr', 'hi'] as const;
type Locale = (typeof LOCALES)[number];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the path already starts with a valid locale prefix, pass it through.
  // Do NOT redirect/strip — LanguageContext relies on the /en prefix being
  // present in the URL to detect the active locale client-side.
  const hasLocalePrefix = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocalePrefix) {
    return NextResponse.next();
  }

  // No locale prefix → default language (Marathi), just continue.
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};