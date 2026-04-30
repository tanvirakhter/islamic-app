"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { toBanglaDigits } from "@/lib/bengali-calendar";
import type { Surah } from "@/lib/quran-surahs";
import { cn } from "@/lib/utils";

interface Props {
  surahs: Surah[];
}

// Normalize for forgiving search: lower-case, strip diacritics + apostrophes/hyphens.
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’\-\s]/g, "");
}

export function SurahList({ surahs }: Props) {
  const { t, locale } = useLanguage();
  const [query, setQuery] = useState("");
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const num = (n: number | string) =>
    locale === "bn" ? toBanglaDigits(n) : String(n);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return surahs;
    const nq = normalize(q);
    // Numeric prefix match: "11" → all surahs starting with 11.
    if (/^\d+$/.test(q)) {
      return surahs.filter((s) => String(s.number).startsWith(q));
    }
    return surahs.filter((s) =>
      [s.name, s.banglaName, s.arabicName].some((field) =>
        normalize(field).includes(nq)
      )
    );
  }, [surahs, query]);

  return (
    <>
      <div className="mb-6 flex items-center gap-3">
        <label className="flex flex-1 items-center rounded-full border border-black/10 bg-white shadow-sm focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30">
          <Search className="ml-4 h-4 w-4 text-ink-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("page.quran.searchPlaceholder")}
            aria-label={t("page.quran.searchPlaceholder")}
            className={cn(
              "w-full bg-transparent px-3 py-3 text-sm text-ink outline-none placeholder:text-ink-subtle",
              fontClass
            )}
          />
        </label>
        <p className={cn("hidden whitespace-nowrap text-xs text-ink-muted sm:block", fontClass)}>
          {t("page.quran.surahCount")}
        </p>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <p className={cn("text-sm text-ink-muted", fontClass)}>
            {t("page.quran.noResults")}
          </p>
        </Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <li key={s.number}>
              <Link href={`/quran/${s.number}`} className="block">
                <Card className="transition hover:-translate-y-0.5 hover:shadow-elevated">
                  <div className="flex items-start gap-4">
                    {/* Number badge — diamond-shaped to mirror traditional Mushaf design. */}
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center">
                      <span className="absolute inset-0 rotate-45 rounded-md bg-brand-50" />
                      <span className="relative text-sm font-semibold text-brand-700">
                        {num(s.number)}
                      </span>
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className={cn("truncate font-medium text-ink", fontClass)}>
                        {locale === "bn" ? s.banglaName : s.name}
                      </p>
                      <p className={cn("truncate text-xs text-ink-muted", fontClass)}>
                        {locale === "bn" ? s.name : s.banglaName}
                      </p>
                      <p className={cn("mt-1 text-[11px] uppercase tracking-wider text-ink-muted", fontClass)}>
                        {s.revelation === "Meccan" ? t("quran.meccan") : t("quran.medinan")}{" "}
                        · {num(s.ayahs)} {t("page.quran.ayahs")}
                      </p>
                    </div>

                    <span
                      dir="rtl"
                      lang="ar"
                      className="shrink-0 self-center font-arabic text-2xl text-ink"
                    >
                      {s.arabicName}
                    </span>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
