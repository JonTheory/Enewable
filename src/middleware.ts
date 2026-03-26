import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Add security headers (belt and braces - also in next.config.ts)
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Block common attack patterns in URL
    const url = request.nextUrl.pathname;
    const suspiciousPatterns = [
        /\.\.\//, // Path traversal
        /<script/i, // XSS attempts
        /javascript:/i, // JavaScript protocol
        /on\w+=/i, // Event handlers
        /eval\(/i, // Eval injection
        /__proto__/i, // Prototype pollution
    ];

    for (const pattern of suspiciousPatterns) {
        if (pattern.test(url)) {
            return new NextResponse('Bad Request', { status: 400 });
        }
    }

    // Prevent access to sensitive files
    const sensitivePatterns = [
        /\.env/,
        /\.git/,
        /package\.json$/,
        /tsconfig\.json$/,
        /next\.config/,
    ];

    for (const pattern of sensitivePatterns) {
        if (pattern.test(url)) {
            return new NextResponse('Not Found', { status: 404 });
        }
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public assets (images, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
