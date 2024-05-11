// Codes by mahdi tasha
// Importing part
import "@/styles/globals.css"
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils";
import {rootLayoutType} from "@/types";
import {ReactNode} from "react";
import {siteConfig} from "@/configs";
import {Metadata} from "next";
import Image from 'next/image';
import bgLightImage from '@/images/bg-light.jpg';
import bgDarkImage from '@/images/bg-dark.jpg';
import TopMenu from "@/components/topMenu";
import FileMenu from "@/components/fileMenu";
import Tiptap from "@/components/tiptap";
import {Toaster} from "@/components/ui/sonner";

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
        <html lang="en" suppressHydrationWarning className={'dark'}>
            <body className={cn(
                "min-h-screen dark:bg-black bg-white",
                fontSans.className)
            }>
                <Image src={bgLightImage.src} alt={'Background Image'} width={1920} height={1080} className={'fixed top-0 left-0 -z-10 w-screen h-screen object-cover transition-all duration-500 dark:opacity-0 opacity-100'} />
                <Image src={bgDarkImage.src} alt={'Background Image'} width={1920} height={1080} className={'fixed top-0 left-0 -z-10 w-screen h-screen object-cover transition-all duration-500 dark:opacity-100 opacity-0'} />
                <Toaster />
                {children}
            </body>
        </html>
    )
}
