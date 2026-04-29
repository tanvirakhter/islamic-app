import { getServerLocale } from "@/lib/i18n/server";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
}

// Shared page-header used across feature pages — keeps typography consistent.
export function PageHeader({ eyebrow, title, description }: Props) {
  const locale = getServerLocale();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  return (
    <header className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-20">
      {eyebrow && <p className={`section-title ${fontClass}`}>{eyebrow}</p>}
      <h1
        className={`mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl ${fontClass}`}
      >
        {title}
      </h1>
      {description && (
        <p className={`mt-3 max-w-2xl text-base text-ink-muted sm:text-lg ${fontClass}`}>
          {description}
        </p>
      )}
    </header>
  );
}
