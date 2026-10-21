import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

interface Category {
  id?: string | number;
  _id?: string;
  name?: string;
  nameBn?: string;
  slug?: string;
  [key: string]: unknown;
}

const categoryNames: Record<string, string> = {
  dal: "ডাল",
  chal: "চাল",
  mach: "মাছ",
  mangsho: "মাংস",
  sobji: "সবজি",
  fol: "ফল",
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();

  const [productResponse, categoryResponse] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const products: Product[] = Array.isArray(productResponse)
    ? productResponse
    : Array.isArray(productResponse?.data)
      ? productResponse.data
      : [];

  const categories: Category[] = Array.isArray(categoryResponse)
    ? categoryResponse
    : Array.isArray(categoryResponse?.data)
      ? categoryResponse.data
      : [];

  // API product.category-এর সঙ্গে URL slug মিলিয়ে পণ্য filter করা
  const filteredProducts = products.filter((product) => {
    return (
      String(product.category ?? "").toLowerCase() === normalizedSlug
    );
  });

  const category = categories.find(
    (item) =>
      String(item.slug ?? "").toLowerCase() === normalizedSlug,
  );

  const title =
    category?.nameBn ??
    category?.name ??
    categoryNames[normalizedSlug] ??
    normalizedSlug;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <Link href="/" className="mb-6 inline-block text-green-700">
        ← হোম পেজে ফিরে যাও
      </Link>

      <h1 className="mb-2 text-3xl font-bold">{title}</h1>

      <p className="mb-6 text-gray-600">
        মোট পণ্য: {filteredProducts.length}
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border p-6 text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
}
