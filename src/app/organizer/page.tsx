import { redirect } from "next/navigation";
import { getOrganizerView } from "@/business/organizer";
import { OrganizerNotAllowed } from "@/ui/features/OrganizerNotAllowed";
import { RegistrationsList } from "@/ui/features/RegistrationsList";

// Never cache a page full of registrations.
export const dynamic = "force-dynamic";

export default async function OrganizerPage() {
  // The business layer checks who is asking on the server, on every request.
  const view = await getOrganizerView();

  if (view.status === "signed-out") redirect("/organizer/login");
  if (view.status === "not-allowed") return <OrganizerNotAllowed email={view.email} />;
  return <RegistrationsList email={view.email} registrations={view.registrations} />;
}
