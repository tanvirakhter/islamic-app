import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { findSurah } from "@/lib/quran-surahs";
import { getServerTranslator } from "@/lib/i18n/server";
import { toBanglaDigits } from "@/lib/bengali-calendar";
import { cn } from "@/lib/utils";

// Curated, widely-recited surahs, a friendly on-ramp into the reader.
const FEATURED = [36, 55, 67, 18, 56, 2];

export function FeaturedSurahs() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const num = (n: number | string) =>
    locale === "bn" ? toBanglaDigits(n) : String(n);

  const surahs = FEATURED.map(findSurah).filter(
    (s): s is NonNullable<typeof s> => Boolean(s)
  );

  return (
    <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
      <SectionHeading
        title={t("dashboard.featuredTitle")}
        subtitle={t("dashboard.featuredSubtitle")}
        fontClass={fontClass}
        action={
          <Link
            href="/quran"
            className={cn("text-sm font-medium text-brand-700 hover:text-brand-800", fontClass)}
          >
            {t("common.viewAll")} →
          </Link>
        }
      />

      {/* Horizontal snap strip, scrolls on mobile, fits on wide screens. */}
      <div className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {surahs.map((s) => (
          <Link
            key={s.number}
            href={`/quran/${s.number}`}
            className="group w-44 shrink-0 snap-start rounded-2xl border border-black/5 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                {num(s.number)}
              </span>
              <span dir="rtl" lang="ar" className="font-arabic text-2xl text-ink">
                {s.arabicName}
              </span>
            </div>
            <p className={cn("mt-4 font-medium text-ink", fontClass)}>
              {locale === "bn" ? s.banglaName : s.name}
            </p>
            <p className={cn("text-xs text-ink-muted", fontClass)}>
              {num(s.ayahs)} {t("page.quran.ayahs")}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
