import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NoiseLayer } from "@/components/effects/NoiseLayer"
import { GridLayer } from "@/components/effects/GridLayer/GridLayer"
import { AnimatedLinesLayer } from "@/components/effects/AnimatedLinesLayer/AnimatedLinesLayer"
import { ScanlineLayer } from "@/components/effects/ScanlineLayer/ScanlineLayer"

// Define fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Cyberpunk Tech Noir",
  description: "A cyberpunk themed layout with glitch effects",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${orbitron.variable} ${robotoMono.variable}`}>
      <body className={`font-mono bg-black text-white overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
