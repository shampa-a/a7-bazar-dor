import type { NormalizedProduct } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

interface ProductGridProps {
  products: NormalizedProduct[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-500">
        {emptyMessage}
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
