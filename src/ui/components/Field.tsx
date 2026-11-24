import type { ReactNode } from "react";

// Shared look for every form control: default, focus, error (aria-invalid) and disabled.
export const controlClass =
  "mt-1 block min-h-11 w-full rounded-input border border-charcoal/30 bg-white px-3 py-2.5 text-base font-normal text-charcoal " +
  "placeholder:text-charcoal-muted focus:border-forest focus:outline-none focus:ring-[3px] focus:ring-sage " +
  "aria-[invalid=true]:border-2 aria-[invalid=true]:border-error disabled:opacity-60";

// Label above a control, with an optional error message below it.
// TextField, SelectField and TextAreaField are all built on this.
export function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      {children}
      {error && <span className="mt-1 block font-normal text-error">{error}</span>}
    </label>
  );
}
