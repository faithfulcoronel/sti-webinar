import "server-only";
import { getSignedInEmail, signInWithPassword, signOut } from "@/data/auth";
import { listRegistrations } from "@/data/registrations";
import { EVENT } from "./event";
import { isOrganizerEmail } from "./organizerRules";
import { confirmationCode } from "./registration";

export type RegistrationSummary = {
  id: string;
  code: string;
  fullName: string;
  email: string;
  program: string;
  idea: string;
  registeredAt: string;
};

export type OrganizerView =
  | { status: "signed-out" }
  | { status: "not-allowed"; email: string }
  | { status: "ok"; email: string; registrations: RegistrationSummary[] };

const allowedList = () => process.env.ORGANIZER_EMAILS;

// Called on every request for the organizer page. The list is only read after
// the server has confirmed who is signed in and that they are an organizer.
export async function getOrganizerView(): Promise<OrganizerView> {
  const email = await getSignedInEmail();
  if (!email) return { status: "signed-out" };
  if (!isOrganizerEmail(email, allowedList())) return { status: "not-allowed", email };

  const rows = await listRegistrations(EVENT.slug);
  return {
    status: "ok",
    email,
    registrations: rows.map((row) => ({
      id: row.id,
      // The same code the person saw after registering, so the organizer can match it at the door.
      code: confirmationCode(row.id),
      fullName: row.full_name,
      email: row.email,
      program: row.program,
      idea: row.idea ?? "",
      registeredAt: row.created_at,
    })),
  };
}

// One message for every failure, so the form does not reveal which emails are organizers.
export const SIGN_IN_FAILED = "Sign-in failed. Check your details.";

export async function signInOrganizer(raw: unknown): Promise<{ ok: true } | { ok: false; error: string }> {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const email = typeof source.email === "string" ? source.email.trim() : "";
  const password = typeof source.password === "string" ? source.password : "";

  if (!email || !password || !isOrganizerEmail(email, allowedList())) return { ok: false, error: SIGN_IN_FAILED };

  const signedIn = await signInWithPassword(email, password);
  return signedIn ? { ok: true } : { ok: false, error: SIGN_IN_FAILED };
}

export async function signOutOrganizer(): Promise<void> {
  await signOut();
}
