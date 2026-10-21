export type PriceChangeDirection = "up" | "down" | "same";

export interface ProductChange {
  dir?: PriceChangeDirection;
  percent?: number;
  value?: number;
  amount?: number;
}

export interface Product {
  id: string | number;
  slug?: string;
  name?: string;
  nameBn?: string;
  description?: string;
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
  priceChange?: number;
  priceChangeDir?: PriceChangeDirection;
  change?: ProductChange;
}

export interface Category {
  id?: string | number;
  slug?: string;
  name?: string;
  nameBn?: string;
  icon?: string;
  categoryIcon?: string;
}
