import "server-only";
import { EVENT } from "@/lib/event";
import { getAdminClient } from "@/lib/supabase/admin";
import type { RegistrationInput } from "@/lib/validation";

export type Registration = {
  id: string;
  full_name: string;
  email: string;
  program: string;
  idea: string | null;
  created_at: string;
};

export type CreateResult =
  | { status: "created"; registration: Registration }
  | { status: "duplicate" };

// ---- Local rehearsal store (never allowed in production) ----
type MemoryDb = { rows: Registration[] };
const g = globalThis as unknown as { __stiMemory?: MemoryDb };
const memory = (g.__stiMemory ??= { rows: [] });

function isMemoryStore(): boolean {
  if (process.env.DEMO_STORE !== "memory") return false;
  if (process.env.NODE_ENV === "production") {
    throw new Error("DEMO_STORE=memory is not allowed in production.");
  }
  return true;
}

export async function createRegistration(input: RegistrationInput): Promise<CreateResult> {
  if (isMemoryStore()) {
    if (memory.rows.some((r) => r.email === input.email)) return { status: "duplicate" };
    const row: Registration = {
      id: crypto.randomUUID(),
      full_name: input.fullName,
      email: input.email,
      program: input.program,
      idea: input.idea || null,
      created_at: new Date().toISOString(),
    };
    memory.rows.push(row);
    return { status: "created", registration: row };
  }

  const { data, error } = await getAdminClient()
    .from("registrations")
    .insert({
      event_slug: EVENT.slug,
      full_name: input.fullName,
      email: input.email,
      program: input.program,
      idea: input.idea || null,
    })
    .select("id, full_name, email, program, idea, created_at")
    .single();

  if (error) {
    // 23505 = unique_violation: the (event, email) pair already exists.
    if (error.code === "23505") return { status: "duplicate" };
    throw new Error(`Could not save registration: ${error.message}`);
  }
  return { status: "created", registration: data as Registration };
}

// Callers MUST have verified the organizer first (see src/lib/organizer.ts).
export async function listRegistrations(): Promise<Registration[]> {
  const { data, error } = await getAdminClient()
    .from("registrations")
    .select("id, full_name, email, program, idea, created_at")
    .eq("event_slug", EVENT.slug)
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Could not load registrations: ${error.message}`);
  return (data ?? []) as Registration[];
}

export function confirmationCode(id: string): string {
  return `STI-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}
