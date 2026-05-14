import { CalendarDays } from "lucide-react";
import type { HijriDate } from "@/types";
import { getServerTranslator } from "@/lib/i18n/server";
import { gregorianToBengali } from "@/lib/bengali-calendar";
import {
  hijriEraSuffix,
  localizedHijriDay,
  localizedHijriMonth,
  localizedHijriWeekday,
  localizedHijriYear,
} from "@/lib/hijri";

interface Props {
  hijri: HijriDate;
  gregorian: string; // "DD-MM-YYYY" from Aladhan
}

// "Lapis to Turquoise" gradient — a full blue spectrum sweep used as the
// feature surface for the multi-calendar card.
const LAPIS_TURQUOISE =
  "linear-gradient(160deg, #1B3A8C 0%, #2B5BA8 45%, #3B8FA0 80%, #4AADBE 100%)";

export function HijriDateCard({ hijri, gregorian }: Props) {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  const hijriDay = localizedHijriDay(hijri, locale);
  const hijriMonth = localizedHijriMonth(hijri, locale);
  const hijriYear = localizedHijriYear(hijri, locale);
  const hijriWeekday = localizedHijriWeekday(hijri, locale);
  const hijriEra = hijriEraSuffix(locale);

  const [d, m, y] = gregorian.split("-").map(Number);
  const gregorianDate = new Date(Date.UTC(y, m - 1, d));
  const gregorianReadable = gregorianDate.toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-GB",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" }
  );
  const bengali = gregorianToBengali(gregorianDate);
  const bengaliDay = locale === "bn" ? bengali.dayBn : String(bengali.day);
  const bengaliMonth = locale === "bn" ? bengali.monthBn : bengali.monthEn;
  const bengaliYear = locale === "bn" ? bengali.yearBn : String(bengali.year);
  const bengaliWeekday = locale === "bn" ? bengali.weekdayBn : bengali.weekdayEn;

  // Inline style avoids fighting Tailwind's bg utilities; the surface fully owns
  // its appearance. Text/border colors are tuned for legibility on the deep gradient.
  return (
    <div
      className="rounded-2xl border border-white/10 p-6 text-white shadow-card"
      style={{ background: LAPIS_TURQUOISE }}
    >
      <div className="mb-4 flex items-center justify-between">
        <p
          className={`text-sm font-medium uppercase tracking-[0.14em] text-white/60 ${fontClass}`}
        >
          {t("card.today")}
        </p>
        <CalendarDays className="h-4 w-4 text-white/60" aria-hidden />
      </div>

      {/* Hijri — primary, large. */}
      <div className="flex items-baseline gap-3">
        <p className={`text-5xl font-semibold tracking-tight ${fontClass}`}>{hijriDay}</p>
        <p className={`text-lg font-medium text-white/85 ${fontClass}`}>{hijriMonth}</p>
      </div>
      <p className={`mt-1 text-sm text-white/65 ${fontClass}`}>
        {hijriYear} {hijriEra} · {hijriWeekday}
      </p>

      {/* Bangabda — secondary. */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <p
          className={`text-sm font-medium uppercase tracking-[0.14em] text-white/60 ${fontClass}`}
        >
          {t("card.bengali")}
        </p>
        <p className={`mt-1 text-base font-medium text-white ${fontClass}`}>
          {bengaliDay} {bengaliMonth}, {bengaliYear} {t("card.bengaliSuffix")}
        </p>
        <p className={`text-xs text-white/65 ${fontClass}`}>{bengaliWeekday}</p>
      </div>

      {/* Gregorian — tertiary. */}
      <div className="mt-4 border-t border-white/10 pt-4">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/60">
          {t("card.gregorian")}
        </p>
        <p className={`mt-1 text-sm text-white/80 ${fontClass}`}>{gregorianReadable}</p>
      </div>
    </div>
  );
}
