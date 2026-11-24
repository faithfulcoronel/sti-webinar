"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { FormMessage } from "@/ui/components/FormMessage";
import { TextField } from "@/ui/components/TextField";
import { TextLink } from "@/ui/components/TextLink";

export function OrganizerSignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const response = await fetch("/api/organizer/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });
      if (response.ok) {
        router.push("/organizer");
        router.refresh();
        return;
      }
      const result = await response.json().catch(() => ({}));
      setError(result.error ?? "Sign-in failed. Check your details.");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <Card variant="form" className="mx-auto w-full max-w-sm">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <h1 className="font-display text-2xl font-bold text-forest">Organizer sign-in</h1>
        <TextField label="Email" name="email" type="email" autoComplete="username" required />
        <TextField label="Password" name="password" type="password" autoComplete="current-password" required />
        <Button type="submit" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </Button>
        {error && <FormMessage>{error}</FormMessage>}
        <TextLink href="/">Back to the event page</TextLink>
      </form>
    </Card>
  );
}
