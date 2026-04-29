"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { toBanglaDigits } from "@/lib/bengali-calendar";
import {
  calculateZakat,
  NISAB_GOLD_GRAMS,
  NISAB_SILVER_GRAMS,
  type NisabBasis,
} from "@/lib/zakat";
import {
  Banknote,
  Coins,
  TrendingUp,
  Package,
  HandCoins,
  CreditCard,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Reasonable BD market defaults — user can override in the Settings section.
// These are not live prices; the form makes that explicit with the helper text.
const DEFAULT_GOLD_BDT_PER_GRAM = 10_500;
const DEFAULT_SILVER_BDT_PER_GRAM = 130;

// Initial form state. All numeric fields stored as strings to keep input UX
// natural (empty field, partial numbers like "12." while typing).
type Field =
  | "cash"
  | "goldValue"
  | "silverValue"
  | "investments"
  | "businessInventory"
  | "receivables"
  | "shortTermDebts"
  | "goldPerGram"
  | "silverPerGram";

const INITIAL: Record<Field, string> = {
  cash: "",
  goldValue: "",
  silverValue: "",
  investments: "",
  businessInventory: "",
  receivables: "",
  shortTermDebts: "",
  goldPerGram: String(DEFAULT_GOLD_BDT_PER_GRAM),
  silverPerGram: String(DEFAULT_SILVER_BDT_PER_GRAM),
};

const num = (s: string): number => {
  const n = Number(s.replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function ZakatCalculator() {
  const { t, locale } = useLanguage();
  const fontClass = locale === "bn" ? "font-bangla" : "";

  const [values, setValues] = useState<Record<Field, string>>(INITIAL);
  const [basis, setBasis] = useState<NisabBasis>("silver");

  const setField = (k: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const reset = () => {
    setValues(INITIAL);
    setBasis("silver");
  };

  // Live computation — re-runs on every keystroke. Cheap enough to not memo, but
  // useMemo keeps reference stable for the summary card.
  const result = useMemo(
    () =>
      calculateZakat(
        {
          cash: num(values.cash),
          goldValue: num(values.goldValue),
          silverValue: num(values.silverValue),
          investments: num(values.investments),
          businessInventory: num(values.businessInventory),
          receivables: num(values.receivables),
        },
        { shortTermDebts: num(values.shortTermDebts) },
        {
          goldPerGram: num(values.goldPerGram),
          silverPerGram: num(values.silverPerGram),
        },
        basis
      ),
    [values, basis]
  );

  // Money formatter: uses Indian-lakh separators in EN (12,34,567) and Bangla
  // numerals + lakh separators in BN (১২,৩৪,৫৬৭) — natural for BDT amounts.
  const fmt = (n: number): string => {
    const rounded = Math.round(n);
    const enFormatted = new Intl.NumberFormat("en-IN").format(rounded);
    return locale === "bn" ? toBanglaDigits(enFormatted) : enFormatted;
  };

  const fmtGrams = (g: number): string =>
    locale === "bn" ? toBanglaDigits(g.toFixed(2)) : g.toFixed(2);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* ---------- Form ---------- */}
      <div className="grid gap-4">
        <Card>
          <SectionTitle fontClass={fontClass}>{t("zakat.section.assets")}</SectionTitle>
          <div className="mt-4 grid gap-3">
            <MoneyField
              icon={Banknote}
              label={t("zakat.field.cash")}
              hint={t("zakat.field.cashHint")}
              value={values.cash}
              onChange={setField("cash")}
              fontClass={fontClass}
            />
            <MoneyField
              icon={Coins}
              label={t("zakat.field.gold")}
              hint={t("zakat.field.goldHint")}
              value={values.goldValue}
              onChange={setField("goldValue")}
              fontClass={fontClass}
            />
            <MoneyField
              icon={Sparkles}
              label={t("zakat.field.silver")}
              hint={t("zakat.field.silverHint")}
              value={values.silverValue}
              onChange={setField("silverValue")}
              fontClass={fontClass}
            />
            <MoneyField
              icon={TrendingUp}
              label={t("zakat.field.investments")}
              hint={t("zakat.field.investmentsHint")}
              value={values.investments}
              onChange={setField("investments")}
              fontClass={fontClass}
            />
            <MoneyField
              icon={Package}
              label={t("zakat.field.business")}
              hint={t("zakat.field.businessHint")}
              value={values.businessInventory}
              onChange={setField("businessInventory")}
              fontClass={fontClass}
            />
            <MoneyField
              icon={HandCoins}
              label={t("zakat.field.receivables")}
              hint={t("zakat.field.receivablesHint")}
              value={values.receivables}
              onChange={setField("receivables")}
              fontClass={fontClass}
            />
          </div>
        </Card>

        <Card>
          <SectionTitle fontClass={fontClass}>
            {t("zakat.section.liabilities")}
          </SectionTitle>
          <div className="mt-4">
            <MoneyField
              icon={CreditCard}
              label={t("zakat.field.debts")}
              hint={t("zakat.field.debtsHint")}
              value={values.shortTermDebts}
              onChange={setField("shortTermDebts")}
              fontClass={fontClass}
            />
          </div>
        </Card>

        <Card>
          <SectionTitle fontClass={fontClass}>
            {t("zakat.section.settings")}
          </SectionTitle>

          {/* Nisab basis — segmented control. Silver is default & recommended. */}
          <p className={`mt-4 text-sm font-medium text-ink ${fontClass}`}>
            {t("zakat.field.basis")}
          </p>
          <div
            role="radiogroup"
            aria-label={t("zakat.field.basis")}
            className="mt-2 inline-flex rounded-full border border-black/5 bg-surface-alt p-1"
          >
            {(["silver", "gold"] as const).map((b) => (
              <button
                key={b}
                type="button"
                role="radio"
                aria-checked={basis === b}
                onClick={() => setBasis(b)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors",
                  basis === b ? "bg-brand-600 text-white" : "text-ink-soft hover:text-ink",
                  fontClass
                )}
              >
                {b === "silver" ? t("zakat.basis.silver") : t("zakat.basis.gold")}
              </button>
            ))}
          </div>
          <p className={`mt-2 text-xs text-ink-muted ${fontClass}`}>
            {t("zakat.field.basisHint")}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MoneyField
              compact
              label={t("zakat.field.goldPrice")}
              hint={t("zakat.field.priceHint")}
              value={values.goldPerGram}
              onChange={setField("goldPerGram")}
              fontClass={fontClass}
            />
            <MoneyField
              compact
              label={t("zakat.field.silverPrice")}
              hint={t("zakat.field.priceHint")}
              value={values.silverPerGram}
              onChange={setField("silverPerGram")}
              fontClass={fontClass}
            />
          </div>
        </Card>
      </div>

      {/* ---------- Summary (sticky on desktop) ---------- */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <p className={`text-xs uppercase tracking-[0.14em] text-brand-100 ${fontClass}`}>
            {t("zakat.summary.title")}
          </p>

          {result.meetsNisab ? (
            <p className="mt-2 text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
              ৳{fmt(result.zakatDue)}
            </p>
          ) : (
            <>
              <p className="mt-2 text-2xl font-semibold tracking-tight">
                ৳{fmt(0)}
              </p>
              <p className={`mt-2 text-sm text-brand-100 ${fontClass}`}>
                {t("zakat.summary.belowNisab")}
              </p>
            </>
          )}

          <dl className="mt-6 grid gap-3 border-t border-white/15 pt-4 text-sm">
            <Row label={t("zakat.summary.totalAssets")} value={`৳${fmt(result.totalAssets)}`} fontClass={fontClass} />
            <Row label={t("zakat.summary.netWealth")} value={`৳${fmt(result.netWealth)}`} fontClass={fontClass} />
            <Row
              label={t("zakat.summary.nisab")}
              value={`৳${fmt(result.nisabAmount)}`}
              sub={`${fmtGrams(basis === "silver" ? NISAB_SILVER_GRAMS : NISAB_GOLD_GRAMS)} g ${
                basis === "silver" ? t("zakat.basis.silver") : t("zakat.basis.gold")
              }`}
              fontClass={fontClass}
            />
            <Row
              label={t("zakat.summary.zakatDue")}
              value={`৳${fmt(result.zakatDue)}`}
              fontClass={fontClass}
              emphasized
            />
          </dl>

          <div className="mt-6 flex items-center justify-between">
            <p className={`max-w-[200px] text-xs text-brand-100 ${fontClass}`}>
              {t("zakat.summary.note")}
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={reset}
              className="bg-white/15 text-white hover:bg-white/25 border-white/15"
            >
              <span className={fontClass}>{t("zakat.reset")}</span>
            </Button>
          </div>
        </Card>
      </aside>
    </div>
  );
}

// ---------- Subcomponents ----------

function SectionTitle({
  children,
  fontClass,
}: {
  children: React.ReactNode;
  fontClass: string;
}) {
  return <p className={cn("section-title", fontClass)}>{children}</p>;
}

interface MoneyFieldProps {
  icon?: LucideIcon;
  label: string;
  hint: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fontClass: string;
  compact?: boolean;
}

function MoneyField({
  icon: Icon,
  label,
  hint,
  value,
  onChange,
  fontClass,
  compact = false,
}: MoneyFieldProps) {
  return (
    <label className="block">
      <div className="flex items-center gap-2">
        {Icon && !compact && <Icon className="h-4 w-4 text-ink-muted" aria-hidden />}
        <span className={cn("text-sm font-medium text-ink", fontClass)}>{label}</span>
      </div>
      <div className="mt-1.5 flex items-center rounded-xl border border-black/10 bg-white shadow-sm transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/30">
        <span className="border-r border-black/10 px-3 py-2 text-sm font-medium text-ink-muted">
          ৳
        </span>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={value}
          onChange={onChange}
          className="w-full bg-transparent px-3 py-2 text-base tabular-nums text-ink outline-none placeholder:text-ink-subtle"
        />
      </div>
      <p className={cn("mt-1 text-xs text-ink-muted", fontClass)}>{hint}</p>
    </label>
  );
}

function Row({
  label,
  value,
  sub,
  fontClass,
  emphasized,
}: {
  label: string;
  value: string;
  sub?: string;
  fontClass: string;
  emphasized?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={cn("text-brand-100", fontClass)}>{label}</dt>
      <dd className="text-right">
        <p
          className={cn(
            "tabular-nums text-white",
            emphasized ? "text-base font-semibold" : "text-sm"
          )}
        >
          {value}
        </p>
        {sub && (
          <p className={cn("text-xs text-brand-100/80", fontClass)}>{sub}</p>
        )}
      </dd>
    </div>
  );
}
