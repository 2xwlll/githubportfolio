import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William Eric Olson | Astrophysics & AI Research",
  description:
    "William Eric Olson is a UTSA physics student researching AGN ionization cones, machine-learning methods for astronomical imaging, and radio technosignatures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
