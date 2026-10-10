import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARVAN Fintech",
  description: "AI-assisted options trading platform with risk controls and paper trading workflows.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-[#07111F] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
