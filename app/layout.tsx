import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// ============================================================
// METADATA - Update with your information
// Prompt: "Update the page title and description for SEO"
// ============================================================
export const metadata: Metadata = {
  title: "Sparring · AI VC Pitch Coach for Crypto Founders",
  description: "Practice your crypto pitch with AI VC partner archetypes. Bilingual EN/中文. Built by a former crypto VC.",
  keywords: ["VC pitch coach", "crypto fundraising", "AI VC simulation", "pitch practice", "Series A pitch", "crypto founder", "VC interview"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
