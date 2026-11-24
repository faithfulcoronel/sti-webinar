// Who counts as an organizer, and who may become one. Pure code with no imports, so it is easy to test.

export const PASSWORD_MIN_LENGTH = 8;

// `allowedList` is the ORGANIZER_EMAILS setting: emails separated by commas.
export function isOrganizerEmail(email: string | null | undefined, allowedList: string | undefined): boolean {
  if (!email) return false;
  const allowed = (allowedList ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

// An organizer is on the ORGANIZER_EMAILS list, or signed up with the invite code.
export function isOrganizer(
  user: { email: string; invited: boolean } | null,
  allowedList: string | undefined,
): boolean {
  if (!user) return false;
  return user.invited || isOrganizerEmail(user.email, allowedList);
}

// `expected` is the ORGANIZER_INVITE_CODE setting. If it is not set, nobody can sign up.
// Compares every character even after a mismatch, so timing does not leak the code.
export function isValidInviteCode(given: string, expected: string | undefined): boolean {
  const wanted = (expected ?? "").trim();
  const got = given.trim();
  if (!wanted) return false;
  let difference = wanted.length ^ got.length;
  for (let i = 0; i < wanted.length; i++) difference |= wanted.charCodeAt(i) ^ (got.charCodeAt(i) || 0);
  return difference === 0;
}

export type SignUpInput = { email: string; password: string; inviteCode: string };
export type SignUpErrors = Partial<Record<keyof SignUpInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Checks the shape of a sign-up. Whether the invite code is the right one is checked on the server only.
export function validateOrganizerSignUp(raw: unknown): { ok: boolean; errors: SignUpErrors; value: SignUpInput } {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof source[key] === "string" ? (source[key] as string) : "");

  const value: SignUpInput = {
    email: text("email").trim().toLowerCase(),
    password: text("password"),
    inviteCode: text("inviteCode").trim(),
  };

  const errors: SignUpErrors = {};
  if (!value.email) errors.email = "Please enter your email.";
  else if (value.email.length > 254 || !EMAIL_PATTERN.test(value.email)) errors.email = "That email does not look right.";

  if (value.password.length < PASSWORD_MIN_LENGTH)
    errors.password = `Use at least ${PASSWORD_MIN_LENGTH} characters.`;
  else if (value.password.length > 72) errors.password = "Use at most 72 characters.";

  if (!value.inviteCode) errors.inviteCode = "Please enter the organizer invite code.";

  return { ok: Object.keys(errors).length === 0, errors, value };
}
