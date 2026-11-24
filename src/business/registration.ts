// The rules for a registration: what a person may choose and what counts as valid.
// Pure code with no imports, so the browser and the server run exactly the same rules.

export const PROGRAM_OPTIONS = [
  "Multimedia Arts",
  "Information Technology",
  "Business and Management",
  "Other",
] as const;

export const IDEA_MAX_LENGTH = 280;

export const DUPLICATE_MESSAGE = "This email is already registered for the event.";

export type RegistrationInput = {
  fullName: string;
  email: string;
  program: string;
  idea: string;
};

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// "  Maria@Example.com " and "maria@example.com" are the same person.
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Checks the input against every rule. `value` is the cleaned-up input to save.
// Accepts anything, because the server must never trust what a browser sends.
export function validateRegistration(raw: unknown): {
  ok: boolean;
  errors: FieldErrors;
  value: RegistrationInput;
} {
  const source = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (key: string) => (typeof source[key] === "string" ? (source[key] as string).trim() : "");

  const value: RegistrationInput = {
    fullName: text("fullName").replace(/\s+/g, " "),
    email: normalizeEmail(text("email")),
    program: text("program"),
    idea: text("idea"),
  };

  const errors: FieldErrors = {};

  if (!value.fullName) errors.fullName = "Please enter your full name.";
  else if (value.fullName.length < 2 || value.fullName.length > 100)
    errors.fullName = "Name must be 2 to 100 characters.";

  if (!value.email) errors.email = "Please enter your email.";
  else if (value.email.length > 254 || !EMAIL_PATTERN.test(value.email))
    errors.email = "That email does not look right.";

  if (!value.program) errors.program = "Please choose your program.";
  else if (!(PROGRAM_OPTIONS as readonly string[]).includes(value.program))
    errors.program = "Please choose a program from the list.";

  if (value.idea.length > IDEA_MAX_LENGTH) errors.idea = `Keep it under ${IDEA_MAX_LENGTH} characters.`;

  return { ok: Object.keys(errors).length === 0, errors, value };
}

// The short code shown after a successful registration, made from the saved row's id.
export function confirmationCode(id: string): string {
  return `STI-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}
