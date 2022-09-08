import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import jwt_decode from "jwt-decode";

export function middleware(request: NextRequest) {
  const { cookies } = request;

  const token = cookies.get("authorization") as string;
  const url = request.nextUrl.clone();

  if (request.nextUrl.pathname === "/") {
    if (token === "undefined") {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
    try {
      url.pathname = "/";
      return NextResponse.redirect(url);
    } catch (e) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/"],
};
