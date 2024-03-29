import { NextResponse } from "next/server";

export default async function middleware(request) {
  let url = request.url;
  let authToken =
    request.cookies.has("__Secure-next-auth.session-token") ||
    request.cookies.has("next-auth.session-token");

  if (
    (!authToken && url === process.env.NEXTAUTH_URL + "/") ||
    (!authToken && request.nextUrl.pathname.startsWith("/lectures")) ||
    (!authToken && request.nextUrl.pathname.startsWith("/plans")) ||
    (!authToken && request.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/login");
  }

  if (
    (authToken && url === process.env.NEXTAUTH_URL + "/user-dashboard") ||
    (authToken && url === process.env.NEXTAUTH_URL + "/") ||
    (authToken && url === process.env.NEXTAUTH_URL + "/login") ||
    (authToken && url === process.env.NEXTAUTH_URL + "/register")
  ) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/lectures");
  }
}

export const config = {
  matcher: [
    "/:path*",
    "/login",
    "/register",
    "/lectures/:path*",
    "/dashboard/:path*",
    "/plans",
  ],
};
