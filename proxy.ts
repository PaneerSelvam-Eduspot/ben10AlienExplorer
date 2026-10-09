import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/terms" || pathname === "/privacy") {
    return NextResponse.next();
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      const redirectTo = new URL("/", req.url);
      return NextResponse.redirect(redirectTo);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in auth proxy", error);
    return NextResponse.next();
  }
}

export const middleware = proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/omnitrix/:path*"],
};