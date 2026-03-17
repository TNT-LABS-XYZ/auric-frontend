import type { Metadata } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const interDisplay = localFont({
  src: "./fonts/InterDisplay.var.woff2",
  variable: "--font-inter",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auric - Gold that works while you sleep",
  description:
    "Set your accumulation rules once. Auric monitors XAU\u20ae markets, evaluates your conditions, and executes on-chain \u2014 while you sleep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interDisplay.variable} ${ebGaramond.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
