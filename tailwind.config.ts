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
      // Custom timing for the loader. `spin-slow` rotates the 8-pointed star
      // while `spin-reverse-slow` counter-rotates the dotted outer ring,
      // creating depth without feeling busy. `glow` softly pulses the halo.
      keyframes: {
        "spin-reverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.08)" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "splash-zoom": {
          from: { opacity: "0", transform: "scale(0.6) rotate(-30deg)" },
          to: { opacity: "1", transform: "scale(1) rotate(0deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.7)" },
          "50%": { opacity: "1", transform: "scale(1.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "spin-slower": "spin 12s linear infinite",
        "spin-reverse-slow": "spin-reverse 10s linear infinite",
        "spin-reverse-slower": "spin-reverse 18s linear infinite",
        glow: "glow 2.6s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s ease-out both",
        "splash-zoom": "splash-zoom 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        twinkle: "twinkle 2.6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
