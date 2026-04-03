import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
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
        brand: {
          "primary-900": "hsl(var(--brand-primary-900))",
          "primary-800": "hsl(var(--brand-primary-800))",
          "primary-700": "hsl(var(--brand-primary-700))",
          "primary-600": "hsl(var(--brand-primary-600))",
          "primary-500": "hsl(var(--brand-primary-500))",
          "primary-400": "hsl(var(--brand-primary-400))",
          "primary-300": "hsl(var(--brand-primary-300))",
          "primary-200": "hsl(var(--brand-primary-200))",
          "primary-100": "hsl(var(--brand-primary-100))",
          "primary-50": "hsl(var(--brand-primary-50))",
          "gold-900": "hsl(var(--brand-gold-900))",
          "gold-800": "hsl(var(--brand-gold-800))",
          "gold-700": "hsl(var(--brand-gold-700))",
          "gold-600": "hsl(var(--brand-gold-600))",
          "gold-500": "hsl(var(--brand-gold-500))",
          "gold-400": "hsl(var(--brand-gold-400))",
          "gold-300": "hsl(var(--brand-gold-300))",
          "gold-200": "hsl(var(--brand-gold-200))",
          "gold-100": "hsl(var(--brand-gold-100))",
          "gold-50": "hsl(var(--brand-gold-50))",
          "neutral-900": "hsl(var(--brand-neutral-900))",
          "neutral-800": "hsl(var(--brand-neutral-800))",
          "neutral-700": "hsl(var(--brand-neutral-700))",
          "neutral-600": "hsl(var(--brand-neutral-600))",
          "neutral-500": "hsl(var(--brand-neutral-500))",
          "neutral-400": "hsl(var(--brand-neutral-400))",
          "neutral-300": "hsl(var(--brand-neutral-300))",
          "neutral-200": "hsl(var(--brand-neutral-200))",
          "neutral-100": "hsl(var(--brand-neutral-100))",
          "neutral-50": "hsl(var(--brand-neutral-50))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        label: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'navbar': 'var(--shadow-navbar)',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
