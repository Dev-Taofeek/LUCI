import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const token = req.auth;

  if (!token) {
    const signInUrl = new URL("/admin/login", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  const role = token.user?.role;

  // Safeguarding reports are restricted beyond general admin access.
  if (pathname.startsWith("/admin/safeguarding")) {
    if (role !== "SAFEGUARDING_OFFICER" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  // Exclude /admin/login itself — otherwise an unauthenticated visit to the
  // login page gets redirected back to itself, causing an infinite redirect loop.
  matcher: ["/admin/((?!login).*)"],
};