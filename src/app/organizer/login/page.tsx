"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

export default function OrganizerLogin() {
  const [state, action, pending] = useActionState(signIn, undefined);
  return (
    <form action={action} className="mx-auto max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-md">
      <h1 className="font-display text-2xl font-bold text-forest">Organizer sign-in</h1>
      <label className="block text-sm font-semibold">
        Email
        <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2" />
      </label>
      <label className="block text-sm font-semibold">
        Password
        <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-charcoal/20 px-3 py-2" />
      </label>
      <button disabled={pending} className="w-full rounded-lg bg-forest px-4 py-3 font-semibold text-cream disabled:opacity-60">
        {pending ? "Signing in..." : "Sign in"}
      </button>
      {state?.error && <p role="alert" className="text-sm text-red-700">{state.error}</p>}
    </form>
  );
}
