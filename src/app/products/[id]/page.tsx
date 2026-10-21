
import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";

export const revalidate = 300;

export default async function HomePage() {
  let products: Product[] = [];
  let hasError = false;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load products:", error);
    hasError = true;
  }

  return (
    <main className="min-h-screen bg-[#fdfcf7]">
      <Marquee />

      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {hasError && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
          >
            পণ্যের তথ্য লোড করা যায়নি। অনুগ্রহ করে
            কিছুক্ষণ পর আবার চেষ্টা করুন।
          </div>
        )}

        <ProductSections products={products} />
      </div>
    </main>
  );
}
