import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { AyatOfDay } from "@/types";
import { BookOpen } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";

export function AyatOfDayCard({ ayat }: { ayat: AyatOfDay }) {
  const { t, locale } = getServerTranslator();

  // Translation shown beneath the Arabic block follows the active locale.
  const translation = locale === "bn" ? ayat.bangla : ayat.english ?? ayat.bangla;
  const translationFont = locale === "bn" ? "font-bangla" : "";

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>{t("card.ayatOfDay")}</CardTitle>
        <span className="flex items-center gap-2 text-xs text-ink-muted">
          <BookOpen className="h-4 w-4" aria-hidden />
          {t("card.surah")} {ayat.surah} · {ayat.surahNumber}:{ayat.ayahNumber}
        </span>
      </CardHeader>

      <p
        dir="rtl"
        lang="ar"
        className="font-arabic text-2xl leading-[2.2] text-ink sm:text-3xl"
      >
        {ayat.arabic}
      </p>

      <p
        lang={locale === "bn" ? "bn" : "en"}
        className={`mt-5 text-base leading-relaxed text-ink-soft ${translationFont}`}
      >
        {locale === "bn" ? translation : `“${translation}”`}
      </p>

      <div className="mt-6">
        <Link
          href="/quran"
          className={`text-sm font-medium text-brand-700 hover:text-brand-800 ${translationFont}`}
        >
          {t("common.readQuran")}
        </Link>
      </div>
    </Card>
  );
}
