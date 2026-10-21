import Link from "next/link";
import type { Product } from "@/lib/types";

export function getPriceChange(product: Product): number {
  if (typeof product.change?.percent === "number") {
    return product.change.percent;
  }

  if (typeof product.priceChange === "number") {
    return product.priceChange;
  }

  const today = Number(product.today ?? product.price);
  const yesterday = Number(
    product.yesterday ?? product.previousPrice
  );

  if (
    !Number.isFinite(today) ||
    !Number.isFinite(yesterday) ||
    yesterday <= 0
  ) {
    return 0;
  }

  return ((today - yesterday) / yesterday) * 100;
}

export function getPriceDirection(
  product: Product
): "up" | "down" | "same" {
  const direction =
    product.priceChangeDir ?? product.change?.dir;

  if (
    direction === "up" ||
    direction === "down" ||
    direction === "same"
  ) {
    return direction;
  }

  const change = getPriceChange(product);

  if (change > 0) return "up";
  if (change < 0) return "down";
  return "same";
}

export function formatBengaliNumber(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

export function getUnitLabel(unit?: string): string {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    kilogram: "প্রতি কেজি",
    g: "প্রতি গ্রাম",
    gram: "প্রতি গ্রাম",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    l: "প্রতি লিটার",
    ml: "প্রতি মিলিলিটার",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
    pc: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    packet: "প্রতি প্যাকেট",
    bag: "প্রতি বস্তা",
  };

  if (!unit) return "প্রতি একক";

  return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const price = Number(product.today ?? product.price ?? 0);
  const change = getPriceChange(product);
  const direction = getPriceDirection(product);

  const name =
    product.nameBn ?? product.name ?? "অজানা পণ্য";

  const href = `/product/${encodeURIComponent(
    product.slug ?? String(product.id)
  )}`;

  const badgeStyles = {
    up: "bg-green-100 text-green-700",
    down: "bg-red-100 text-red-700",
    same: "bg-gray-100 text-gray-600",
  };

  const badgeText = {
    up: "▲",
    down: "▼",
    same: "—",
  };

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:border-green-300 hover:shadow-lg sm:p-5"
      aria-label={`${name} এর বিস্তারিত দেখুন`}
    >
      <div className="mb-4 flex h-24 items-center justify-center rounded-xl bg-[#f5f8ef] text-5xl sm:h-28">
        {product.image &&
        /^https?:\/\//i.test(product.image) ? (
          <span className="text-sm text-gray-500">
            পণ্যের ছবি
          </span>
        ) : (
          product.image ?? product.categoryIcon ?? "🛒"
        )}
      </div>

      <h3 className="text-base font-bold text-gray-800 group-hover:text-green-700 sm:text-lg">
        {name}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        {getUnitLabel(product.unit)}
      </p>

      <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-4">
        <div>
          <p className="text-xs text-gray-500">
            আজকের দাম
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {formatBengaliNumber(price)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${badgeStyles[direction]}`}
        >
          {badgeText[direction]}{" "}
          {formatBengaliNumber(Math.abs(change))}%
        </span>
      </div>
    </Link>
  );
}
