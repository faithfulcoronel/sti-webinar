// The rules for an organizer's profile. Pure code with no imports.

export const ROLE_TITLE_MAX_LENGTH = 60;

export type ProfileInput = { fullName: string; roleTitle: string };
export type ProfileErrors = Partial<Record<keyof ProfileInput, string>>;

export function validateOrganizerProfile(raw: unknown): { ok: boolean; errors: ProfileErrors; value: ProfileInput } {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (key: string) =>
    typeof source[key] === "string" ? (source[key] as string).trim().replace(/\s+/g, " ") : "";

  const value: ProfileInput = { fullName: text("fullName"), roleTitle: text("roleTitle") };

  const errors: ProfileErrors = {};
  if (!value.fullName) errors.fullName = "Please enter your full name.";
  else if (value.fullName.length < 2 || value.fullName.length > 100)
    errors.fullName = "Name must be 2 to 100 characters.";

  if (value.roleTitle.length > ROLE_TITLE_MAX_LENGTH)
    errors.roleTitle = `Keep it under ${ROLE_TITLE_MAX_LENGTH} characters.`;

  return { ok: Object.keys(errors).length === 0, errors, value };
}

// What to call the organizer on screen: their name if they gave one, else their email.
export function displayName(fullName: string | null | undefined, email: string): string {
  return fullName?.trim() || email;
}
