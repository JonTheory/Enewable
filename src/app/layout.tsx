import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enewable | Solar Power Solutions for Johannesburg",
  description:
    "Beat Load Shedding with world-class solar installations. Hybrid inverters, lithium-ion batteries, and intelligent monitoring for Johannesburg homes and businesses.",
  keywords: [
    "solar panels Johannesburg",
    "load shedding solution",
    "Eskom alternative",
    "hybrid inverter South Africa",
    "battery backup JHB",
    "solar installation Gauteng",
  ],
  openGraph: {
    title: "Enewable | Solar Power Solutions for Johannesburg",
    description: "Beat Load Shedding with world-class solar installations. Hybrid inverters, lithium-ion batteries, and intelligent monitoring for Johannesburg homes and businesses.",
    url: "https://enewable.co.za",
    siteName: "Enewable",
    images: [
      {
        url: "https://enewable.co.za/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Enewable Solar Power Solutions",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enewable | Solar Power Solutions for Johannesburg",
    description: "Beat Load Shedding with world-class solar installations. Hybrid inverters, lithium-ion batteries, and intelligent monitoring for Johannesburg homes and businesses.",
    images: ["https://enewable.co.za/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${rajdhani.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
