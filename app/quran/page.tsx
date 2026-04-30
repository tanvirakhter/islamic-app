import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SurahList } from "@/components/quran/SurahList";
import { SURAHS } from "@/lib/quran-surahs";
import { getServerTranslator } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("page.quran.title"),
    description: t("page.quran.description"),
  };
}

export default function QuranPage() {
  const { t } = getServerTranslator();

  return (
    <>
      <PageHeader
        eyebrow={t("page.quran.eyebrow")}
        title={t("page.quran.title")}
        description={t("page.quran.description")}
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        {/* Server renders the static page header + metadata; the list itself
            is a client component to support live keyword search across 114 surahs. */}
        <SurahList surahs={SURAHS} />
      </section>
    </>
  );
}
