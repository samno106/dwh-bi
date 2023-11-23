import { NextRequest, NextResponse } from "next/server";
import { TOKEN_COOKIES } from "./constant/api-end-point";

export function middleware(request: NextRequest, response: NextResponse) {
  const auth = request.cookies.has(`${TOKEN_COOKIES.TOKEN_NAME}`);

  if (request.nextUrl.pathname.startsWith("/login") && !auth) {
    return;
  }

  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.url.includes("/login") && auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
