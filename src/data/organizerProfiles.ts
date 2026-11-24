import "server-only";
import { getAdminClient } from "./supabaseAdmin";

// A row of the "organizer_profiles" table.
export type OrganizerProfileRow = { user_id: string; full_name: string; role_title: string | null };

export async function getOrganizerProfile(userId: string): Promise<OrganizerProfileRow | null> {
  const { data, error } = await getAdminClient()
    .from("organizer_profiles")
    .select("user_id, full_name, role_title")
    .eq("user_id", userId)
    .limit(1);

  if (error) throw new Error(`Could not load the profile: ${error.message}`);
  return ((data ?? [])[0] as OrganizerProfileRow | undefined) ?? null;
}

// Creates the profile the first time and updates it after that.
export async function saveOrganizerProfile(userId: string, fullName: string, roleTitle: string): Promise<void> {
  const { error } = await getAdminClient()
    .from("organizer_profiles")
    .upsert(
      { user_id: userId, full_name: fullName, role_title: roleTitle || null, updated_at: new Date().toISOString() },
      { onConflict: "user_id" },
    );

  if (error) throw new Error(`Could not save the profile: ${error.message}`);
}
