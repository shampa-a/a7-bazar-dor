
import type { Category, Product } from "@/lib/types";

const API_BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

const FETCH_OPTIONS = {
  headers: { Accept: "application/json" },
  next: { revalidate: 300 },
} as const;

type ApiObject = Record<string, unknown>;

function isObject(value: unknown): value is ApiObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isProduct(value: unknown): value is Product {
  if (!isObject(value)) return false;

  return (
    ("id" in value || "slug" in value) &&
    ("nameBn" in value ||
      "name" in value ||
      "today" in value ||
      "price" in value)
  );
}

function extractList<T>(
  response: unknown,
  validate: (item: unknown) => item is T,
): T[] {
  if (Array.isArray(response)) {
    return response.filter(validate);
  }

  if (!isObject(response)) {
    return [];
  }

  // Support common nested API response formats.
  for (const key of [
    "data",
    "products",
    "categories",
    "result",
    "items",
  ]) {
    const nested = response[key];

    if (Array.isArray(nested)) {
      const items = nested.filter(validate);

      if (items.length > 0) {
        return items;
      }
    }

    if (isObject(nested)) {
      const items = extractList(nested, validate);

      if (items.length > 0) {
        return items;
      }
    }
  }

  return [];
}

async function fetchFromApi(
  baseUrl: string,
  path: string,
): Promise<unknown> {
  const response = await fetch(`${baseUrl}${path}`, FETCH_OPTIONS);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const json: unknown = await response.json();

  if (isObject(json)) {
    if (json.status === false || json.success === false) {
      throw new Error(
        typeof json.message === "string"
          ? json.message
          : "API request failed",
      );
    }
  }

  return json;
}

async function fetchList<T>(
  path: string,
  validate: (item: unknown) => item is T,
): Promise<T[]> {
  let lastError: unknown;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetchFromApi(baseUrl, path);
      const items = extractList(response, validate);

      if (items.length > 0) {
        return items;
      }

      lastError = new Error(
        `API returned no valid items: ${baseUrl}${path}`,
      );
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `কোনো API থেকে সঠিক ডেটা পাওয়া যায়নি: ${
      lastError instanceof Error
        ? lastError.message
        : "Unknown error"
    }`,
  );
}

export async function getProducts(
  category?: string,
): Promise<Product[]> {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  return fetchList<Product>(
    `/products${query}`,
    isProduct,
  );
}

export async function getProduct(
  slugOrId: string,
): Promise<Product | null> {
  const path = `/products/${encodeURIComponent(slugOrId)}`;

  for (const baseUrl of API_BASE_URLS) {
    try {
      const response = await fetchFromApi(baseUrl, path);

      // Some APIs return one product directly.
      if (isProduct(response)) {
        return response;
      }

      // Other APIs wrap a single product in data or product.
      if (isObject(response)) {
        for (const key of ["data", "product", "result"]) {
          const value = response[key];

          if (isProduct(value)) {
            return value;
          }

          if (Array.isArray(value)) {
            const found = value.find(isProduct);

            if (found) return found;
          }
        }
      }
    } catch {
      // Try the next API.
    }
  }

  // Fallback: find the product in the full list.
  try {
    const products = await getProducts();

    return (
      products.find(
        (product) =>
          product.slug === slugOrId ||
          String(product.id) === slugOrId,
      ) ?? null
    );
  } catch {
    return null;
  }
}

function isCategory(value: unknown): value is Category {
  if (!isObject(value)) return false;

  return (
    "slug" in value ||
    "id" in value ||
    "nameBn" in value ||
    "name" in value
  );
}

export async function getCategories(): Promise<Category[]> {
  return fetchList<Category>(
    "/categories",
    isCategory,
  );
}
