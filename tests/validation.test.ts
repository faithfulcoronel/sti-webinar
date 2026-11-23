import assert from "node:assert/strict";
import { test } from "node:test";
import { normalizeEmail, validateRegistration } from "../src/lib/validation.ts";

const good = { fullName: "Test Student", email: "Test.Student@Example.com ", program: "Multimedia Arts", idea: "A portfolio site" };

test("accepts a valid registration and normalizes the email", () => {
  const r = validateRegistration(good);
  assert.equal(r.ok, true);
  assert.equal(r.value.email, "test.student@example.com");
});

test("requires name, email and program", () => {
  const r = validateRegistration({});
  assert.equal(r.ok, false);
  assert.ok(r.errors.fullName && r.errors.email && r.errors.program);
});

test("rejects bad emails", () => {
  for (const email of ["nope", "a@b", "a b@c.com", "@c.com", "a@@c.com"]) {
    assert.ok(validateRegistration({ ...good, email }).errors.email, email);
  }
});

test("rejects a program that is not in the list", () => {
  assert.ok(validateRegistration({ ...good, program: "Hacker" }).errors.program);
});

test("limits the idea length and ignores non-string input", () => {
  assert.ok(validateRegistration({ ...good, idea: "x".repeat(281) }).errors.idea);
  assert.equal(validateRegistration({ ...good, fullName: 42 }).ok, false);
  assert.equal(validateRegistration(null).ok, false);
});

test("normalizeEmail trims and lowercases", () => {
  assert.equal(normalizeEmail("  A@B.Co "), "a@b.co");
});
