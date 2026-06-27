import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'mr', 'hi'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const localeMatch = pathname.match(/^\/(en|mr|hi)(\/.*)?$/);

  if (!localeMatch) {
    return NextResponse.next();
  }

  const localizedPath = localeMatch[2] || '/';
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = localizedPath;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'],
};