import { redirect } from "next/navigation";
import { getProfileView } from "@/business/organizerProfile";
import { OrganizerNotAllowed } from "@/ui/features/OrganizerNotAllowed";
import { OrganizerProfileForm } from "@/ui/features/OrganizerProfileForm";

export const dynamic = "force-dynamic";

export default async function OrganizerProfilePage() {
  const view = await getProfileView();

  if (view.status === "signed-out") redirect("/organizer/login");
  if (view.status === "not-allowed") return <OrganizerNotAllowed email={view.email} />;
  return <OrganizerProfileForm profile={view.profile} />;
}
