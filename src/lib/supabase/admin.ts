import "server-only";
import { createClient } from "@supabase/supabase-js";

// Service-role client. Bypasses RLS, so it must only be used in server code AFTER
// you have checked who is asking. The key is never exposed to the browser because
// the variable name has no NEXT_PUBLIC_ prefix and this file imports "server-only".
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase environment variables are missing. See .env.example.");
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
