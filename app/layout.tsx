import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { getServerLocale } from "@/lib/i18n/server";
import { SplashScreen } from "@/components/SplashScreen";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// SEO defaults — every route inherits these unless it exports its own metadata.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noor Bangladesh — Quran, Prayer Times & Islamic Guides",
    template: "%s · Noor Bangladesh",
  },
  description:
    "A modern Islamic web app for Bangladesh: Quran with Bangla translation, accurate prayer times, Ramadan timetables, and Hajj/Umrah guides.",
  keywords: [
    "Bangladesh prayer times",
    "Quran Bangla",
    "Ramadan timetable Bangladesh",
    "Hajj guide",
    "Umrah guide",
    "Islamic app",
    "নামাজের সময়",
  ],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: "Noor Bangladesh",
    title: "Noor Bangladesh",
    description:
      "Quran with Bangla translation, prayer times for every Bangladesh city, and trusted Hajj/Umrah guides.",
    url: siteUrl,
  },
  twitter: { card: "summary_large_image", title: "Noor Bangladesh" },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#047857",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the user's locale on the server so the very first paint matches the toggle.
  const locale = getServerLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      {/*
        Body is tinted (surface-alt) so the rounded-top <main> reads as a
        distinct "card" sitting under the navbar. The Navbar stays sticky and
        translucent above; the gap between its bottom edge and the card's
        rounded corners lets the body color show through.
      */}
      <body className="min-h-dvh bg-surface-alt antialiased">
        <LanguageProvider initialLocale={locale}>
          {/* Plays on every fresh page load; auto-dismisses and unmounts itself. */}
          <SplashScreen />
          <Navbar />
          {/* `overflow-hidden` is intentionally NOT set here — that would break
              `position: sticky` (e.g. the Zakat summary card). Instead, any
              top-level page section that paints its own background clips its
              own top corners with `rounded-t-3xl`. */}
          {/* Downward-only shadow — the navbar must stay shadow-free per design. */}
          <main className="rounded-t-3xl bg-surface shadow-[0_14px_34px_rgba(0,0,0,0.06)]">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
