import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (!request.cookies.has("arvan_session")) {
    if (request.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/markets/:path*",
    "/option-chain/:path*",
    "/strategies/:path*",
    "/paper-trading/:path*",
    "/orders/:path*",
    "/trade-journal/:path*",
    "/risk/:path*",
    "/wallet/:path*",
    "/reports/:path*",
    "/learning/:path*",
    "/settings/:path*",
    "/audit/:path*",
    "/automation/:path*",
    "/trading/:path*",
    "/profile/:path*",
    "/help/:path*",
    "/system-status/:path*",
    "/api/users/:path*",
  ],
};
