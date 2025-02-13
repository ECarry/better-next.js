import { auth } from "@/modules/auth/lib/auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

type Session = typeof auth.$Infer.Session;

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  const isAdminRoute = pathname.startsWith("/admin");

  const isAuthRoute = ["/profile", "/dashboard", "/settings"].includes(
    pathname
  );

  if (isAdminRoute) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  if (isAuthRoute && !session?.user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/dashboard", "/settings", "/admin", "/admin/:path*"],
};
