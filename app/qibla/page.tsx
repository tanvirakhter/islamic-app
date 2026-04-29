import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QiblaCompass } from "@/components/qibla/QiblaCompass";
import { getServerTranslator } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("page.qibla.title"),
    description: t("page.qibla.description"),
  };
}

export default function QiblaPage() {
  const { t } = getServerTranslator();

  return (
    <>
      <PageHeader
        eyebrow={t("page.qibla.eyebrow")}
        title={t("page.qibla.title")}
        description={t("page.qibla.description")}
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <QiblaCompass />
      </section>
    </>
  );
}
