import "server-only";
import { getAdminClient } from "./supabaseAdmin";
import { getSessionClient } from "./supabaseSession";

export type SignedInUser = { email: string; invited: boolean };

// Who is signed in, or null. getUser() asks Supabase to verify the session; reading the
// cookie alone would trust whatever the browser sent. `invited` comes from app_metadata,
// which only server code with the service role key can write, never the user.
export async function getSignedInUser(): Promise<SignedInUser | null> {
  const supabase = await getSessionClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user?.email) return null;
  return { email: user.email, invited: user.app_metadata?.organizer === true };
}

export async function signInWithPassword(email: string, password: string): Promise<boolean> {
  const supabase = await getSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
}

export async function signOut(): Promise<void> {
  const supabase = await getSessionClient();
  await supabase.auth.signOut();
}

// Creates a login that is marked as an organizer. The caller must have checked the invite code.
export async function createInvitedOrganizer(email: string, password: string): Promise<"created" | "exists"> {
  const { error } = await getAdminClient().auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { organizer: true },
  });
  if (!error) return "created";
  if (error.code === "email_exists" || error.status === 422) return "exists";
  throw new Error(`Could not create the organizer login: ${error.message}`);
}
