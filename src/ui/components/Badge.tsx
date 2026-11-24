import type { ReactNode } from "react";

// The gold pill from the header.
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-full bg-gold px-3 py-1 text-xs font-semibold text-forest">
      {children}
    </span>
  );
}
