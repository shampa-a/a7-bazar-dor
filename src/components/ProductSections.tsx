import type { Product } from "@/lib/types";
import ProductCard, {
  getPriceChange,
} from "@/components/ProductCard";

interface ProductSectionsProps {
  risingProducts: Product[];
  fallingProducts: Product[];
  allProducts: Product[];
}

interface ProductGridProps {
  products: Product[];
}

function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="col-span-full rounded-xl bg-gray-50 p-6 text-center text-gray-500">
        এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductSections({
  risingProducts,
  fallingProducts,
  allProducts,
}: ProductSectionsProps) {
  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
      {/* Section A: দাম বেড়েছে */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আজ দাম বেড়েছে{" "}
            <span className="text-red-600">▲</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            যেসব পণ্যের দাম আজ বেড়েছে
          </p>
        </div>

        <ProductGrid
          products={[...risingProducts]
            .filter((product) => getPriceChange(product) > 0)
            .sort(
              (a, b) => getPriceChange(b) - getPriceChange(a)
            )
            .slice(0, 6)}
        />
      </section>

      {/* Section B: দাম কমেছে */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আজ দাম কমেছে{" "}
            <span className="text-green-600">▼</span>
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            যেসব পণ্যের দাম আজ কমেছে
          </p>
        </div>

        <ProductGrid
          products={[...fallingProducts]
            .filter((product) => getPriceChange(product) < 0)
            .sort(
              (a, b) => getPriceChange(a) - getPriceChange(b)
            )
            .slice(0, 6)}
        />
      </section>

      {/* Section C: সব পণ্য */}
      <section id="সব-পণ্য" className="scroll-mt-24">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            প্রতিদিনের বাজারের পণ্যের সর্বশেষ দাম দেখুন।
          </p>
        </div>

        <ProductGrid products={allProducts} />
      </section>
    </main>
  );
}