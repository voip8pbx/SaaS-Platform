import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host');

    // Handle local development subdomains (optional)
    // Define your custom domain or fallbacks
    const customDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'mycustomdomain.com';

    // 1. Resolve the subdomain
    let subdomain = '';
    if (hostname && hostname.includes(customDomain)) {
        subdomain = hostname.replace(`.${customDomain}`, '').replace(customDomain, '');
    }

    // 2. Routing logic based on subdomain

    // If subdomain is 'superadmin' -> Route to /admin (SuperAdmin dashboard)
    if (subdomain === 'superadmin') {
        // Prevent infinite loop if already on /admin
        if (url.pathname.startsWith('/admin')) {
            return NextResponse.next();
        }
        url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // If subdomain is 'admin' -> Route to /admin/dashboard (Admin control panel)
    if (subdomain === 'admin') {
        // If it's the root path of the subdomain, go to admin dashboard
        if (url.pathname === '/') {
            url.pathname = '/admin/dashboard';
            return NextResponse.rewrite(url);
        }
        // For other paths, map to /admin/dashboard if they don't already start with it
        if (!url.pathname.startsWith('/admin/dashboard') && !url.pathname.startsWith('/api')) {
            url.pathname = `/admin/dashboard${url.pathname}`;
            return NextResponse.rewrite(url);
        }
    }

    // If subdomain is 'www' or root -> Route to /client (Default website/client dashboard)
    if (subdomain === 'www' || subdomain === '') {
        if (url.pathname === '/') {
            url.pathname = '/client';
            return NextResponse.rewrite(url);
        }
        if (!url.pathname.startsWith('/client') && !url.pathname.startsWith('/api') && !url.pathname.startsWith('/admin')) {
            url.pathname = `/client${url.pathname}`;
            return NextResponse.rewrite(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
