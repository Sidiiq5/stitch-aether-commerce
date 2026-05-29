import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "STITCH AETHER | Future of Luxury",
  description: "A seamless fusion of artisanal craftsmanship and hyper-technical precision. Redefining high-end horology and wearable telemetry for the digital vanguard.",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth selection:bg-primary/20 selection:text-primary">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased custom-scrollbar`}>
        {/* We delegate client logic to a nested wrapper to keep the root layout as a clean server component */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
