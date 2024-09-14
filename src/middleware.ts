import { NextResponse, NextRequest } from "next/server";
export { default } from 'next-auth/middleware';
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    console.log('middleware is running')

    const token = await getToken({req: request});
    const url = request.nextUrl;

    if (token && 
        (
            url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify')
        )) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        
        if (!token &&
            !(
                url.pathname.startsWith('/sign-in') ||
                url.pathname.startsWith('/sign-up') ||
                url.pathname.startsWith('/verify')
            )
        ) {
        return NextResponse.redirect(new URL('/sign-in', request.url))

    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next|static|favicon.ico|api).*)', // Match all paths except those in _next, static, and api directories
    ]
};