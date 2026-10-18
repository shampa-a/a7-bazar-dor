import Link from "next/link";
import type { Product } from "@/lib/types";

type ProductCardProps = {
product: Product;
};

export function formatPrice(value: number): string {
return new Intl.NumberFormat("bn-BD", {
maximumFractionDigits: 2,
}).format(Number.isFinite(value) ? value : 0);
}

// IMPORTANT: Export this function so other components can import it.
export function getPriceChange(product: Product): number {
const currentPrice = Number(product.price);
const previousPrice = Number(product.previousPrice);

if (
product.previousPrice == null ||
!Number.isFinite(currentPrice) ||
!Number.isFinite(previousPrice) ||
previousPrice <= 0
) {
return 0;
}

return (
((currentPrice - previousPrice) / previousPrice) * 100
);
}

export default function ProductCard({
product,
}: ProductCardProps) {
const change = getPriceChange(product);

const badgeClass =
change > 0
? "bg-green-100 text-green-700"
: change < 0
? "bg-red-100 text-red-700"
: "bg-gray-100 text-gray-600";

const arrow =
change > 0 ? "▲" : change < 0 ? "▼" : "—";

return (
<Link
href={`/product/${encodeURIComponent(
        product.slug || String(product.id)
      )}`}
className="group block rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-400 hover:shadow-lg sm:p-5"
> <div className="flex items-start justify-between gap-3"> <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-4xl">
{product.emoji || "🛒"} </div>
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${badgeClass}`}
    >
      {arrow} {formatPrice(Math.abs(change))}%
    </span>
  </div>
  <h3 className="mt-4 line-clamp-2 min-h-12 text-lg font-bold text-gray-800 group-hover:text-green-700">
    {product.name}
  </h3>

<p className="mt-1 text-sm text-gray-500">
    {product.unit || "প্রতি কেজি"}
  </p>

  <div className="mt-4 border-t border-gray-100 pt-3">
    <p className="text-sm text-gray-500">আজকের দাম</p>

    <p className="mt-1 text-2xl font-bold text-gray-900">
      {formatPrice(product.price)}{" "}
      <span className="text-sm font-medium text-gray-600">
        টাকা
      </span>
    </p>
  </div>

  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
    <span className="text-sm font-medium text-green-700">
      বিস্তারিত দেখুন
    </span>

    <span
      aria-hidden="true"
      className="text-lg text-green-600 transition-transform group-hover:translate-x-1"
    >
      
    </span>
  </div>
</Link>


);
}
