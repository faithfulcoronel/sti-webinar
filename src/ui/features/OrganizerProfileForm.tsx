"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { OrganizerProfile } from "@/business/organizerProfile";
import { validateOrganizerProfile, type ProfileErrors } from "@/business/organizerProfileRules";
import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { FormMessage } from "@/ui/components/FormMessage";
import { TextField } from "@/ui/components/TextField";
import { TextLink } from "@/ui/components/TextLink";

const accessLabel = {
  "invite-code": "Signed up with the organizer invite code",
  "organizer-list": "On the organizer list",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-PH", { timeZone: "Asia/Manila", dateStyle: "long" });

export function OrganizerProfileForm({ profile }: { profile: OrganizerProfile }) {
  const router = useRouter();
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setSaved(false);
    const input = Object.fromEntries(new FormData(event.currentTarget));

    const checked = validateOrganizerProfile(input);
    setErrors(checked.errors);
    if (!checked.ok) return;

    setBusy(true);
    try {
      const response = await fetch("/api/organizer/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok) {
        setSaved(true);
        router.refresh();
      } else if (result.errors) setErrors(result.errors);
      else setFormError(result.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <div>
        <TextLink href="/organizer">Back to registrations</TextLink>
      </div>

      <Card variant="form">
        <form noValidate className="flex flex-col gap-4" onSubmit={onSubmit}>
          <h1 className="font-display text-2xl font-bold text-forest">My profile</h1>

          <TextField label="Email" name="email" type="email" defaultValue={profile.email} disabled />
          <TextField
            label="Full name"
            name="fullName"
            autoComplete="name"
            defaultValue={profile.fullName}
            error={errors.fullName}
          />
          <TextField
            label="Role in the event (optional)"
            name="roleTitle"
            placeholder="Event head"
            defaultValue={profile.roleTitle}
            error={errors.roleTitle}
          />

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Card>
              <dt className="text-charcoal-muted">Access</dt>
              <dd className="font-semibold">{accessLabel[profile.access]}</dd>
            </Card>
            <Card>
              <dt className="text-charcoal-muted">Organizer since</dt>
              <dd className="font-semibold">{formatDate(profile.memberSince)}</dd>
            </Card>
          </dl>

          <Button type="submit" disabled={busy}>
            {busy ? "Saving..." : "Save profile"}
          </Button>
          {saved && <FormMessage tone="success">Profile saved.</FormMessage>}
          {formError && <FormMessage>{formError}</FormMessage>}
        </form>
      </Card>
    </div>
  );
}
