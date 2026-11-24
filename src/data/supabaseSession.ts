import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Client for the signed-in organizer. It uses the public key plus the session cookie,
// and it is only used for Supabase Auth (who is signed in), never to read the table.
export async function getSessionClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase is not configured. Check .env.local.");

  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component, which cannot set cookies.
          // Safe to ignore: the middleware keeps the session fresh.
        }
      },
    },
  });
}
