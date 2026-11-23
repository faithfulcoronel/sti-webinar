import "server-only";
import { getSessionClient } from "@/lib/supabase/server";

export function isOrganizerEmail(email: string | undefined | null): boolean {
  if (!email) return false;
  const allowed = (process.env.ORGANIZER_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}

// Returns the organizer's email, or null. getUser() asks Supabase to verify the
// token (getSession() alone only reads the cookie and must not be trusted).
export async function getOrganizerEmail(): Promise<string | null> {
  const supabase = await getSessionClient();
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email ?? null;
  return isOrganizerEmail(email) ? email : null;
}
