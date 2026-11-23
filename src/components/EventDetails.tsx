import { EVENT } from "@/lib/event";

export function EventDetails() {
  return (
    <section className="space-y-6">
      <p className="font-display text-sm uppercase tracking-widest text-forest/70">Student event</p>
      <h1 className="font-display text-4xl font-bold leading-tight text-forest sm:text-5xl">
        {EVENT.title}
      </h1>
      <p className="text-xl text-charcoal/80">{EVENT.tagline}</p>

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <dt className="text-charcoal/60">When</dt>
          <dd className="font-semibold">{EVENT.dateLabel}</dd>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <dt className="text-charcoal/60">Where</dt>
          <dd className="font-semibold">{EVENT.venue}</dd>
        </div>
      </dl>

      <p className="text-charcoal/80">{EVENT.about}</p>

      <ol className="space-y-2">
        {EVENT.agenda.map((a) => (
          <li key={a.time} className="flex gap-3 rounded-lg bg-mist px-4 py-3">
            <span className="w-12 font-semibold text-forest">{a.time}</span>
            <span>{a.item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
