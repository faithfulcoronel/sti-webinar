import { NextResponse } from "next/server";
import { signOutOrganizer } from "@/business/organizer";

export async function POST(request: Request) {
  await signOutOrganizer();
  return NextResponse.redirect(new URL("/organizer/login", request.url), { status: 303 });
}
