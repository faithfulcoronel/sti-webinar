import "server-only";
import { getSessionClient } from "./supabaseSession";

// The email of the signed-in user, or null. getUser() asks Supabase to verify the
// session; reading the cookie alone would trust whatever the browser sent.
export async function getSignedInEmail(): Promise<string | null> {
  const supabase = await getSessionClient();
  const { data } = await supabase.auth.getUser();
  return data.user?.email ?? null;
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
