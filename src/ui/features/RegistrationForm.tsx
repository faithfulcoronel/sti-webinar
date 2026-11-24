"use client";

import { useState } from "react";
import { IDEA_MAX_LENGTH, PROGRAM_OPTIONS } from "@/business/registration";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { SelectField } from "@/ui/components/SelectField";
import { TextAreaField } from "@/ui/components/TextAreaField";
import { TextField } from "@/ui/components/TextField";

// Interface only: there is no backend yet, so Register saves nothing.
export function RegistrationForm() {
  const [clicked, setClicked] = useState(false);

  return (
    <Card variant="form">
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setClicked(true);
        }}
      >
        <h2 className="font-display text-2xl font-bold text-forest">Reserve your seat</h2>

        <TextField label="Full name" name="fullName" autoComplete="name" placeholder="Maria Santos" />
        <TextField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="maria.test@example.com"
        />
        <SelectField label="Program" name="program" placeholder="Choose one" options={PROGRAM_OPTIONS} />
        <TextAreaField
          label="What would you like to build? (optional)"
          name="idea"
          rows={3}
          maxLength={IDEA_MAX_LENGTH}
        />

        <Button type="submit">Register</Button>

        {clicked && (
          <p role="status" className="text-sm text-charcoal-muted">
            Interface only for now. Nothing was saved.
          </p>
        )}
      </form>
    </Card>
  );
}
