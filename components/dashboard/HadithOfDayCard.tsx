import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { HadithOfDay } from "@/types";
import { Quote } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";

export function HadithOfDayCard({ hadith }: { hadith: HadithOfDay }) {
  const { t, locale } = getServerTranslator();
  const translation = locale === "bn" ? hadith.bangla : hadith.english ?? hadith.bangla;
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("card.hadithOfDay")}</CardTitle>
        <Quote className="h-4 w-4 text-ink-muted" aria-hidden />
      </CardHeader>

      {hadith.arabic && (
        <p dir="rtl" lang="ar" className="font-arabic text-xl leading-[2] text-ink">
          {hadith.arabic}
        </p>
      )}

      <p
        lang={locale === "bn" ? "bn" : "en"}
        className={`mt-4 text-base leading-relaxed text-ink-soft ${fontClass}`}
      >
        {locale === "bn" ? translation : `“${translation}”`}
      </p>

      <p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink-muted">
        {hadith.collection} · {hadith.reference}
      </p>
    </Card>
  );
}
