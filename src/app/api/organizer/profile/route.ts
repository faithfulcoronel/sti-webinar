import { NextResponse } from "next/server";
import { saveProfile } from "@/business/organizerProfile";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const result = await saveProfile(body);
    if (result.status === "not-allowed")
      return NextResponse.json({ error: "Please sign in as an organizer." }, { status: 401 });
    if (result.status === "invalid") return NextResponse.json({ errors: result.errors }, { status: 400 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Saving the organizer profile failed", error);
    return NextResponse.json(
      { error: "We could not save your profile. Please try again in a moment." },
      { status: 500 },
    );
  }
}
