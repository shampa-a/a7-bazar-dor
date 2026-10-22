export type Direction = "up" | "down" | "same";

/** Raw shape returned by the API. Every field may be missing or duplicated. */
export interface Product {
  id: string | number;
  slug?: string;

  name?: string;
  nameBn?: string;

  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;

  image?: string;
  imageUrl?: string;
  unit?: string;

  price?: number;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  previousPrice?: number;

  /** Absolute change in taka (not a percent). */
  priceChange?: number;
  priceChangeDir?: Direction;

  change?: {
    dir?: Direction;
    /** Unsigned percent; direction comes from `dir`. */
    percent?: number;
  };
}

/** Clean shape the UI reads. Built once by `normalizeProduct`. */
export interface NormalizedProduct {
  id: string | number;
  /** Always a string, safe for `/product/${slug}`. */
  slug: string;
  name: string;
  category?: string;
  /** Emoji, or an image URL / path. */
  visual: string;
  unit?: string;
  today: number | null;
  yesterday: number | null;
  /** Signed percent: positive = rose, negative = fell. */
  changePercent: number;
  direction: Direction;
}
