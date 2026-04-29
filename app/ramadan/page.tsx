import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { fetchPrayerTimes } from "@/lib/api/prayer-times";
import { DEFAULT_CITY } from "@/lib/cities";
import { getServerTranslator } from "@/lib/i18n/server";

export const revalidate = 1800;

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("page.ramadan.title"),
    description: t("page.ramadan.title"),
  };
}

export default async function RamadanPage() {
  const data = await fetchPrayerTimes(DEFAULT_CITY.slug);
  const fajr = data.timings.find((tt) => tt.name === "Fajr")?.time ?? "—";
  const maghrib = data.timings.find((tt) => tt.name === "Maghrib")?.time ?? "—";

  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const cityName = locale === "bn" ? DEFAULT_CITY.nameBangla : DEFAULT_CITY.name;

  return (
    <>
      <PageHeader
        eyebrow={t("page.ramadan.eyebrow")}
        title={t("page.ramadan.title")}
        description={`${t("page.ramadan.descriptionPrefix")} ${cityName}${t(
          "page.ramadan.descriptionSuffix"
        )}`}
      />

      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 sm:grid-cols-2 sm:gap-6 sm:px-8">
        <Card>
          <p className={`section-title ${fontClass}`}>{t("page.ramadan.sehriEnds")}</p>
          <p className="mt-3 text-5xl font-semibold tracking-tight">{fajr}</p>
          <p className={`mt-2 text-sm text-ink-muted ${fontClass}`}>
            {t("page.ramadan.sehriHint")}
          </p>
        </Card>
        <Card>
          <p className={`section-title ${fontClass}`}>{t("page.ramadan.iftar")}</p>
          <p className="mt-3 text-5xl font-semibold tracking-tight">{maghrib}</p>
          <p className={`mt-2 text-sm text-ink-muted ${fontClass}`}>
            {t("page.ramadan.iftarHint")}
          </p>
        </Card>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <Card>
          <p className={`section-title ${fontClass}`}>{t("common.note")}</p>
          <p className={`mt-2 text-sm text-ink-soft ${fontClass}`}>
            {t("page.ramadan.fullCalendarNote")}
          </p>
        </Card>
      </section>
    </>
  );
}
