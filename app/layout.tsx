import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { getServerLocale } from "@/lib/i18n/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// SEO defaults, every route inherits these unless it exports its own metadata.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noor Bangladesh, Quran, Prayer Times & Islamic Guides",
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
        Body background matches the hero tone so content flows continuously
        from the very top, behind the floating translucent navbar.
      */}
      <body className="min-h-dvh bg-[#f4f6f4] antialiased">
        <LanguageProvider initialLocale={locale}>
          <Navbar />
          {/* No card chrome: main is transparent so the page background runs
              edge to edge, up to the top, beneath the floating navbar. */}
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
