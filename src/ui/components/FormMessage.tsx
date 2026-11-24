import type { ReactNode } from "react";

// A message under a form's button. "error" for problems that are not tied to one field,
// "success" to confirm that something was saved.
const tones = { error: "text-error", success: "text-forest" };

export function FormMessage({ tone = "error", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <p role={tone === "error" ? "alert" : "status"} className={`text-sm font-semibold ${tones[tone]}`}>
      {children}
    </p>
  );
}
