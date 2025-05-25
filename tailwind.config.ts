import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        noise: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "10%": { transform: "translateX(-5%) translateY(-5%)" },
          "20%": { transform: "translateX(-10%) translateY(5%)" },
          "30%": { transform: "translateX(5%) translateY(-10%)" },
          "40%": { transform: "translateX(-5%) translateY(15%)" },
          "50%": { transform: "translateX(-10%) translateY(5%)" },
          "60%": { transform: "translateX(15%) translateY(0)" },
          "70%": { transform: "translateX(0) translateY(10%)" },
          "80%": { transform: "translateX(-15%) translateY(-5%)" },
          "90%": { transform: "translateX(10%) translateY(5%)" },
          "100%": { transform: "translateX(5%) translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        noise: "noise 8s steps(10) infinite",
      },
      fontFamily: {
        display: ["var(--font-orbitron)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
