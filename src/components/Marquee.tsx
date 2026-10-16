
import MarqueeText from "react-marquee-text";
import Image from "next/image";

interface Product {
  id?: string | number;
  title?: string;
  name?: string;
  nameBn?: string;
  image?: string;
  imageUrl?: string;
  image_url?: string;
  thumbnail?: string;
  photo?: string;
}

const Marque = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: unknown = await res.json();

  let products: Product[] = [];

  if (Array.isArray(data)) {
    products = data as Product[];
  } else if (
    typeof data === "object" &&
    data !== null &&
    "data" in data &&
    Array.isArray(data.data)
  ) {
    products = data.data as Product[];
  }

  return (
    <div className="px-4 py-2">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <MarqueeText direction="right" duration={10}>
          {products.map((product, index) => {
            const name =
              product.nameBn ??
              product.title ??
              product.name ??
              "পণ্যের নাম";

            const image =
              product.imageUrl ??
              product.image_url ??
              product.image ??
              product.thumbnail ??
              product.photo;

            return (
              <span
                key={product.id ?? index}
                className="mx-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white px-3 py-2 text-black"
              >
                {/* Product image on the left */}
                {image ? (
                  <Image
                    src={image}
                    alt={name}
                    width={32}
                    height={32}
                    unoptimized
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    🛒
                  </span>
                )}

                {/* Product name */}
                <span className="font-medium">{name}</span>

                {/* Arrows on the right */}
                <span className="ml-1 flex flex-col text-xs leading-none">
                  <span className="text-green-600">▲</span>
                  <span className="text-red-600">▼</span>
                </span>
              </span>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marque;
