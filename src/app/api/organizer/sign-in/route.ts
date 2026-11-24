import { NextResponse } from "next/server";
import { SIGN_IN_FAILED, signInOrganizer } from "@/business/organizer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const result = await signInOrganizer(body);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 401 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Organizer sign-in failed", error);
    return NextResponse.json({ error: SIGN_IN_FAILED }, { status: 500 });
  }
}
