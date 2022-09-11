import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import jwt_decode from "jwt-decode";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next")) return NextResponse.next();
  const cookies = request.cookies.get("authorization") as string;

  if (cookies === "undefined") {
    request.nextUrl.pathname = "/auth/signin";
    return NextResponse.redirect(request.nextUrl);
  }

  const decoded = jwt_decode(cookies) as { id: string };

  if (cookies && decoded.id) {
    if (pathname.includes("/auth")) {
      request.nextUrl.pathname = "/";
      return NextResponse.redirect(request.nextUrl);
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/auth/:path*"],
// };
