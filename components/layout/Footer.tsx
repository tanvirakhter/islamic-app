import Link from "next/link";
import { getServerTranslator } from "@/lib/i18n/server";

export function Footer() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <footer className="mt-24 border-t border-black/5 bg-surface-alt/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-4">
        <div>
          <p className="text-base font-semibold">Noor Bangladesh</p>
          <p className={`mt-2 max-w-xs text-sm text-ink-muted ${fontClass}`}>
            {t("footer.tagline")}
          </p>
        </div>

        <FooterCol title={t("footer.explore")}>
          <FooterLink href="/quran">{t("nav.quran")}</FooterLink>
          <FooterLink href="/prayer-times">{t("nav.prayerTimes")}</FooterLink>
          <FooterLink href="/qibla">{t("nav.qibla")}</FooterLink>
          <FooterLink href="/ramadan">{t("nav.ramadan")}</FooterLink>
        </FooterCol>

        <FooterCol title={t("footer.guides")}>
          <FooterLink href="/hajj">{t("nav.hajj")}</FooterLink>
          <FooterLink href="/umrah">{t("nav.umrah")}</FooterLink>
        </FooterCol>

        <FooterCol title={t("footer.about")}>
          <p className={`text-sm text-ink-muted ${fontClass}`}>
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </FooterCol>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="section-title">{title}</p>
      <ul className="mt-3 grid gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-ink hover:text-brand-700">
        {children}
      </Link>
    </li>
  );
}
