import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/Card";
import { getServerTranslator } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("page.quran.title"),
    description: t("page.quran.description"),
  };
}

const SURAHS = [
  { number: 1, name: "Al-Fatihah", bangla: "আল-ফাতিহা", ayahs: 7 },
  { number: 2, name: "Al-Baqarah", bangla: "আল-বাকারাহ", ayahs: 286 },
  { number: 3, name: "Aal-E-Imran", bangla: "আলে ইমরান", ayahs: 200 },
  { number: 18, name: "Al-Kahf", bangla: "আল-কাহফ", ayahs: 110 },
  { number: 36, name: "Ya-Sin", bangla: "ইয়াসীন", ayahs: 83 },
  { number: 55, name: "Ar-Rahman", bangla: "আর-রাহমান", ayahs: 78 },
  { number: 67, name: "Al-Mulk", bangla: "আল-মুলক", ayahs: 30 },
  { number: 112, name: "Al-Ikhlas", bangla: "আল-ইখলাস", ayahs: 4 },
];

export default function QuranPage() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <>
      <PageHeader
        eyebrow={t("page.quran.eyebrow")}
        title={t("page.quran.title")}
        description={t("page.quran.description")}
      />
      <section className="mx-auto grid max-w-7xl gap-3 px-5 pb-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {SURAHS.map((s) => (
          <Link key={s.number} href={`/quran/${s.number}`}>
            <Card className="transition hover:-translate-y-0.5 hover:shadow-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-sm font-semibold text-brand-700">
                    {s.number}
                  </span>
                  <div>
                    <p className={`font-medium text-ink ${locale === "bn" ? "font-bangla" : ""}`}>
                      {locale === "bn" ? s.bangla : s.name}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {locale === "bn" ? s.name : s.bangla}
                    </p>
                  </div>
                </div>
                <span className={`text-xs text-ink-muted ${fontClass}`}>
                  {s.ayahs} {t("page.quran.ayahs")}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </>
  );
}
