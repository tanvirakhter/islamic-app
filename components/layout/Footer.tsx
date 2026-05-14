import Link from "next/link";
import { Moon, Compass, BookOpen, Heart } from "lucide-react";
import { getServerTranslator } from "@/lib/i18n/server";
import { cn } from "@/lib/utils";

// Design tokens applied throughout:
//   bg          → bg-emerald-900 (the deep emerald used by the splash backdrop)
//   text        → text-white, with text-white/70 for body & links
//   icon frame  → border border-white/40 rounded-lg p-2
//   col gap     → gap-16 md:gap-24
//   headings    → text-sm font-semibold uppercase tracking-wider
export function Footer() {
  const { t, locale } = getServerTranslator();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <footer className="mt-24 bg-emerald-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-16 md:grid-cols-4 md:gap-24">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="border border-white/40 rounded-lg p-2">
                <Moon className="h-4 w-4 text-white" aria-hidden />
              </span>
              <span className="text-base font-semibold">Noor Bangladesh</span>
            </div>
            <p className={cn("mt-4 max-w-xs text-sm text-white/70", fontClass)}>
              {t("footer.tagline")}
            </p>
          </div>

          <FooterCol icon={Compass} title={t("footer.explore")} fontClass={fontClass}>
            <FooterLink href="/quran" fontClass={fontClass}>{t("nav.quran")}</FooterLink>
            <FooterLink href="/prayer-times" fontClass={fontClass}>{t("nav.prayerTimes")}</FooterLink>
            <FooterLink href="/qibla" fontClass={fontClass}>{t("nav.qibla")}</FooterLink>
            <FooterLink href="/zakat" fontClass={fontClass}>{t("nav.zakat")}</FooterLink>
            <FooterLink href="/ramadan" fontClass={fontClass}>{t("nav.ramadan")}</FooterLink>
          </FooterCol>

          <FooterCol icon={BookOpen} title={t("footer.guides")} fontClass={fontClass}>
            <FooterLink href="/hajj" fontClass={fontClass}>{t("nav.hajj")}</FooterLink>
            <FooterLink href="/umrah" fontClass={fontClass}>{t("nav.umrah")}</FooterLink>
          </FooterCol>

          <FooterCol icon={Heart} title={t("footer.about")} fontClass={fontClass}>
            <p className={cn("text-sm text-white/70", fontClass)}>
              © {new Date().getFullYear()} {t("footer.copyright")}
            </p>
          </FooterCol>
        </div>

        {/* Bottom rule + meta strip */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p className={fontClass}>
            © {new Date().getFullYear()} Noor Bangladesh
          </p>
          <p className={fontClass}>
            {locale === "bn" ? "যত্ন সহকারে তৈরি" : "Built with care"}
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterColProps {
  title: string;
  fontClass: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function FooterCol({ title, icon: Icon, fontClass, children }: FooterColProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="border border-white/40 rounded-lg p-2">
          <Icon className="h-4 w-4 text-white" aria-hidden />
        </span>
        <h3
          className={cn(
            "text-sm font-semibold uppercase tracking-wider text-white",
            fontClass
          )}
        >
          {title}
        </h3>
      </div>
      <ul className="mt-5 grid gap-3">{children}</ul>
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
        className={cn("text-sm text-white/70 transition-colors hover:text-white", fontClass)}
      >
        {children}
      </Link>
    </li>
  );
}
