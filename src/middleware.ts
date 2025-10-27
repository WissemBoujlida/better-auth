import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/auth";
import {
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  authApiPrefix,
} from "@/routes";
import { redirect } from "next/navigation";

// you most likely going to have fewer public routes than protected routes
// we can protect all routes, and then skip a couple of routes (eg: docs, landing page, ...)
export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session;

  const isAuthApiRoute = nextUrl.pathname.startsWith(authApiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // if user is logged in, redirect /auth/login --> /settings
  // if user is logged out, redirect /auth/login

  if (isAuthApiRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
}

// matcher: invoke middleware function for routes matched by matcher
// invoke middleware everyware on both public and portected routes and then in the middleware function
// decide what you want to do for each route
export const config = {
  runtime: "nodejs",
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
