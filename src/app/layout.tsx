import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://githubportfolio-tan.vercel.app"),
  title: "William Eric Olson | Astrophysics & AI Research",
  description:
    "William Eric Olson is a UTSA physics student researching AGN ionization cones, machine-learning methods for astronomical imaging, and radio technosignatures.",
  openGraph: {
    title: "William Eric Olson | Astrophysics & AI Research",
    description: "AGN ionization cones, astronomical machine learning, and radio technosignature research at UTSA and Breakthrough Listen.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col">{children}<AnalyticsEvents /><Analytics /></body>
    </html>
  );
}
