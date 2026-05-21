import Link from "next/link";
import {
  BookOpen,
  Clock,
  Compass,
  Calculator,
  Moon,
  Landmark,
  Route,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { getServerTranslator } from "@/lib/i18n/server";
import type { StringDictionaryKey } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/utils";

interface Tile {
  href: string;
  icon: LucideIcon;
  titleKey: StringDictionaryKey;
  descKey: StringDictionaryKey;
}

// Every feature reachable from one grid, the homepage's navigation hub.
const TILES: Tile[] = [
  { href: "/quran", icon: BookOpen, titleKey: "nav.quran", descKey: "explore.quran" },
  { href: "/prayer-times", icon: Clock, titleKey: "nav.prayerTimes", descKey: "explore.prayerTimes" },
  { href: "/qibla", icon: Compass, titleKey: "nav.qibla", descKey: "explore.qibla" },
  { href: "/zakat", icon: Calculator, titleKey: "nav.zakat", descKey: "explore.zakat" },
  { href: "/ramadan", icon: Moon, titleKey: "nav.ramadan", descKey: "explore.ramadan" },
  { href: "/hajj", icon: Landmark, titleKey: "nav.hajj", descKey: "explore.hajj" },
  { href: "/umrah", icon: Route, titleKey: "nav.umrah", descKey: "explore.umrah" },
];

export function ExploreGrid() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
      <SectionHeading
        title={t("dashboard.exploreTitle")}
        subtitle={t("dashboard.exploreSubtitle")}
        fontClass={fontClass}
        centered
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map(({ href, icon: Icon, titleKey, descKey }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className={cn("font-medium text-ink", fontClass)}>{t(titleKey)}</p>
              <p className={cn("mt-0.5 text-sm text-ink-muted", fontClass)}>{t(descKey)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
