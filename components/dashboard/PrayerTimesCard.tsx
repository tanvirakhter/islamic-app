import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { getNextPrayer } from "@/lib/api/prayer-times";
import type { PrayerName, PrayerTime } from "@/types";
import { cn } from "@/lib/utils";
import {
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CloudSun,
  Stars,
  ChevronDown,
} from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import { getRakats, getEndTime, totalRakats } from "@/lib/prayer-info";
import { toBanglaDigits } from "@/lib/bengali-calendar";

interface Props {
  city: string;
  timings: PrayerTime[];
}

const PRAYER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Fajr: Sunrise,
  Sunrise: Sun,
  Dhuhr: CloudSun,
  Asr: Sun,
  Maghrib: Sunset,
  Isha: Moon,
};

function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  if (Number.isNaN(h)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatCountdown(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

export function PrayerTimesCard({ city, timings }: Props) {
  const { t, locale } = getServerTranslator();
  const next = getNextPrayer(timings);
  const fontClass = locale === "bn" ? "font-bangla" : "";

  const prayerName = (name: string) =>
    t(`prayer.${name}` as const as "prayer.Fajr") ?? name;

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>
          {t("card.prayerTimes")} · <span className={fontClass}>{city}</span>
        </CardTitle>
        <Link
          href="/prayer-times"
          className={`text-sm font-medium text-brand-700 hover:text-brand-800 ${fontClass}`}
        >
          {t("common.fullTimetable")}
        </Link>
      </CardHeader>

      {next && (
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-brand-600 p-5 text-white shadow-sm">
          <div>
            <p className={`text-xs uppercase tracking-[0.14em] text-brand-100 ${fontClass}`}>
              {t("card.nextPrayer")}
            </p>
            <p className={`mt-1 text-2xl font-semibold tracking-tight ${fontClass}`}>
              {prayerName(next.prayer.name)}
            </p>
            <p className={`text-sm text-brand-100 ${fontClass}`}>
              {t("card.at")} {to12h(next.prayer.time)}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs uppercase tracking-[0.14em] text-brand-100 ${fontClass}`}>
              {t("card.in")}
            </p>
            <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">
              {formatCountdown(next.minutesUntil)}
            </p>
          </div>
        </div>
      )}

      <p className={`mb-2 text-xs text-ink-muted ${fontClass}`}>
        {t("prayer.tapForDetails")}
      </p>

      {/* Each prayer is a native <details> — accessible, no JS needed.
          Tapping the row reveals rakats and the prayer-window end time. */}
      <ul className="grid gap-2 sm:grid-cols-2">
        {timings.map((p) => {
          const Icon = PRAYER_ICONS[p.name] ?? Stars;
          const isNext = next?.prayer.name === p.name;
          const isSunrise = p.name === "Sunrise";
          const end = getEndTime(p.name as PrayerName, timings);
          const rakats = isSunrise ? [] : getRakats(p.name as PrayerName, locale);
          const total = isSunrise ? 0 : totalRakats(p.name as PrayerName);
          const totalDisplay = locale === "bn" ? toBanglaDigits(total) : String(total);

          return (
            <li key={p.name}>
              <details
                className={cn(
                  "group rounded-xl transition-colors",
                  isNext ? "bg-brand-50 ring-1 ring-brand-200" : "hover:bg-black/[0.03]"
                )}
              >
                <summary
                  className={cn(
                    "flex cursor-pointer items-center justify-between px-4 py-3",
                    "marker:hidden [&::-webkit-details-marker]:hidden"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full",
                        isNext ? "bg-brand-600 text-white" : "bg-surface-alt text-ink-soft"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={cn("text-sm font-medium text-ink", fontClass)}>
                      {prayerName(p.name)}
                    </span>
                  </div>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-sm tabular-nums text-ink-soft">
                      {to12h(p.time)}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-180"
                      aria-hidden
                    />
                  </span>
                </summary>

                <div className="border-t border-black/5 px-4 py-3">
                  {isSunrise ? (
                    <p className={`text-sm text-ink-soft ${fontClass}`}>
                      {t("prayer.sunriseNote")}
                    </p>
                  ) : (
                    <>
                      <div className="flex items-baseline justify-between">
                        <p className={`section-title ${fontClass}`}>
                          {t("prayer.rakats")}
                        </p>
                        <p className={`text-xs text-ink-muted ${fontClass}`}>
                          {totalDisplay} {t("prayer.totalRakats")}
                        </p>
                      </div>
                      <ul className="mt-2 grid gap-1">
                        {rakats.map((r, i) => (
                          <li
                            key={`${p.name}-${i}`}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className={`text-ink ${fontClass}`}>{r.label}</span>
                            <span className={`tabular-nums text-ink-soft ${fontClass}`}>
                              {r.count}{" "}
                              <span className="text-xs text-ink-muted">
                                {t("prayer.rakats")}
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>

                      {end && (
                        <div className="mt-3 flex items-baseline justify-between border-t border-black/5 pt-3">
                          <p className={`section-title ${fontClass}`}>
                            {p.name === "Isha"
                              ? t("prayer.endsAtNextDay")
                              : t("prayer.endsAt")}
                          </p>
                          <p className={`text-sm text-ink ${fontClass}`}>
                            <span className={fontClass}>{prayerName(end.nextPrayer)}</span>{" "}
                            <span className="font-mono tabular-nums text-ink-soft">
                              · {to12h(end.time)}
                            </span>
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
