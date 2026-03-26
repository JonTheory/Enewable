import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Enewable | Solar Power Solutions for South Africa",
  description:
    "Beat Load Shedding with world-class solar installations. Hybrid inverters, lithium-ion batteries, and intelligent monitoring for South African homes and businesses.",
  keywords: [
    "solar panels South Africa",
    "load shedding solution",
    "Eskom alternative",
    "hybrid inverter SA",
    "battery backup",
    "solar installation",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico?v=3", type: "image/x-icon" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png?v=3",
  },
  openGraph: {
    title: "Enewable | Solar Power Solutions for South Africa",
    description: "Beat Load Shedding with world-class solar installations. Hybrid inverters, lithium-ion batteries, and intelligent monitoring for South African homes and businesses.",
    url: "https://enewable.co.za",
    siteName: "Enewable",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 600,
        height: 315,
        alt: "Enewable - Solar Power Solutions for South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enewable | Solar Power Solutions for South Africa",
    description: "Beat Load Shedding with world-class solar installations. Hybrid inverters, lithium-ion batteries, and intelligent monitoring for South African homes and businesses.",
    images: ["/og-image.png"],
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
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
