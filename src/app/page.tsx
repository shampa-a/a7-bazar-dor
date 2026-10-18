import Marquee from "@/components/Marquee";
import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const response = await getProducts();

  const products = Array.isArray(response?.data)
    ? response.data
    : [];

  return (
    <main>
      <Marquee />
      <Hero />
      <ProductSections products={products} />
    </main>
  );
}