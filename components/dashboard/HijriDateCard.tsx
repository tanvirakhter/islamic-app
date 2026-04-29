import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import type { HijriDate } from "@/types";
import { CalendarDays } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import { gregorianToBengali, toBanglaDigits } from "@/lib/bengali-calendar";

interface Props {
  hijri: HijriDate;
  gregorian: string; // "DD-MM-YYYY" from Aladhan
}

export function HijriDateCard({ hijri, gregorian }: Props) {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  // Hero: Hijri (matters most for an Islamic app).
  // Then a stacked secondary block with Bengali (BD) + Gregorian.
  const [d, m, y] = gregorian.split("-").map(Number);
  const gregorianDate = new Date(Date.UTC(y, m - 1, d));
  const gregorianReadable = gregorianDate.toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );

  // Bangabda — derived from the same anchor date so all three calendars stay aligned.
  const bengali = gregorianToBengali(gregorianDate);
  const bengaliDay = locale === "bn" ? bengali.dayBn : String(bengali.day);
  const bengaliMonth = locale === "bn" ? bengali.monthBn : bengali.monthEn;
  const bengaliYear = locale === "bn" ? bengali.yearBn : String(bengali.year);
  const bengaliWeekday = locale === "bn" ? bengali.weekdayBn : bengali.weekdayEn;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("card.today")}</CardTitle>
        <CalendarDays className="h-4 w-4 text-ink-muted" aria-hidden />
      </CardHeader>

      {/* Hijri — primary, large. */}
      <div className="flex items-baseline gap-3">
        <p className="text-5xl font-semibold tracking-tight">{hijri.day}</p>
        <p className="text-lg font-medium text-ink-soft">{hijri.month}</p>
      </div>
      <p className="mt-1 text-sm text-ink-muted">
        {hijri.year} AH · {hijri.weekday}
      </p>

      {/* Bangabda — secondary, kept compact. */}
      <div className="mt-6 border-t border-black/5 pt-4">
        <p className={`section-title ${fontClass}`}>{t("card.bengali")}</p>
        <p className={`mt-1 text-base font-medium text-ink ${fontClass}`}>
          {bengaliDay} {bengaliMonth}, {bengaliYear} {t("card.bengaliSuffix")}
        </p>
        <p className={`text-xs text-ink-muted ${fontClass}`}>{bengaliWeekday}</p>
      </div>

      {/* Gregorian — tertiary. */}
      <div className="mt-4 border-t border-black/5 pt-4">
        <p className="section-title">{t("card.gregorian")}</p>
        <p className={`mt-1 text-sm text-ink-soft ${fontClass}`}>{gregorianReadable}</p>
      </div>
    </Card>
  );
}
