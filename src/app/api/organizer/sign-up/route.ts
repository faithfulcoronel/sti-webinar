import { NextResponse } from "next/server";
import { signUpOrganizer } from "@/business/organizer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  try {
    const result = await signUpOrganizer(body);
    if (result.status === "invalid") return NextResponse.json({ errors: result.errors }, { status: 400 });
    if (result.status === "refused") return NextResponse.json({ error: result.error }, { status: 409 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Organizer sign-up failed", error);
    return NextResponse.json(
      { error: "We could not create the login. Please try again in a moment." },
      { status: 500 },
    );
  }
}
