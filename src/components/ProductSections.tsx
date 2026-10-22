import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

interface ProductSectionsProps {
  products?: Product[];
}

function getPriceChange(product: Product): number {
  // API-এর today এবং yesterday দিয়ে পরিবর্তন হিসাব
  const today = Number(product.today ?? product.price ?? 0);
  const yesterday = Number(
    product.yesterday ?? product.previousPrice ?? today
  );

  // API-তে priceChange থাকলে সেটি ব্যবহার
  if (product.priceChange !== undefined) {
    return Number(product.priceChange);
  }

  return today - yesterday;
}

function getChangeDirection(product: Product): "up" | "down" | "same" {
  const direction = product.priceChangeDir ?? product.change?.dir;

  if (direction === "up" || direction === "down") {
    return direction;
  }

  const change = getPriceChange(product);

  if (change > 0) return "up";
  if (change < 0) return "down";

  return "same";
}

export default function ProductSections({
  products = [],
}: ProductSectionsProps) {
  // API response থেকে array না এলে error এড়াবে
  const safeProducts = Array.isArray(products) ? products : [];

  const risers = [...safeProducts]
    .filter((product) => getChangeDirection(product) === "up")
    .sort((a, b) => getPriceChange(b) - getPriceChange(a))
    .slice(0, 6);

  const fallers = [...safeProducts]
    .filter((product) => getChangeDirection(product) === "down")
    .sort((a, b) => getPriceChange(a) - getPriceChange(b))
    .slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-10 sm:px-6 lg:px-8">
      {/* Section A: দাম বেড়েছে */}
      <section aria-labelledby="price-risers">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="price-risers"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              আজ দাম বেড়েছে <span className="text-red-600">▲</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
            </p>
          </div>

          <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
            {risers.length}টি পণ্য
          </span>
        </div>

        {risers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map((product) => (
              <ProductCard key={product.id ?? product.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState message="বর্তমানে দাম বেড়েছে এমন পণ্যের তথ্য নেই।" />
        )}
      </section>

      {/* Section B: দাম কমেছে */}
      <section aria-labelledby="price-fallers">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="price-fallers"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              আজ দাম কমেছে <span className="text-green-600">▼</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
            {fallers.length}টি পণ্য
          </span>
        </div>

        {fallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard key={product.id ?? product.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState message="বর্তমানে দাম কমেছে এমন পণ্যের তথ্য নেই।" />
        )}
      </section>

      {/* Section C: সব পণ্য */}
      <section id="সব-পণ্য" aria-labelledby="all-products">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="all-products"
              className="text-2xl font-bold text-gray-900 sm:text-3xl"
            >
              সব পণ্য
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে
            </p>
          </div>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
            মোট {safeProducts.length}টি পণ্য
          </span>
        </div>

        {safeProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {safeProducts.map((product) => (
              <ProductCard key={product.id ?? product.slug} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState message="কোনো পণ্যের তথ্য পাওয়া যায়নি।" />
        )}
      </section>
    </main>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center">
      <p className="text-gray-600">{message}</p>
      <Link
        href="/"
        className="mt-3 inline-block text-sm font-semibold text-green-700 hover:underline"
      >
        আবার চেষ্টা করুন
      </Link>
    </div>
  );
}
