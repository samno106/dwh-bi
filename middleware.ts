import { NextRequest, NextResponse } from "next/server";
import { TOKEN_COOKIES } from "./constant/api-end-point";
import { getToken } from "./lib/get-token";

export function middleware(request: NextRequest, response: NextResponse) {
  const auth = getToken();

  if (request.nextUrl.pathname.startsWith("/login") && !auth) {
    return;
  }

  if (request.url.includes("/login") && auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
