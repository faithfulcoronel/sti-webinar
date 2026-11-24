import type { RegistrationSummary } from "@/business/organizer";
import { Card } from "@/ui/components/Card";
import { TextLink } from "@/ui/components/TextLink";
import { SignOutButton } from "./SignOutButton";

const formatDate = (iso: string) => new Date(iso).toLocaleString("en-PH", { timeZone: "Asia/Manila" });

export function RegistrationsList({
  name,
  registrations,
}: {
  name: string;
  registrations: RegistrationSummary[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <TextLink href="/">Back to the event page</TextLink>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-forest">Registrations</h1>
          <p className="mt-1 text-sm text-charcoal-muted">
            Signed in as {name} · {registrations.length} registered
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <TextLink href="/organizer/profile">My profile</TextLink>
          <SignOutButton />
        </div>
      </div>

      <Card variant="table">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-mist text-charcoal-soft">
            <tr>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Program</th>
              <th className="px-4 py-3 font-semibold">Idea</th>
              <th className="px-4 py-3 font-semibold">Registered</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-charcoal-muted">
                  No registrations yet.
                </td>
              </tr>
            )}
            {registrations.map((row) => (
              <tr key={row.id} className="border-t border-charcoal/10">
                <td className="whitespace-nowrap px-4 py-3 font-mono font-semibold">{row.code}</td>
                <td className="px-4 py-3 font-semibold">{row.fullName}</td>
                <td className="px-4 py-3">{row.email}</td>
                <td className="px-4 py-3">{row.program}</td>
                <td className="px-4 py-3">{row.idea}</td>
                <td className="px-4 py-3">{formatDate(row.registeredAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
