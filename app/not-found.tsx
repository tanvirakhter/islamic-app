import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getServerTranslator } from "@/lib/i18n/server";

export default function NotFound() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center sm:px-8">
      <p className="section-title">404</p>
      <h1 className={`mt-2 text-4xl font-semibold tracking-tight ${fontClass}`}>
        {t("notFound.title")}
      </h1>
      <p className={`mt-3 text-ink-muted ${fontClass}`}>{t("notFound.description")}</p>
      <Link href="/" className="mt-6">
        <Button>
          <span className={fontClass}>{t("common.backToDashboard")}</span>
        </Button>
      </Link>
    </div>
  );
}
