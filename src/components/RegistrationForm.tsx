"use client";

import { useState } from "react";
import { PROGRAM_OPTIONS, validateRegistration, type FieldErrors } from "@/lib/validation";

const inputCls = "mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2";

export function RegistrationForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    // Quick check in the browser for fast feedback...
    const local = validateRegistration(data);
    if (!local.ok) return setErrors(local.errors);
    setErrors({});

    // ...but the server checks everything again.
    setBusy(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 201) return setCode(json.code);
      if (json.errors) return setErrors(json.errors);
      setFormError(json.error ?? "Something went wrong. Please try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (code) {
    return (
      <div role="status" className="rounded-2xl bg-white p-8 text-center shadow-md">
        <p className="text-sm font-semibold uppercase tracking-widest text-forest/70">You are in</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-forest">Registration confirmed</h2>
        <p className="mt-4 text-charcoal/70">Show this code at the door:</p>
        <p className="mt-2 inline-block rounded-xl bg-gold/30 px-5 py-3 font-mono text-2xl font-bold">
          {code}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
      <h2 className="font-display text-2xl font-bold text-forest">Reserve your seat</h2>

      <label className="block text-sm font-semibold">
        Full name
        <input name="fullName" autoComplete="name" className={inputCls} aria-invalid={!!errors.fullName} />
        {errors.fullName && <span className="mt-1 block font-normal text-red-700">{errors.fullName}</span>}
      </label>

      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} />
        {errors.email && <span className="mt-1 block font-normal text-red-700">{errors.email}</span>}
      </label>

      <label className="block text-sm font-semibold">
        Program
        <select name="program" className={inputCls} aria-invalid={!!errors.program} defaultValue="">
          <option value="">Choose one</option>
          {PROGRAM_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        {errors.program && <span className="mt-1 block font-normal text-red-700">{errors.program}</span>}
      </label>

      <label className="block text-sm font-semibold">
        What would you like to build? (optional)
        <textarea name="idea" rows={3} maxLength={300} className={inputCls} />
        {errors.idea && <span className="mt-1 block font-normal text-red-700">{errors.idea}</span>}
      </label>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <button
        disabled={busy}
        className="w-full rounded-lg bg-forest px-4 py-3 font-semibold text-cream hover:bg-forest/90 disabled:opacity-60"
      >
        {busy ? "Saving..." : "Register"}
      </button>
      {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
    </form>
  );
}
