import { EventDetails } from "@/ui/features/EventDetails";
import { RegistrationForm } from "@/ui/features/RegistrationForm";

export default function HomePage() {
  return (
    <div className="grid items-start gap-10 md:grid-cols-2">
      <EventDetails />
      <RegistrationForm />
    </div>
  );
}
