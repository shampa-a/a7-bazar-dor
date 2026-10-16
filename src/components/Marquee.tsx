import MarqueeText from "react-marquee-text";

interface Product {
  id: number;
  slug?: string;
  nameBn: string;
  image?: string;
  categoryIcon?: string;
  unit: string;
  today: number;
  yesterday?: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const API_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);

const getUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    gram: "গ্রাম",
    piece: "পিস",
    pcs: "পিস",
    dozen: "ডজন",
  };

  return units[unit?.toLowerCase()] ?? unit;
};

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, {
      signal: AbortSignal.timeout(10000),
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const result: unknown = await response.json();

    if (Array.isArray(result)) {
      return result as Product[];
    }

    if (
      typeof result === "object" &&
      result !== null &&
      "data" in result &&
      Array.isArray(result.data)
    ) {
      return result.data as Product[];
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch Bazar Dor products:", error);
    return [];
  }
}

export default async function Marquee() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="w-full border-y border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-500">
        পণ্যের দাম আপাতত পাওয়া যাচ্ছে না।
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white px-2 py-3 text-black">
      <MarqueeText direction="right" duration={20}>
        {products.map((product, index) => {
          const direction =
            product.change?.dir ??
            (product.yesterday === undefined
              ? "flat"
              : product.today > product.yesterday
                ? "up"
                : product.today < product.yesterday
                  ? "down"
                  : "flat");

          const percentage =
            product.change?.pct ??
            (product.yesterday && product.yesterday !== 0
              ? ((product.today - product.yesterday) /
                  product.yesterday) *
                100
              : 0);

          return (
            <span
              key={product.id ?? product.slug ?? index}
              className="mx-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm"
            >
              <span className="text-xl" aria-hidden="true">
                {product.image || product.categoryIcon || "🛒"}
              </span>

              <span className="font-medium">
                {product.nameBn}
              </span>

              <span className="text-sm text-gray-600">
                {formatNumber(product.today)} টাকা/
                {getUnit(product.unit)}
              </span>

              {direction === "up" ? (
                <span
                  className="font-semibold text-green-600"
                  title="দাম বেড়েছে"
                >
                  ▲ {formatNumber(Math.abs(percentage))}%
                </span>
              ) : direction === "down" ? (
                <span
                  className="font-semibold text-red-600"
                  title="দাম কমেছে"
                >
                  ▼ {formatNumber(Math.abs(percentage))}%
                </span>
              ) : (
                <span
                  className="font-semibold text-gray-500"
                  title="দাম অপরিবর্তিত"
                >
                  — ০%
                </span>
              )}

              <span className="text-gray-300" aria-hidden="true">
                •
              </span>
            </span>
          );
        })}
      </MarqueeText>
    </div>
  );
}
