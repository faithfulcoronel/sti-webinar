import { NextResponse } from "next/server";
import { registerForEvent } from "@/business/registerForEvent";
import { DUPLICATE_MESSAGE } from "@/business/registration";

// Thin route: read the request, hand it to the business layer, turn the result into a response.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  try {
    const result = await registerForEvent(body);
    if (result.status === "invalid") return NextResponse.json({ errors: result.errors }, { status: 400 });
    if (result.status === "duplicate") return NextResponse.json({ error: DUPLICATE_MESSAGE }, { status: 409 });
    return NextResponse.json({ code: result.code }, { status: 201 });
  } catch (error) {
    // Details go to the server log, never to the browser.
    console.error("Registration failed", error);
    return NextResponse.json(
      { error: "We could not save your registration. Please try again in a moment." },
      { status: 500 },
    );
  }
}
