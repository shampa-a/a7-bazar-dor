import type { Product } from "@/lib/types";

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor";

function findProducts(value: unknown): Product[] {
  if (Array.isArray(value)) {
    const isProductArray = value.some(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        ("nameBn" in item || "slug" in item || "today" in item)
    );

    if (isProductArray) {
      return value as Product[];
    }

    for (const item of value) {
      const result = findProducts(item);
      if (result.length > 0) return result;
    }

    return [];
  }

  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;

    for (const key of ["data", "products", "result", "results"]) {
      if (key in obj) {
        const result = findProducts(obj[key]);
        if (result.length > 0) return result;
      }
    }
  }

  return [];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Products API failed: ${response.status}`);
  }

  const json: unknown = await response.json();
  const products = findProducts(json);

  console.log("Products API response:", JSON.stringify(json).slice(0, 1500));
  console.log("Products found:", products.length);

  return products;
}
export async function getCategories() {
  const response = await fetch(`${API_URL}/categories`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Categories API failed: ${response.status}`);
  }

  return response.json();
}

export async function getCategory(slug: string) {
  const response = await fetch(`${API_URL}/categories/${slug}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Category API failed: ${response.status}`);
  }

  return response.json();
}