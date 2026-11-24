import "server-only";
import { getSignedInUser } from "@/data/auth";
import { getOrganizerProfile, saveOrganizerProfile } from "@/data/organizerProfiles";
import { validateOrganizerProfile, type ProfileErrors } from "./organizerProfileRules";
import { isOrganizer } from "./organizerRules";

export type OrganizerProfile = {
  email: string;
  fullName: string;
  roleTitle: string;
  // How this person became an organizer.
  access: "invite-code" | "organizer-list";
  memberSince: string;
};

export type ProfileView =
  | { status: "signed-out" }
  | { status: "not-allowed"; email: string }
  | { status: "ok"; profile: OrganizerProfile };

// The signed-in organizer, or the reason there is none. Every profile read and write starts here.
async function currentOrganizer() {
  const user = await getSignedInUser();
  if (!user) return { status: "signed-out" as const };
  if (!isOrganizer(user, process.env.ORGANIZER_EMAILS)) return { status: "not-allowed" as const, email: user.email };
  return { status: "ok" as const, user };
}

// An organizer only ever sees their own profile: the id comes from the session, never from the browser.
export async function getProfileView(): Promise<ProfileView> {
  const who = await currentOrganizer();
  if (who.status !== "ok") return who;

  const row = await getOrganizerProfile(who.user.id);
  return {
    status: "ok",
    profile: {
      email: who.user.email,
      fullName: row?.full_name ?? "",
      roleTitle: row?.role_title ?? "",
      access: who.user.invited ? "invite-code" : "organizer-list",
      memberSince: who.user.createdAt,
    },
  };
}

export type SaveProfileResult =
  | { status: "saved" }
  | { status: "invalid"; errors: ProfileErrors }
  | { status: "not-allowed" };

export async function saveProfile(raw: unknown): Promise<SaveProfileResult> {
  const who = await currentOrganizer();
  if (who.status !== "ok") return { status: "not-allowed" };

  const checked = validateOrganizerProfile(raw);
  if (!checked.ok) return { status: "invalid", errors: checked.errors };

  await saveOrganizerProfile(who.user.id, checked.value.fullName, checked.value.roleTitle);
  return { status: "saved" };
}
