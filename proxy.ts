import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/sign-in" ||
    request.nextUrl.pathname === "/sign-up"
  ) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/sign-up",
};
