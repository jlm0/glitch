import type React from "react";
import type { Metadata } from "next";
import { Orbitron, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NoiseLayer, GridLayer, AnimatedLinesLayer, ScanlineLayer } from "@/components/effects";

// Define fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sohma - Neural Interface",
  description: "Advanced cyberpunk neural interface with quantum encryption protocols",
  generator: "Next.js + Sohma Design System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${orbitron.variable} ${robotoMono.variable}`}>
      <body className="font-mono bg-black text-white min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          {/* Global cyberpunk background effects */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-800/20" />

            {/* Layered effects */}
            <NoiseLayer
              opacity={0.08}
              animated={false}
            />
            <GridLayer
              opacity={0.04}
              gridSize={25}
            />
            <AnimatedLinesLayer
              opacity={0.06}
              lineCount="normal"
            />
            <ScanlineLayer
              opacity={0.02}
              lineSpacing={6}
            />

            {/* Subtle vignette effect using standard gradients */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
            </div>
          </div>

          {/* App content */}
          <div className="relative z-10 min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
