export type PriceChangeDirection = "up" | "down" | "same";

export interface ProductChange {
  dir?: PriceChangeDirection;
  percent?: number;
  value?: number;
  amount?: number;
}

export interface Product {
  id: number | string;
  slug?: string;
  nameBn?: string;
  name?: string;
  category?: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit?: string;
  image?: string;
  today?: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  price?: number;
  previousPrice?: number;
  priceChange?: number;
  priceChangeDir?: "up" | "down" | "same";
  change?: {
    dir?: "up" | "down" | "same";
  };
}

export interface Category {
  id?: string | number;
  slug?: string;
  name?: string;
  nameBn?: string;
  icon?: string;
  categoryIcon?: string;
}
