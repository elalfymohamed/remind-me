import { NextResponse, type NextRequest } from "next/server";

import jwt_decode from "jwt-decode";

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) return NextResponse.next();

  const hasToken = cookies.get("authorization")?.value as string;

  if (hasToken !== undefined) {
    let decoded = {} as { id: string };
    try {
      decoded = jwt_decode(hasToken);
    } catch (error) {
      request.nextUrl.pathname = "/auth/signin";
      return NextResponse.redirect(request.nextUrl);
    }
    if (decoded.id) {
      if (pathname.includes("/auth")) {
        request.nextUrl.pathname = "/";
        return NextResponse.redirect(request.nextUrl);
      }
    }
  } else {
    if (!pathname.includes("/auth")) {
      request.nextUrl.pathname = "/auth/signin";
      return NextResponse.redirect(request.nextUrl);
    }
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/auth/:path*"],
// };
