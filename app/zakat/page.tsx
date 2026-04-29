import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ZakatCalculator } from "@/components/zakat/ZakatCalculator";
import { getServerTranslator } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getServerTranslator();
  return {
    title: t("page.zakat.title"),
    description: t("page.zakat.description"),
  };
}

export default function ZakatPage() {
  const { t } = getServerTranslator();

  return (
    <>
      <PageHeader
        eyebrow={t("page.zakat.eyebrow")}
        title={t("page.zakat.title")}
        description={t("page.zakat.description")}
      />
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <ZakatCalculator />
      </section>
    </>
  );
}
