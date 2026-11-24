import "server-only";
import { createInvitedOrganizer, getSignedInUser, signInWithPassword, signOut } from "@/data/auth";
import { getOrganizerProfile } from "@/data/organizerProfiles";
import { listRegistrations } from "@/data/registrations";
import { EVENT } from "./event";
import { displayName } from "./organizerProfileRules";
import {
  isOrganizer,
  isValidInviteCode,
  validateOrganizerSignUp,
  type SignUpErrors,
} from "./organizerRules";
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
  | { status: "ok"; name: string; registrations: RegistrationSummary[] };

const allowedList = () => process.env.ORGANIZER_EMAILS;

// Called on every request for the organizer page. The list is only read after
// the server has confirmed who is signed in and that they are an organizer.
export async function getOrganizerView(): Promise<OrganizerView> {
  const user = await getSignedInUser();
  if (!user) return { status: "signed-out" };
  if (!isOrganizer(user, allowedList())) return { status: "not-allowed", email: user.email };

  const [rows, profile] = await Promise.all([listRegistrations(EVENT.slug), getOrganizerProfile(user.id)]);
  return {
    status: "ok",
    name: displayName(profile?.full_name, user.email),
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
  if (!email || !password) return { ok: false, error: SIGN_IN_FAILED };

  if (!(await signInWithPassword(email, password))) return { ok: false, error: SIGN_IN_FAILED };

  // The password was right, but only organizers may stay signed in.
  if (!isOrganizer(await getSignedInUser(), allowedList())) {
    await signOut();
    return { ok: false, error: SIGN_IN_FAILED };
  }
  return { ok: true };
}

export type SignUpResult =
  | { status: "created" }
  | { status: "invalid"; errors: SignUpErrors }
  | { status: "refused"; error: string };

// Creates a new organizer login. Only someone who knows ORGANIZER_INVITE_CODE gets through.
export async function signUpOrganizer(raw: unknown): Promise<SignUpResult> {
  const checked = validateOrganizerSignUp(raw);
  if (!checked.ok) return { status: "invalid", errors: checked.errors };

  if (!isValidInviteCode(checked.value.inviteCode, process.env.ORGANIZER_INVITE_CODE))
    return { status: "invalid", errors: { inviteCode: "That invite code is not correct." } };

  const created = await createInvitedOrganizer(checked.value.email, checked.value.password);
  if (created === "exists")
    return { status: "refused", error: "That email already has a login. Sign in instead." };

  await signInWithPassword(checked.value.email, checked.value.password);
  return { status: "created" };
}

export async function signOutOrganizer(): Promise<void> {
  await signOut();
}
