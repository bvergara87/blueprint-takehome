import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Handle /api/loadScreener
  if (pathname.startsWith("/api/loadScreener")) {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }
  }

  // Handle /api/parsePatientScreenerResponse
  if (pathname === "/api/parsePatientScreenerResponse") {
    console.log(request.method);
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Method Not Allowed" },
        { status: 405 }
      );
    }
    if (!request.body) {
      return NextResponse.json(
        { error: "Request body is missing" },
        { status: 400 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/loadScreener", "/api/parsePatientScreenerResponse"],
};
