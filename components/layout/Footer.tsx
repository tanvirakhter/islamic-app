import Link from "next/link";
import { Moon, Facebook, Instagram, Linkedin } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

// X (formerly Twitter) brand mark — lucide doesn't ship it.
function XLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", icon: <Facebook className="h-4 w-4" aria-hidden /> },
  { label: "Instagram", icon: <Instagram className="h-4 w-4" aria-hidden /> },
  { label: "LinkedIn", icon: <Linkedin className="h-4 w-4" aria-hidden /> },
  { label: "X", icon: <XLogo /> },
];

// Floating light-green card footer. Sits inside the page (margins on all sides)
// over the #f4f6f4 page background so it reads as a distinct card.
export function Footer() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6">
      <footer className="overflow-hidden rounded-[20px] bg-[#e8f0e9]">
      <div className="flex flex-col gap-12 p-12 md:flex-row md:items-start md:justify-between">
        {/* Brand */}
        <div className="md:max-w-sm">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#0f3d24] text-white">
              <Moon className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-base text-[#0f3d24]">
              Noor <span className="text-brand-700">Bangladesh</span>
            </span>
          </div>
          <p className={cn("mt-4 max-w-xs text-sm text-[#6b7280]", fontClass)}>
            {t("footer.tagline")}
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#0f3d24] text-white transition-colors hover:bg-[#0c3220]"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns grouped to the right, with a tight gap between them */}
        <div className="flex gap-10 sm:gap-14">
          <FooterCol title={t("footer.explore")} fontClass={fontClass}>
            <FooterLink href="/quran" fontClass={fontClass}>{t("nav.quran")}</FooterLink>
            <FooterLink href="/prayer-times" fontClass={fontClass}>{t("nav.prayerTimes")}</FooterLink>
            <FooterLink href="/qibla" fontClass={fontClass}>{t("nav.qibla")}</FooterLink>
            <FooterLink href="/zakat" fontClass={fontClass}>{t("nav.zakat")}</FooterLink>
            <FooterLink href="/ramadan" fontClass={fontClass}>{t("nav.ramadan")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("footer.guides")} fontClass={fontClass}>
            <FooterLink href="/hajj" fontClass={fontClass}>{t("nav.hajj")}</FooterLink>
            <FooterLink href="/umrah" fontClass={fontClass}>{t("nav.umrah")}</FooterLink>
            <FooterLink href="/learn/shahada" fontClass={fontClass}>{t("nav.learn")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("footer.information")} fontClass={fontClass}>
            <FooterLink href="/about" fontClass={fontClass}>{t("footer.about")}</FooterLink>
            <FooterLink href="/privacy" fontClass={fontClass}>{t("footer.privacy")}</FooterLink>
            <FooterLink href="/terms" fontClass={fontClass}>{t("footer.terms")}</FooterLink>
          </FooterCol>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-12 flex justify-center border-t border-[#d1d5db] py-5">
        <p className={cn("text-center text-[13px] text-[#6b7280]", fontClass)}>
          © {year} {t("footer.bottomLeft")}
        </p>
      </div>
      </footer>
    </div>
  );
}

function FooterCol({
  title,
  fontClass,
  children,
}: {
  title: string;
  fontClass: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3
        className={cn(
          "mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#374151]",
          fontClass
        )}
      >
        {title}
      </h3>
      <ul>{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  fontClass,
}: {
  href: string;
  children: React.ReactNode;
  fontClass: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block text-sm leading-[2] text-[#4b5563] transition-colors hover:text-[#0f3d24]",
          fontClass
        )}
      >
        {children}
      </Link>
    </li>
  );
}
