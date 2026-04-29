import { Card } from "@/components/ui/Card";
import { CalendarClock } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import type { PrayerTime } from "@/types";

interface Props {
  city: string;
  timings: PrayerTime[]; // today's timings — Dhuhr & Asr define the Jumma window
}

function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

// Returns Friday's Date (today if today is Friday, else upcoming Friday) anchored to Asia/Dhaka.
function getFriday(): { date: Date; isToday: boolean } {
  const now = new Date();
  // Determine weekday in Asia/Dhaka, where the app's audience lives.
  const weekdayName = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
  }).format(now);
  const order = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekday = order.indexOf(weekdayName);
  const daysUntilFriday = (5 - weekday + 7) % 7;
  const friday = new Date(now.getTime() + daysUntilFriday * 86_400_000);
  return { date: friday, isToday: daysUntilFriday === 0 };
}

export function JummaCard({ city, timings }: Props) {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  const dhuhr = timings.find((p) => p.name === "Dhuhr")?.time ?? "—";
  const asr = timings.find((p) => p.name === "Asr")?.time ?? "—";

  const { date: friday, isToday } = getFriday();
  const fridayReadable = friday.toLocaleDateString(
    locale === "bn" ? "bn-BD" : "en-GB",
    { timeZone: "Asia/Dhaka", weekday: "long", day: "numeric", month: "long" }
  );

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className={`section-title ${fontClass}`}>{t("jumma.title")}</p>
          <p className={`mt-1 text-2xl font-semibold tracking-tight text-ink ${fontClass}`}>
            {isToday ? t("jumma.today") : t("jumma.upcoming")}
          </p>
          <p className={`mt-1 text-sm text-ink-muted ${fontClass}`}>
            {fridayReadable} · <span className={fontClass}>{city}</span>
          </p>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700">
          <CalendarClock className="h-5 w-5" aria-hidden />
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-surface-alt/60 px-4 py-3">
          <p className={`text-xs uppercase tracking-[0.14em] text-ink-muted ${fontClass}`}>
            {t("jumma.adhan")}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">
            {to12h(dhuhr)}
          </p>
        </div>
        <div className="rounded-xl bg-surface-alt/60 px-4 py-3">
          <p className={`text-xs uppercase tracking-[0.14em] text-ink-muted ${fontClass}`}>
            {t("jumma.latestStart")}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">
            {to12h(asr)}
          </p>
        </div>
      </div>

      <p className={`mt-4 text-sm text-ink-soft ${fontClass}`}>{t("jumma.khutbahNote")}</p>
      <p className={`mt-1 text-xs text-ink-muted ${fontClass}`}>{t("jumma.replacesDhuhr")}</p>
    </Card>
  );
}
