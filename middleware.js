import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Safeguarding reports are restricted beyond general admin access.
    if (pathname.startsWith("/admin/safeguarding")) {
      if (token?.role !== "SAFEGUARDING_OFFICER" && token?.role !== "SUPER_ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/admin/login" },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  // Exclude /admin/login itself — otherwise an unauthenticated visit to the
  // login page gets redirected back to itself, causing an infinite redirect loop.
  matcher: ["/admin/((?!login).*)"],
};