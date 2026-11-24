// Who counts as an organizer. Pure code with no imports, so it is easy to test.

// `allowedList` is the ORGANIZER_EMAILS setting: emails separated by commas.
export function isOrganizerEmail(email: string | null | undefined, allowedList: string | undefined): boolean {
  if (!email) return false;
  const allowed = (allowedList ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}
