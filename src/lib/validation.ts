// Pure validation, shared by the browser form (fast feedback) and the server route
// (the check that actually counts). Never trust the browser alone.

export const PROGRAM_OPTIONS = [
  "Multimedia Arts",
  "Information Technology",
  "Business and Management",
  "Other",
] as const;

export type RegistrationInput = {
  fullName: string;
  email: string;
  program: string;
  idea: string;
};

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function validateRegistration(raw: unknown): {
  ok: boolean;
  errors: FieldErrors;
  value: RegistrationInput;
} {
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (k: string) => (typeof src[k] === "string" ? (src[k] as string).trim() : "");

  const value: RegistrationInput = {
    fullName: str("fullName").replace(/\s+/g, " "),
    email: normalizeEmail(str("email")),
    program: str("program"),
    idea: str("idea"),
  };

  const errors: FieldErrors = {};
  if (!value.fullName) errors.fullName = "Please enter your full name.";
  else if (value.fullName.length < 2 || value.fullName.length > 100)
    errors.fullName = "Name must be 2 to 100 characters.";

  if (!value.email) errors.email = "Please enter your email.";
  else if (value.email.length > 254 || !EMAIL_RE.test(value.email))
    errors.email = "That email does not look right.";

  if (!value.program) errors.program = "Please choose your program.";
  else if (!(PROGRAM_OPTIONS as readonly string[]).includes(value.program))
    errors.program = "Please choose a program from the list.";

  if (value.idea.length > 280) errors.idea = "Keep it under 280 characters.";

  return { ok: Object.keys(errors).length === 0, errors, value };
}
