import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFrame } from "@/ui/features/SiteFrame";
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
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
