import { Card } from "@/ui/components/Card";
import { SignOutButton } from "./SignOutButton";

export function OrganizerNotAllowed({ email }: { email: string }) {
  return (
    <Card variant="form" className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <h1 className="font-display text-2xl font-bold text-forest">Not an organizer</h1>
      <p className="text-charcoal-soft">
        {email} is signed in, but it is not on the organizer list, so the registrations stay hidden.
      </p>
      <SignOutButton />
    </Card>
  );
}
