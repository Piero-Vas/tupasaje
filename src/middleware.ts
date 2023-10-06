import {NextResponse, type NextRequest} from 'next/server';
import {API_URL} from './config/env';

export async function middleware(request: NextRequest) {
  const tokenCookie = request.cookies.get('token');
  const pathname = request.nextUrl.pathname;

  // there is not token and route is ´/´ or ´/forgot-password´
  if (!tokenCookie && (pathname === '/' || pathname === '/forgot-password')) {
    return NextResponse.next();
  }

  try {
    const checkTokenResponse = await fetch(`${API_URL}/user/check`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenCookie?.value}`,
        'Content-Type': 'application/json',
      },
    });

    // Non-authenticated, so redirect to login, login is pathname => /
    if (checkTokenResponse.status !== 200) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
  ],
};
