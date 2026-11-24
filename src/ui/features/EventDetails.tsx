import { EVENT } from "@/business/event";
import { Card } from "@/ui/components/Card";

export function EventDetails() {
  return (
    <section className="flex flex-col gap-5 md:gap-6">
      <p className="font-display text-sm uppercase tracking-[0.15em] text-forest-soft">Student event</p>
      <h1 className="font-display text-4xl font-bold leading-[1.1] text-forest md:text-5xl md:leading-[1.1]">
        {EVENT.title}
      </h1>
      <p className="text-xl text-charcoal-soft">{EVENT.tagline}</p>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <Card>
          <dt className="text-charcoal-muted">When</dt>
          <dd className="font-semibold">{EVENT.dateLabel}</dd>
        </Card>
        <Card>
          <dt className="text-charcoal-muted">Where</dt>
          <dd className="font-semibold">{EVENT.venue}</dd>
        </Card>
      </dl>

      <p className="leading-normal text-charcoal-soft">{EVENT.about}</p>

      <ol className="flex flex-col gap-2">
        {EVENT.agenda.map((entry) => (
          <li key={entry.time} className="flex gap-3 rounded-input bg-mist px-4 py-3">
            <span className="w-12 shrink-0 font-semibold text-forest">{entry.time}</span>
            <span>{entry.item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
