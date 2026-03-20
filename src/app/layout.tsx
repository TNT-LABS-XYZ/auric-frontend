import type { Metadata } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import Auth0ProviderWrapper from "./auth0-provider";

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
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interDisplay.variable} ${ebGaramond.variable} antialiased`}
      >
        <Auth0ProviderWrapper>{children}</Auth0ProviderWrapper>
      </body>
    </html>
  );
}
