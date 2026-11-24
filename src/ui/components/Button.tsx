import type { ButtonHTMLAttributes } from "react";

// The buttons from the design. "primary" is the full-width forest button;
// "outline" is the small secondary button. Both have hover, focus and disabled states.
const variants = {
  primary: "min-h-12 w-full bg-forest px-4 py-3 text-cream hover:bg-forest-hover",
  outline: "min-h-11 border border-forest px-4 py-2 text-sm text-forest hover:bg-mist",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants };

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return (
    <button
      {...props}
      className={`rounded-input font-semibold focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sage disabled:opacity-60 ${variants[variant]} ${className}`}
    />
  );
}
