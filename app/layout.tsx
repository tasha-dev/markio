// Codes by mahdi tasha
// Importing part
import "@/app/globals.css"
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils";
import {rootLayoutType} from "@/types";
import {ReactNode} from "react";
import {siteConfig} from "@/configs";
import {Metadata} from "next";

// Defining fonts
const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
})

// Defining metadata of pages
export const metadata:Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    keywords: ["Markio", "note-taking app", "efficient note-taking", "save notes", "organize notes", "export notes to PDF", "export notes to Markdown", "React app", "Next.js", "Firebase", "Zustand", "Markdown editor", "PDF notes", "personal notes app", "professional notes app", "cloud notes storage"],
    themeColor: '#00000',
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
    }
}

// Creating and exporting root layout component as default
export default function RootLayout({children}: rootLayoutType):ReactNode {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("min-h-screen", fontSans.className)}>
                {children}
            </body>
        </html>
    )
}
