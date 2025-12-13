// Codes by mahdi tasha
// Importing part
import { RootLayoutProps } from "@/type/component";
import type { Metadata } from "next";
import { JSX } from "react";
import { Inter } from "next/font/google";
import "@/style/globals.css";
import { cn } from "@/lib/util";

// Defining metadata
export const metadata: Metadata = {
  title: "Markio",
  description: "Your lightweight and simple note taking app.",
  keywords: [
    "Mahdi Tasha",
    "github",
    "front end",
    "coding",
    "note",
    "note taking",
    "online note taking app",
    "online",
    "lightweight",
    "lightweight note taking app",
    "online lightweight note taking app",
    "minimalist",
    "fast",
    "simple",
    "fast idea capture",
  ],
  authors: [{ name: "Mahdi Tasha", url: "https://tasha.vercel.app" }],
  creator: "Mahdi Tasha",
  openGraph: {
    title: "Markio - Lightweight note taking",
    description: "Your lightweight and simple note taking app.",
    url: "https://markio.vercel.app/",
    siteName: "Markio",
    images: [
      {
        url: "../image/og-image.png",
        width: 1200,
        height: 630,
        alt: "Markio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Defining fonts
const interFont = Inter({
  display: "block",
  style: "normal",
  weight: ["300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

// Creating and exporting RootLayout component as default
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  // Returning JSX
  return (
    <html suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground overflow-x-hidden overflow-y-auto",
          interFont.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
