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
  title: "Auric",
  description: "Gold savings on autopilot.",
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
