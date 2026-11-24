import Link from "next/link";
import type { ReactNode } from "react";

// A link to another page of the app, in the design's forest color.
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded-input font-semibold text-forest underline underline-offset-4 hover:text-forest-hover focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-sage"
    >
      {children}
    </Link>
  );
}
