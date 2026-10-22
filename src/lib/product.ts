import type { Direction, NormalizedProduct, Product } from "@/lib/types";

/* ---------- Formatting ---------- */

/** Bengali-digit number, e.g. bn(1850) -> "১,৮৫০", bn(2.1, 1) -> "২.১" */
export function bn(value: number, digits = 0): string {
  return value.toLocaleString("bn-BD", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export const UNIT_LABELS: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  dozen: "ডজন",
  gm: "গ্রাম",
  gram: "গ্রাম",
  packet: "প্যাকেট",
};

export function unitLabel(unit?: string): string {
  if (!unit) return "একক";
  return UNIT_LABELS[unit.toLowerCase()] ?? unit;
}

/* ---------- Emoji ---------- */

// Slugs are guesses: check them against GET /categories and adjust.
const CATEGORY_EMOJI: Record<string, string> = {
  chal: "🍚",
  dal: "🫘",
  tel: "🫙",
  sobji: "🥔",
  mach: "🐟",
  mangsho: "🍗",
  dim: "🥚",
  mosla: "🌶️",
};

/* ---------- Normalization ---------- */

export function normalizeProduct(p: Product): NormalizedProduct {
  const today = p.today ?? p.price ?? null;
  const yesterday = p.yesterday ?? p.previousPrice ?? null;

  const amount =
    p.priceChange ??
    (today !== null && yesterday !== null ? today - yesterday : null);

  const hintedDir = p.priceChangeDir ?? p.change?.dir ?? "same";

  const direction: Direction =
    amount === null
      ? hintedDir
      : amount > 0
        ? "up"
        : amount < 0
          ? "down"
          : "same";

  let changePercent = 0;
  if (amount !== null && yesterday) {
    changePercent = (amount / yesterday) * 100;
  } else if (typeof p.change?.percent === "number") {
    const sign = direction === "down" ? -1 : direction === "up" ? 1 : 0;
    changePercent = Math.abs(p.change.percent) * sign;
  }

  return {
    id: p.id,
    slug: String(p.slug ?? p.id),
    name: p.nameBn ?? p.name ?? "অজানা পণ্য",
    category: p.category,
    visual:
      p.imageUrl ??
      p.image ??
      p.categoryIcon ??
      CATEGORY_EMOJI[p.category ?? ""] ??
      "🛒",
    unit: p.unit,
    today,
    yesterday,
    changePercent,
    direction,
  };
}

/* ---------- Ranking ---------- */

export function topMovers(
  products: NormalizedProduct[],
  direction: "up" | "down",
  count = 6
): NormalizedProduct[] {
  const sign = direction === "up" ? 1 : -1;
  return products
    .filter((p) => p.direction === direction)
    .sort((a, b) => (b.changePercent - a.changePercent) * sign)
    .slice(0, count);
}

/* ---------- Sorting (category page, C1) ---------- */

export type SortKey = "default" | "price-asc" | "price-desc";

export function sortProducts(
  products: NormalizedProduct[],
  key: SortKey
): NormalizedProduct[] {
  if (key === "default") return products;
  const price = (p: NormalizedProduct) => p.today ?? Number.POSITIVE_INFINITY;
  const sign = key === "price-asc" ? 1 : -1;
  return [...products].sort((a, b) => (price(a) - price(b)) * sign);
}
