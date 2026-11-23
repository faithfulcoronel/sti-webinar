"use server";

import { redirect } from "next/navigation";
import { isOrganizerEmail } from "@/lib/organizer";
import { getSessionClient } from "@/lib/supabase/server";

export async function signIn(_prev: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await getSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // Same message for every failure so the form does not reveal which emails exist.
  if (error || !isOrganizerEmail(email)) {
    if (!error) await supabase.auth.signOut();
    return { error: "Sign-in failed. Check your details." };
  }
  redirect("/organizer");
}

export async function signOut() {
  const supabase = await getSessionClient();
  await supabase.auth.signOut();
  redirect("/organizer/login");
}
