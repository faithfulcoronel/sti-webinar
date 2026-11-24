import type { ReactNode } from "react";

// A message under a form's button, for problems that are not tied to one field.
export function FormMessage({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-sm text-error">
      {children}
    </p>
  );
}
