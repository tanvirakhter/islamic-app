import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

// Calm closing banner with a verse on the remembrance of Allah (Ar-Ra'd 13:28).
// "Night Ocean" gradient suits the contemplative tone.
const NIGHT_OCEAN =
  "linear-gradient(150deg, #0F1F5C 0%, #0D2D4A 40%, #0B3B3B 100%)";

export function ClosingCta() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8">
      <div
        className="relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white shadow-elevated sm:px-12 sm:py-20"
        style={{ background: NIGHT_OCEAN }}
      >
        {/* Soft radial glow for depth */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand-400/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl">
          <p dir="rtl" lang="ar" className="font-arabic text-2xl leading-[2.2] sm:text-4xl">
            الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
          </p>

          <p className={cn("mt-6 text-base leading-relaxed text-white/85 sm:text-lg", fontClass)}>
            {locale === "bn" ? t("cta.verse") : `“${t("cta.verse")}”`}
          </p>

          <p className={cn("mt-3 text-xs uppercase tracking-[0.18em] text-white/55", fontClass)}>
            {t("cta.reference")}
          </p>

          <Link
            href="/quran"
            className={cn(
              "mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-emerald-900 transition hover:bg-white/90",
              fontClass
            )}
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            {t("cta.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
