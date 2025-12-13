// Codes by mahdi tasha
// Importing part
import { RootLayoutProps } from "@/type/component";
import { Metadata } from "next";
import { JSX } from "react";
import "@/style/globals.css";

// Defining metadata
export const metadata: Metadata = {
  title: "HI",
};

// Defining fonts

// Creating and exporting RootLayout component as default
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  // Returning JSX
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
