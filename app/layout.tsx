import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/seo/json-ld";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://knowledgegainers.in"),
  title: {
    default: "Knowledge Gainers - Engineering, EAPCET, Exam Papers & Notifications",
    template: "%s | Knowledge Gainers",
  },
  description:
    "Your trusted platform for engineering resources, EAPCET exam papers, latest notifications, current affairs, and general knowledge in Andhra Pradesh and Telangana.",
  keywords: [
    "knowledge gainers",
    "engineering",
    "EAPCET",
    "exam papers",
    "notifications",
    "Andhra Pradesh",
    "Telangana",
    "education",
    "competitive exams",
    "study materials",
  ],
  authors: [{ name: "Knowledge Gainers Team" }],
  creator: "Knowledge Gainers",
  publisher: "Knowledge Gainers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Knowledge Gainers - Learn, Prepare, Succeed",
    description:
      "Access thousands of engineering books, previous exam papers, and latest job notifications. Join the community of knowledge seekers.",
    url: "https://knowledgegainers.in",
    siteName: "Knowledge Gainers",
    images: [
      {
        url: "/Kg-logo.jpeg", // Absolute URL is safer for some parsers
        width: 1200,
        height: 630,
        alt: "Knowledge Gainers - Learn, Prepare, Succeed",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowledge Gainers",
    description:
      "Your one-stop destination for study materials, exam papers, and job updates.",
    creator: "@knowledgegainers", // Update if actual handle exists
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Placeholder - user should update
  },
};

export const viewport = {
  themeColor: "#3b82f6", // Matching the primary blue color
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          suppressHydrationWarning
        >
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Knowledge Gainers",
              url: "https://knowledgegainers.in",
              logo: "https://knowledgegainers.in/logo.png", // Ensure logo exists
              sameAs: [
                "https://www.facebook.com/share/17qjS9JHVA",
                "https://www.instagram.com/thetelugutechwala",
                "https://youtube.com/@NaniCreationsInTelugu",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91 63008 73822",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["en", "te"],
              },
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Knowledge Gainers",
              url: "https://knowledgegainers.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://knowledgegainers.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }}
          />
          <main className="flex-1">{children}</main>
          <WhatsAppButton />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
