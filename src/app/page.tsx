import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import type { Product } from "@/lib/types";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

// Extract products from common API response formats.
function extractProducts(response: unknown): Product[] {
  if (Array.isArray(response)) {
    return response as Product[];
  }

  if (typeof response !== "object" || response === null) {
    return [];
  }

  const result = response as {
    data?: unknown;
    products?: unknown;
  };

  if (Array.isArray(result.data)) {
    return result.data as Product[];
  }

  if (Array.isArray(result.products)) {
    return result.products as Product[];
  }

  if (
    typeof result.data === "object" &&
    result.data !== null
  ) {
    const nestedData = result.data as {
      products?: unknown;
    };

    if (Array.isArray(nestedData.products)) {
      return nestedData.products as Product[];
    }
  }

  return [];
}

export default async function Home() {
  let products: Product[] = [];

  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(
        `Products API failed: ${response.status} ${response.statusText}`
      );
    }

    const result: unknown = await response.json();

    products = extractProducts(result);
    console.log(
  "FIRST PRODUCT:",
  JSON.stringify(products[0], null, 2)
);

    console.log("Products fetched:", products.length);

    if (products.length === 0) {
      console.error(
        "No products found. Check the API response structure:",
        JSON.stringify(result).slice(0, 1000)
      );
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Calculate a numeric price change safely.
  const getChange = (product: Product): number => {
    const value = Number(product.priceChange);

    return Number.isFinite(value) ? value : 0;
  };

  // Section A: Products whose prices are increasing.
  const risingProducts = products
    .filter((product) => product.priceChangeDir === "up")
    .sort((a, b) => getChange(b) - getChange(a))
    .slice(0, 6);

  // Section B: Products whose prices are decreasing.
  const fallingProducts = products
    .filter((product) => product.priceChangeDir === "down")
    .sort((a, b) => getChange(a) - getChange(b))
    .slice(0, 6);

  // Section C: All products.
  const allProducts = products;

  return (
    <main className="min-h-screen bg-[#fdfcf7]">
      <Marquee />

      <Hero />

      <ProductSections
        risingProducts={risingProducts}
        fallingProducts={fallingProducts}
        allProducts={allProducts}
      />
    </main>
  );
}
