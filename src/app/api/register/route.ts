import { NextResponse } from "next/server";
import { confirmationCode, createRegistration } from "@/lib/registrations";
import { validateRegistration } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field. Pretend success to bots.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ code: "STI-00000000" }, { status: 201 });
  }

  // Server-side validation is the check that counts; the browser check is only a convenience.
  const { ok, errors, value } = validateRegistration(body);
  if (!ok) return NextResponse.json({ errors }, { status: 422 });

  try {
    const result = await createRegistration(value);
    if (result.status === "duplicate") {
      return NextResponse.json(
        { errors: { email: "This email is already registered for the event." } },
        { status: 409 },
      );
    }
    return NextResponse.json({ code: confirmationCode(result.registration.id) }, { status: 201 });
  } catch (err) {
    // Log details on the server only; never send internals to the browser.
    console.error("[register] failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
