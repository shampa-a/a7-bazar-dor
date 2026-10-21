
import ProductCard, {
  getPriceChange,
  getPriceDirection,
} from "@/components/ProductCard";
import type { Product } from "@/lib/types";

interface ProductSectionsProps {
  products?: Product[];
}

export default function ProductSections({
  products = [],
}: ProductSectionsProps) {
  const safeProducts = Array.isArray(products)
    ? products
    : [];

  const risers = [...safeProducts]
    .filter((product) => getPriceDirection(product) === "up")
    .sort(
      (a, b) => getPriceChange(b) - getPriceChange(a)
    )
    .slice(0, 6);

  const fallers = [...safeProducts]
    .filter((product) => getPriceDirection(product) === "down")
    .sort(
      (a, b) => getPriceChange(a) - getPriceChange(b)
    )
    .slice(0, 6);

  return (
    <div className="space-y-14 py-10 sm:space-y-16 sm:py-14">
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আজ দাম বেড়েছে{" "}
            <span className="text-green-600">▲</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
          </p>
        </div>

        {risers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {risers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
            বর্তমানে দাম বেড়েছে এমন পণ্যের তথ্য নেই।
          </p>
        )}
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আজ দাম কমেছে{" "}
            <span className="text-red-600">▼</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            আজ যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
          </p>
        </div>

        {fallers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {fallers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
            বর্তমানে দাম কমেছে এমন পণ্যের তথ্য নেই।
          </p>
        )}
      </section>

      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            সব পণ্য
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ তালিকা ও দাম
          </p>
        </div>

        {safeProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {safeProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}
