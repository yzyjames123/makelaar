import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Makelaar Match | Find Your Dutch Home",
    template: "%s | Makelaar Match",
  },
  description:
    "The expat-first platform for buying your Dutch home. Connect with vetted local buyers' agents, use free financial tools, and navigate the Dutch housing market in English.",
  keywords: [
    "expat",
    "Netherlands",
    "Dutch housing",
    "buyers agent",
    "makelaar",
    "home buying",
    "mortgage calculator",
    "30% ruling",
  ],
  authors: [{ name: "Makelaar Match" }],
  creator: "Makelaar Match",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Makelaar Match",
    title: "Makelaar Match | Find Your Dutch Home",
    description:
      "The expat-first platform for buying your Dutch home. Connect with vetted local buyers' agents and navigate the Dutch housing market in English.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Makelaar Match | Find Your Dutch Home",
    description:
      "The expat-first platform for buying your Dutch home. Connect with vetted local buyers' agents.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Makelaar Match",
  description:
    "The expat-first platform for buying your Dutch home. Connect with vetted local buyers' agents and navigate the Dutch housing market in English.",
  applicationCategory: "RealEstateApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  author: {
    "@type": "Organization",
    name: "Makelaar Match",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakartaSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
