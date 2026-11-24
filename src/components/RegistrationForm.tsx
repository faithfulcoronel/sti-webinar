"use client";

import { useState } from "react";
import { PROGRAM_OPTIONS } from "@/lib/event";

// Field styles for every state in the design: default, focus, error (aria-invalid) and disabled.
const field =
  "mt-1 block min-h-11 w-full rounded-input border border-charcoal/30 bg-white px-3 py-2.5 text-base font-normal text-charcoal " +
  "placeholder:text-charcoal-muted focus:border-forest focus:outline-none focus:ring-[3px] focus:ring-sage " +
  "aria-[invalid=true]:border-2 aria-[invalid=true]:border-error disabled:opacity-60";

// Interface only: there is no backend yet, so Register saves nothing.
export function RegistrationForm() {
  const [clicked, setClicked] = useState(false);

  return (
    <form
      noValidate
      className="flex flex-col gap-4 rounded-form bg-white p-6 shadow-form"
      onSubmit={(e) => {
        e.preventDefault();
        setClicked(true);
      }}
    >
      <h2 className="font-display text-2xl font-bold text-forest">Reserve your seat</h2>

      <label className="block text-sm font-semibold">
        Full name
        <input name="fullName" autoComplete="name" placeholder="Maria Santos" className={field} />
      </label>

      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" autoComplete="email" placeholder="maria.test@example.com" className={field} />
      </label>

      <label className="block text-sm font-semibold">
        Program
        <select name="program" defaultValue="" className={field}>
          <option value="">Choose one</option>
          {PROGRAM_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>

      <label className="block text-sm font-semibold">
        What would you like to build? (optional)
        <textarea name="idea" rows={3} maxLength={280} className={`${field} resize-none`} />
      </label>

      <button
        type="submit"
        className="min-h-12 w-full rounded-input bg-forest px-4 py-3 font-semibold text-cream hover:bg-forest-hover focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sage disabled:opacity-60"
      >
        Register
      </button>

      {clicked && (
        <p role="status" className="text-sm text-charcoal-muted">
          Interface only for now. Nothing was saved.
        </p>
      )}
    </form>
  );
}
