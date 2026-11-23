"use client";

import { useState } from "react";
import { PROGRAM_OPTIONS } from "@/lib/validation";

// STATE A (scaffold): the form looks finished but is NOT connected to anything yet.
export function RegistrationForm() {
  const [clicked, setClicked] = useState(false);

  return (
    <form
      className="space-y-4 rounded-2xl bg-white p-6 shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        setClicked(true);
      }}
    >
      <h2 className="font-display text-2xl font-bold text-forest">Reserve your seat</h2>

      <label className="block text-sm font-semibold">
        Full name
        <input name="fullName" className="mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2" />
      </label>
      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" className="mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2" />
      </label>
      <label className="block text-sm font-semibold">
        Program
        <select name="program" className="mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2">
          <option value="">Choose one</option>
          {PROGRAM_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-semibold">
        What would you like to build? (optional)
        <textarea name="idea" rows={3} className="mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2" />
      </label>

      <button className="w-full rounded-lg bg-forest px-4 py-3 font-semibold text-cream hover:bg-forest/90">
        Register
      </button>

      {clicked && (
        <p className="rounded-lg bg-gold/30 px-3 py-2 text-sm">
          Scaffold only: this button does nothing yet. Nothing was saved.
        </p>
      )}
    </form>
  );
}
