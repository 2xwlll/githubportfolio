import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "William Eric Olson | Astrophysics & AI Research",
  description:
    "William Eric Olson is an astrophysics undergraduate researcher exploring artificial intelligence, astronomical instrumentation, JWST science, and radio technosignatures.",
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
