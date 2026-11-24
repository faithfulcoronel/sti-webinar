import "server-only";
import { getAdminClient } from "./supabaseAdmin";

// A row of the "registrations" table.
export type RegistrationRow = {
  id: string;
  full_name: string;
  email: string;
  program: string;
  idea: string | null;
  created_at: string;
};

export type NewRegistration = { fullName: string; email: string; program: string; idea: string };

export type SaveResult = { status: "created"; id: string } | { status: "duplicate" };

const UNIQUE_VIOLATION = "23505";

export async function saveRegistration(event: string, input: NewRegistration): Promise<SaveResult> {
  const { data, error } = await getAdminClient()
    .from("registrations")
    .insert({
      event,
      full_name: input.fullName,
      email: input.email,
      program: input.program,
      idea: input.idea || null,
    })
    .select("id")
    .single();

  if (error) {
    // The unique index on (event, lower(email)) refused the row: already registered.
    if (error.code === UNIQUE_VIOLATION) return { status: "duplicate" };
    throw new Error(`Could not save the registration: ${error.message}`);
  }
  return { status: "created", id: data.id as string };
}

export async function listRegistrations(event: string): Promise<RegistrationRow[]> {
  const { data, error } = await getAdminClient()
    .from("registrations")
    .select("id, full_name, email, program, idea, created_at")
    .eq("event", event)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Could not load registrations: ${error.message}`);
  return (data ?? []) as RegistrationRow[];
}
