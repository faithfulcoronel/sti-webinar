import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STI Creative Events",
  description: "Sample student event registration app built for a seminar demo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <header className="border-b border-forest/10 bg-forest text-cream">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <a href="/" className="font-display text-xl font-bold tracking-tight">
              STI Creative Events
            </a>
            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-forest">
              Demo app · test data only
            </span>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
        <footer className="mx-auto max-w-5xl px-5 pb-10 text-sm text-charcoal/60">
          Sample project for a classroom seminar. Do not enter real student information.
        </footer>
      </body>
    </html>
  );
}
