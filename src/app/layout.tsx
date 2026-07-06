import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SessionInit } from "@/components/layout/SessionInit";
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
      <body className="flex min-h-dvh flex-col antialiased">
        <SessionInit />
        <SiteHeader />
        <main className="container-app flex-1 py-8 md:py-12">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
