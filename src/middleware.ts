import { type NextRequest } from "next/server";
import { refreshSession } from "@/data/sessionRefresh";

export async function middleware(request: NextRequest) {
  return refreshSession(request);
}

export const config = {
  // Only the organizer pages and routes use a session.
  matcher: ["/organizer/:path*", "/api/organizer/:path*"],
};
