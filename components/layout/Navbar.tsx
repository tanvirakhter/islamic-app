"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { DictionaryKey } from "@/lib/i18n/dictionary";

// href → translation key. Single source of truth so the mobile drawer reuses it.
const NAV_ITEMS: Array<{ href: string; key: DictionaryKey }> = [
  { href: "/", key: "nav.dashboard" },
  { href: "/quran", key: "nav.quran" },
  { href: "/prayer-times", key: "nav.prayerTimes" },
  { href: "/qibla", key: "nav.qibla" },
  { href: "/zakat", key: "nav.zakat" },
  { href: "/ramadan", key: "nav.ramadan" },
  { href: "/hajj", key: "nav.hajj" },
  { href: "/umrah", key: "nav.umrah" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t, locale } = useLanguage();

  // Bangla labels are visually denser; switch to the bangla font stack when active.
  const linkFont = locale === "bn" ? "font-bangla" : "";

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-600 text-white shadow-sm">
            <Moon className="h-4 w-4" aria-hidden />
          </span>
          <span className="text-base">
            Noor <span className="text-brand-700">Bangladesh</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  active ? "bg-brand-600 text-white" : "text-ink hover:bg-black/5",
                  linkFont
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 md:hidden"
            aria-label={t("nav.toggleAria")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-white/90 backdrop-blur-xl md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-5 py-3 sm:px-8">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm transition-colors",
                    active ? "bg-brand-600 text-white" : "hover:bg-black/5",
                    linkFont
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
