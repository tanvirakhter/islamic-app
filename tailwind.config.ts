import type { Config } from "tailwindcss";

// Apple-style design tokens — restrained palette, generous spacing, soft shadows.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep emerald evokes traditional Islamic aesthetics while staying modern.
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        ink: {
          DEFAULT: "#0b0d0e",
          soft: "#1d1d1f",
          muted: "#6e6e73",
          subtle: "#86868b",
        },
        surface: {
          DEFAULT: "#ffffff",
          alt: "#f5f5f7",
          tinted: "#fbfbfd",
        },
      },
      fontFamily: {
        // SF Pro stack first; fall back to system UI fonts for native feel on every OS.
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        arabic: ["Amiri", "Scheherazade New", "Traditional Arabic", "serif"],
        bangla: ["Noto Serif Bengali", "SolaimanLipi", "Kalpurush", "serif"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "20px",
        "3xl": "28px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        elevated: "0 4px 12px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.08)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 20% -10%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(59,130,246,0.10), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
