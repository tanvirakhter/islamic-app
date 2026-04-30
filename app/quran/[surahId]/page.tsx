import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fetchSurah } from "@/lib/api/quran";
import { findSurah, SURAHS } from "@/lib/quran-surahs";
import { getServerTranslator } from "@/lib/i18n/server";
import { toBanglaDigits } from "@/lib/bengali-calendar";
import { cn } from "@/lib/utils";

// Pre-render all 114 surahs at build time — they never change.
export const dynamicParams = false;
export const revalidate = 60 * 60 * 24; // 1 day

export function generateStaticParams() {
  return SURAHS.map((s) => ({ surahId: String(s.number) }));
}

interface Props {
  params: { surahId: string };
}

function parseSurahId(raw: string): number | null {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 1 || n > 114) return null;
  return n;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseSurahId(params.surahId);
  if (id == null) return { title: "Surah not found" };
  const meta = findSurah(id)!;
  return {
    title: `${meta.name} · ${meta.banglaName}`,
    description: `Surah ${meta.name} (${meta.arabicName}) — ${meta.ayahs} ayahs with Bangla translation.`,
  };
}

export default async function SurahPage({ params }: Props) {
  const id = parseSurahId(params.surahId);
  if (id == null) notFound();
  const meta = findSurah(id)!;

  const detail = await fetchSurah(id);
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const num = (n: number | string) =>
    locale === "bn" ? toBanglaDigits(n) : String(n);

  // Surah At-Tawbah (9) is the only surah that does not begin with the basmala.
  const showBismillah = id !== 9 && id !== 1;

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 sm:pt-16">
      <Link
        href="/quran"
        className={cn(
          "inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink",
          fontClass
        )}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        {t("quran.backToList")}
      </Link>

      {/* Surah hero */}
      <header className="mt-6 rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white shadow-elevated sm:p-10">
        <p className={cn("text-xs uppercase tracking-[0.2em] text-brand-100", fontClass)}>
          {t("page.quran.eyebrow")} · {num(meta.number)}
        </p>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <div>
            <h1 className={cn("text-3xl font-semibold tracking-tight sm:text-4xl", fontClass)}>
              {locale === "bn" ? meta.banglaName : meta.name}
            </h1>
            <p className={cn("mt-1 text-sm text-brand-100", fontClass)}>
              {locale === "bn" ? meta.name : meta.banglaName} ·{" "}
              {meta.revelation === "Meccan" ? t("quran.meccan") : t("quran.medinan")} ·{" "}
              {num(meta.ayahs)} {t("page.quran.ayahs")}
            </p>
          </div>
          <p
            dir="rtl"
            lang="ar"
            className="shrink-0 font-arabic text-4xl tracking-tight sm:text-5xl"
          >
            {meta.arabicName}
          </p>
        </div>
      </header>

      {/* Bismillah block — shown above every surah except At-Tawbah and Al-Fatihah
          (whose first ayah is the basmala itself, so we don't double it). */}
      {showBismillah && (
        <Card className="mt-6 text-center">
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic text-2xl leading-[2.2] text-ink sm:text-3xl"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
          <p className={cn("mt-2 text-xs text-ink-muted", fontClass)}>
            {t("quran.bismillah")}
          </p>
        </Card>
      )}

      {/* Ayah list */}
      <ol className="mt-6 grid gap-4">
        {detail.ayahs.map((a) => (
          <li key={a.numberInSurah}>
            <Card>
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
                  {num(a.numberInSurah)}
                </span>
                <span className={cn("text-xs uppercase tracking-wider text-ink-muted", fontClass)}>
                  {num(meta.number)}:{num(a.numberInSurah)}
                </span>
              </div>

              <p
                dir="rtl"
                lang="ar"
                className="mt-4 font-arabic text-2xl leading-[2.4] text-ink sm:text-3xl"
              >
                {a.arabic}
              </p>

              {/* Primary translation follows the active locale. */}
              <p
                lang={locale === "bn" ? "bn" : "en"}
                className={cn(
                  "mt-4 text-base leading-relaxed text-ink-soft",
                  locale === "bn" ? "font-bangla" : ""
                )}
              >
                {locale === "bn"
                  ? a.bangla
                  : a.english
                  ? `“${a.english}”`
                  : a.bangla}
              </p>

              {/* Secondary translation — show the *other* language as well so users
                  who toggle locales still see both translations side-by-side. */}
              {locale === "bn" && a.english && (
                <p className="mt-2 text-sm italic leading-relaxed text-ink-muted">
                  “{a.english}”
                </p>
              )}
              {locale === "en" && (
                <p className="mt-2 font-bangla text-sm leading-relaxed text-ink-muted">
                  {a.bangla}
                </p>
              )}
            </Card>
          </li>
        ))}
      </ol>

      {/* Prev / next surah navigation */}
      <nav className="mt-8 flex items-center justify-between gap-3">
        {id > 1 ? (
          <Link
            href={`/quran/${id - 1}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm hover:bg-black/[0.03]",
              fontClass
            )}
          >
            ← {findSurah(id - 1)?.[locale === "bn" ? "banglaName" : "name"]}
          </Link>
        ) : (
          <span />
        )}
        {id < 114 ? (
          <Link
            href={`/quran/${id + 1}`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm hover:bg-black/[0.03]",
              fontClass
            )}
          >
            {findSurah(id + 1)?.[locale === "bn" ? "banglaName" : "name"]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
