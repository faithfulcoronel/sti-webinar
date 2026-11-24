import "server-only";
import { saveRegistration } from "@/data/registrations";
import { EVENT } from "./event";
import { confirmationCode, validateRegistration, type FieldErrors } from "./registration";

export type RegisterResult =
  | { status: "registered"; code: string }
  | { status: "invalid"; errors: FieldErrors }
  | { status: "duplicate" };

// The one way to register. Runs the rules on the server, then asks the data layer to save.
export async function registerForEvent(raw: unknown): Promise<RegisterResult> {
  const checked = validateRegistration(raw);
  if (!checked.ok) return { status: "invalid", errors: checked.errors };

  const saved = await saveRegistration(EVENT.slug, checked.value);
  if (saved.status === "duplicate") return { status: "duplicate" };

  return { status: "registered", code: confirmationCode(saved.id) };
}
