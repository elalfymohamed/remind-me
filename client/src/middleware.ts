import { NextResponse, type NextRequest } from "next/server";

import jwt_decode from "jwt-decode";

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const { pathname } = request.nextUrl;
  try {
    if (pathname.startsWith("/_next")) return NextResponse.next();

    const hasToken = cookies.get("authorization")?.value as string;
    let decoded = {} as { id: string };
    if (hasToken) {
      decoded = jwt_decode(hasToken);

      if (hasToken && decoded.id) {
        if (pathname.includes("/auth")) {
          request.nextUrl.pathname = "/";
          return NextResponse.redirect(request.nextUrl);
        }
      } else {
        request.nextUrl.pathname = "/auth/signin";
        return NextResponse.redirect(request.nextUrl);
      }
    } else {
      if (!pathname.includes("/auth")) {
        request.nextUrl.pathname = "/auth/signin";
        return NextResponse.redirect(request.nextUrl);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/auth/:path*"],
// };
