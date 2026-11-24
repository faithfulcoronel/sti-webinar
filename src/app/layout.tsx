import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "STI Creative Events",
  description: "Sample student event registration app built for a seminar demo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-cream font-sans text-charcoal antialiased">
        <header className="bg-forest text-cream">
          <div className="mx-auto flex min-h-16 max-w-[1024px] flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 lg:px-0">
            <span className="font-display text-lg font-bold md:text-xl">STI Creative Events</span>
            <span className="whitespace-nowrap rounded-full bg-gold px-3 py-1 text-xs font-semibold text-forest">
              Demo app · test data only
            </span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1024px] flex-1 px-5 py-8 md:py-10 lg:px-0">{children}</main>
        <footer className="mx-auto w-full max-w-[1024px] px-5 pb-6 text-sm text-charcoal-muted lg:px-0">
          Sample project for a classroom seminar. Do not enter real student information.
        </footer>
      </body>
    </html>
  );
}
