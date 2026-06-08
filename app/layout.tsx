import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  metadataBase: new URL("https://crazyplay.games"),
  title: {
    default: "crazyplay — Free Online Games",
    template: "%s | crazyplay",
  },
  description:
    "Play thousands of free online games instantly. Action, arcade, puzzle, sports, shooting and adventure games — no downloads, no installs. Just click and play.",
  keywords: [
    "free online games",
    "browser games",
    "play games",
    "arcade games",
    "puzzle games",
    "action games",
  ],
  generator: "v0.app",
  openGraph: {
    type: "website",
    siteName: "crazyplay",
    title: "crazyplay — Free Online Games",
    description:
      "Play thousands of free online games instantly. No downloads, no installs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "crazyplay — Free Online Games",
    description:
      "Play thousands of free online games instantly. No downloads, no installs.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
