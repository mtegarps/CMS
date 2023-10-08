import { NextRequest, NextResponse } from "next/server";

/** @param {import('next/server').NextRequest} request */
export function middleware(request) {
  const pathName = request.nextUrl.pathname;
  if (pathName === "/") {
    return NextResponse.redirect(new URL("/company", request.url));
  }
  if (pathName === "/company" || pathName === "/users") {
    const token = request.cookies.has("token");
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
