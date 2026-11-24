// The rules for a registration: what a person may choose and what counts as valid.
// No UI and no database code belongs in this folder.

export const PROGRAM_OPTIONS = [
  "Multimedia Arts",
  "Information Technology",
  "Business and Management",
  "Other",
] as const;

export const IDEA_MAX_LENGTH = 280;

export type RegistrationInput = {
  fullName: string;
  email: string;
  program: string;
  idea: string;
};

export type FieldErrors = Partial<Record<keyof RegistrationInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns one message per field that breaks a rule. An empty result means the input is valid.
// The form does not call this yet; it is wired in when the form starts saving.
export function validateRegistration(input: RegistrationInput): FieldErrors {
  const errors: FieldErrors = {};
  const fullName = input.fullName.trim();
  const email = input.email.trim();

  if (!fullName) errors.fullName = "Please enter your full name.";
  else if (fullName.length < 2 || fullName.length > 100) errors.fullName = "Name must be 2 to 100 characters.";

  if (!email) errors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "That email does not look right.";

  if (!input.program) errors.program = "Please choose your program.";
  else if (!(PROGRAM_OPTIONS as readonly string[]).includes(input.program))
    errors.program = "Please choose a program from the list.";

  if (input.idea.trim().length > IDEA_MAX_LENGTH) errors.idea = `Keep it under ${IDEA_MAX_LENGTH} characters.`;

  return errors;
}
