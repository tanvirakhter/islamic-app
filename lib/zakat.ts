// Zakat calculator math — pure, no DOM/i18n. UI handles formatting & labels.
//
// Reference figures (Hanafi school, the prevailing fiqh in Bangladesh):
//   • Zakat rate: 2.5% of net zakatable wealth held for one lunar year (hawl).
//   • Nisab thresholds:
//       - Gold:   87.48 g (≈ 7.5 tola)
//       - Silver: 612.36 g (≈ 52.5 tola)
//     Silver nisab is lower, so when a person owns mixed assets the silver
//     basis is recommended — it benefits more poor people.

export const ZAKAT_RATE = 0.025;
export const NISAB_GOLD_GRAMS = 87.48;
export const NISAB_SILVER_GRAMS = 612.36;

export type NisabBasis = "silver" | "gold";

export interface ZakatAssets {
  cash: number;            // bank + on-hand + mobile wallets
  goldValue: number;       // BDT value of personally-owned gold (jewellery + bullion)
  silverValue: number;     // BDT value of silver
  investments: number;     // stocks / funds at current market value
  businessInventory: number;
  receivables: number;     // loans you've given out, expected to be repaid
}

export interface ZakatLiabilities {
  shortTermDebts: number;  // due within ~12 months: rent, bills, loan instalments
}

export interface ZakatPrices {
  goldPerGram: number;     // BDT
  silverPerGram: number;   // BDT
}

export interface ZakatResult {
  totalAssets: number;
  netWealth: number;
  nisabAmount: number;
  basisGrams: number;
  meetsNisab: boolean;
  zakatDue: number;
}

export function calculateZakat(
  assets: ZakatAssets,
  liabilities: ZakatLiabilities,
  prices: ZakatPrices,
  basis: NisabBasis
): ZakatResult {
  const totalAssets =
    assets.cash +
    assets.goldValue +
    assets.silverValue +
    assets.investments +
    assets.businessInventory +
    assets.receivables;

  const netWealth = Math.max(0, totalAssets - liabilities.shortTermDebts);

  const basisGrams = basis === "silver" ? NISAB_SILVER_GRAMS : NISAB_GOLD_GRAMS;
  const pricePerGram = basis === "silver" ? prices.silverPerGram : prices.goldPerGram;
  const nisabAmount = basisGrams * pricePerGram;

  const meetsNisab = netWealth >= nisabAmount;
  const zakatDue = meetsNisab ? netWealth * ZAKAT_RATE : 0;

  return {
    totalAssets,
    netWealth,
    nisabAmount,
    basisGrams,
    meetsNisab,
    zakatDue,
  };
}
