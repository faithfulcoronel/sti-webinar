import type { ButtonHTMLAttributes } from "react";

// The primary button from the design: default, hover, focus and disabled states.
export function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`min-h-12 w-full rounded-input bg-forest px-4 py-3 font-semibold text-cream hover:bg-forest-hover focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sage disabled:opacity-60 ${className}`}
    />
  );
}
