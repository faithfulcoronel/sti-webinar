import type { ReactNode } from "react";
import { Badge } from "@/ui/components/Badge";

// The header, content width and footer that every page shares.
export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="bg-forest text-cream">
        <div className="mx-auto flex min-h-16 max-w-[1024px] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 lg:px-0">
          <span className="font-display text-lg font-bold md:text-xl">STI Creative Events</span>
          <Badge>Demo app · test data only</Badge>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-8 md:py-10 lg:px-0">{children}</main>
      <footer className="mx-auto w-full max-w-[1024px] px-5 pb-6 text-sm text-charcoal-muted lg:px-0">
        Sample project for a classroom seminar. Do not enter real student information.
      </footer>
    </>
  );
}
