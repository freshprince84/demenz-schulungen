import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demenz-Schulungen",
  description:
    "Barrierefreie Lernplattform für Pflege und Angehörige — Demenz verstehen, Alltag gestalten.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2B5BA8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <SiteHeader />
        <main className="container-app py-8 md:py-12">{children}</main>
      </body>
    </html>
  );
}
