import { Card } from "@/ui/components/Card";

export function RegistrationConfirmed({ code }: { code: string }) {
  return (
    <Card variant="form" className="p-8 text-center">
      <div role="status">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-forest-soft">You are in</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-forest">Registration confirmed</h2>
        <p className="mt-4 text-charcoal-soft">Show this code at the door:</p>
        <p className="mt-2 inline-block rounded-card bg-gold/30 px-5 py-3 font-mono text-2xl font-bold">{code}</p>
      </div>
    </Card>
  );
}
