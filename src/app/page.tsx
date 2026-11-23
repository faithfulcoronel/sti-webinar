import { EventDetails } from "@/components/EventDetails";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function HomePage() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <EventDetails />
      <RegistrationForm />
    </div>
  );
}
