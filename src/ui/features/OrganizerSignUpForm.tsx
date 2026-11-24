"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { validateOrganizerSignUp, type SignUpErrors } from "@/business/organizerRules";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { FormMessage } from "@/ui/components/FormMessage";
import { TextField } from "@/ui/components/TextField";
import { TextLink } from "@/ui/components/TextLink";

export function OrganizerSignUpForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const input = Object.fromEntries(new FormData(event.currentTarget));

    const checked = validateOrganizerSignUp(input);
    setErrors(checked.errors);
    if (!checked.ok) return;

    setBusy(true);
    try {
      const response = await fetch("/api/organizer/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (response.status === 201) {
        router.push("/organizer");
        router.refresh();
        return;
      }
      const result = await response.json().catch(() => ({}));
      if (result.errors) setErrors(result.errors);
      else setFormError(result.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <Card variant="form" className="mx-auto w-full max-w-sm">
      <form noValidate className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="font-display text-2xl font-bold text-forest">New organizer login</h1>
        <p className="text-sm text-charcoal-soft">You need the organizer invite code from the event team.</p>
        <TextField label="Email" name="email" type="email" autoComplete="username" error={errors.email} />
        <TextField
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          error={errors.password}
        />
        <TextField label="Organizer invite code" name="inviteCode" autoComplete="off" error={errors.inviteCode} />
        <Button type="submit" disabled={busy}>
          {busy ? "Creating..." : "Create login"}
        </Button>
        {formError && <FormMessage>{formError}</FormMessage>}
        <div className="flex flex-wrap justify-between gap-x-4">
          <TextLink href="/organizer/login">I already have a login</TextLink>
          <TextLink href="/">Back to the event page</TextLink>
        </div>
      </form>
    </Card>
  );
}
