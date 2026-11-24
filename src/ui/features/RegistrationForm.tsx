"use client";

import { useState, type FormEvent } from "react";
import {
  PROGRAM_OPTIONS,
  validateRegistration,
  type FieldErrors,
} from "@/business/registration";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { FormMessage } from "@/ui/components/FormMessage";
import { SelectField } from "@/ui/components/SelectField";
import { TextAreaField } from "@/ui/components/TextAreaField";
import { TextField } from "@/ui/components/TextField";
import { RegistrationConfirmed } from "./RegistrationConfirmed";

export function RegistrationForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const input = Object.fromEntries(new FormData(event.currentTarget));

    // Check in the browser first, for fast feedback...
    const checked = validateRegistration(input);
    setErrors(checked.errors);
    if (!checked.ok) return;

    // ...then the server checks again with the same rules. The server's answer is the one that counts.
    setSaving(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 201) setCode(result.code);
      else if (result.errors) setErrors(result.errors);
      else setFormError(result.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  if (code) return <RegistrationConfirmed code={code} />;

  return (
    <Card variant="form">
      <form noValidate className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h2 className="font-display text-2xl font-bold text-forest">Reserve your seat</h2>

        <TextField
          label="Full name"
          name="fullName"
          autoComplete="name"
          placeholder="Maria Santos"
          error={errors.fullName}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="maria.test@example.com"
          error={errors.email}
        />
        <SelectField
          label="Program"
          name="program"
          placeholder="Choose one"
          options={PROGRAM_OPTIONS}
          error={errors.program}
        />
        <TextAreaField
          label="What would you like to build? (optional)"
          name="idea"
          rows={3}
          error={errors.idea}
        />

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Register"}
        </Button>

        {formError && <FormMessage>{formError}</FormMessage>}
      </form>
    </Card>
  );
}
