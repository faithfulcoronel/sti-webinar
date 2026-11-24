import assert from "node:assert/strict";
import { test } from "node:test";
import {
  isOrganizer,
  isOrganizerEmail,
  isValidInviteCode,
  validateOrganizerSignUp,
} from "../src/business/organizerRules.ts";
import {
  IDEA_MAX_LENGTH,
  confirmationCode,
  normalizeEmail,
  validateRegistration,
} from "../src/business/registration.ts";

const valid = { fullName: "Maria Santos", email: "maria.test@example.com", program: "Multimedia Arts", idea: "" };

test("a complete registration is valid", () => {
  const result = validateRegistration(valid);
  assert.equal(result.ok, true);
  assert.deepEqual(result.errors, {});
});

test("name, email and program are required", () => {
  const result = validateRegistration({ fullName: "  ", email: "", program: "", idea: "" });
  assert.equal(result.ok, false);
  assert.equal(result.errors.fullName, "Please enter your full name.");
  assert.equal(result.errors.email, "Please enter your email.");
  assert.equal(result.errors.program, "Please choose your program.");
});

test("the idea is optional", () => {
  assert.equal(validateRegistration({ ...valid, idea: "" }).ok, true);
});

test("email must look like an email", () => {
  for (const email of ["maria", "maria@", "maria@example", "maria @example.com", "@example.com"]) {
    assert.equal(validateRegistration({ ...valid, email }).errors.email, "That email does not look right.", email);
  }
});

test("idea may be at most 280 characters", () => {
  assert.equal(validateRegistration({ ...valid, idea: "a".repeat(IDEA_MAX_LENGTH) }).ok, true);
  assert.equal(validateRegistration({ ...valid, idea: "a".repeat(IDEA_MAX_LENGTH + 1) }).ok, false);
});

test("program must be one from the list", () => {
  assert.equal(
    validateRegistration({ ...valid, program: "Astronaut Training" }).errors.program,
    "Please choose a program from the list.",
  );
});

test("name must be 2 to 100 characters", () => {
  assert.equal(validateRegistration({ ...valid, fullName: "M" }).ok, false);
  assert.equal(validateRegistration({ ...valid, fullName: "M".repeat(101) }).ok, false);
});

test("input is cleaned before saving", () => {
  const { value } = validateRegistration({ ...valid, fullName: "  Maria   Santos ", email: " Maria.Test@Example.COM " });
  assert.equal(value.fullName, "Maria Santos");
  assert.equal(value.email, "maria.test@example.com");
});

test("the same email in different letter case counts as the same email", () => {
  assert.equal(normalizeEmail("Maria.Test@Example.com"), normalizeEmail(" maria.test@example.COM "));
});

test("the server does not trust the shape of what it receives", () => {
  for (const raw of [null, undefined, "text", 42, [], { fullName: 7, email: {}, program: [] }]) {
    assert.equal(validateRegistration(raw).ok, false);
  }
});

test("the confirmation code is short and comes from the saved id", () => {
  assert.equal(confirmationCode("4f9a2c7e-1b3d-4e5f-8a9b-0c1d2e3f4a5b"), "STI-4F9A2C7E");
});

test("only emails on the organizer list are organizers", () => {
  const list = "organizer@example.com, Second.Organizer@Example.com";
  assert.equal(isOrganizerEmail("organizer@example.com", list), true);
  assert.equal(isOrganizerEmail("SECOND.organizer@example.com", list), true);
  assert.equal(isOrganizerEmail("student@example.com", list), false);
  assert.equal(isOrganizerEmail(null, list), false);
  assert.equal(isOrganizerEmail("organizer@example.com", undefined), false);
  assert.equal(isOrganizerEmail("organizer@example.com", ""), false);
});

test("an organizer is on the list or signed up with the invite code", () => {
  const list = "organizer@example.com";
  assert.equal(isOrganizer({ email: "organizer@example.com", invited: false }, list), true);
  assert.equal(isOrganizer({ email: "new.organizer@example.com", invited: true }, list), true);
  assert.equal(isOrganizer({ email: "student@example.com", invited: false }, list), false);
  assert.equal(isOrganizer(null, list), false);
});

test("the invite code must match exactly", () => {
  assert.equal(isValidInviteCode("open-sesame-2026", "open-sesame-2026"), true);
  assert.equal(isValidInviteCode("  open-sesame-2026 ", "open-sesame-2026"), true);
  assert.equal(isValidInviteCode("open-sesame-2025", "open-sesame-2026"), false);
  assert.equal(isValidInviteCode("open-sesame-2026-extra", "open-sesame-2026"), false);
  assert.equal(isValidInviteCode("open", "open-sesame-2026"), false);
  assert.equal(isValidInviteCode("", "open-sesame-2026"), false);
});

test("with no invite code set, nobody can sign up", () => {
  assert.equal(isValidInviteCode("", undefined), false);
  assert.equal(isValidInviteCode("", ""), false);
  assert.equal(isValidInviteCode("anything", "   "), false);
});

test("organizer sign-up needs a valid email, a password of 8 or more, and a code", () => {
  const good = { email: "New.Organizer@Example.com", password: "long-enough", inviteCode: "code" };
  const result = validateOrganizerSignUp(good);
  assert.equal(result.ok, true);
  assert.equal(result.value.email, "new.organizer@example.com");
  assert.equal(validateOrganizerSignUp({ ...good, email: "nope" }).errors.email, "That email does not look right.");
  assert.equal(validateOrganizerSignUp({ ...good, password: "short" }).errors.password, "Use at least 8 characters.");
  assert.equal(
    validateOrganizerSignUp({ ...good, inviteCode: " " }).errors.inviteCode,
    "Please enter the organizer invite code.",
  );
  assert.equal(validateOrganizerSignUp(null).ok, false);
});
