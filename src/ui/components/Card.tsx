import type { ReactNode } from "react";

// White surfaces from the design. "form" is the large card (radius 16); "info" is the small one (radius 12).
const variants = {
  form: "rounded-form bg-white p-6 shadow-form",
  info: "rounded-card bg-white p-4 shadow-card",
};

export function Card({
  variant = "info",
  className = "",
  children,
}: {
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}
