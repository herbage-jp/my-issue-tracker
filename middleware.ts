import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_LOCALES = ['en-US', 'zh-TW'];
const DEFAULT_LOCALE = 'en-US';

export function middleware(request: NextRequest) {
  // Redirect / to /[locale] based on Accept-Language
  if (request.nextUrl.pathname === '/') {
    const acceptLang = request.headers.get('accept-language') || '';
    let matched = DEFAULT_LOCALE;
    if (acceptLang.includes('zh')) {
      matched = 'zh-TW';
    }
    return NextResponse.redirect(new URL(`/${matched}`, request.url));
  }
  // Let NextAuth middleware handle protected routes
  return NextResponse.next();
}

export { default as nextAuthMiddleware } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/issues/new', '/issues/:id+/edit'],
};