import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let response;

  try {
    response = await getProduct(id);
  } catch {
    notFound();
  }

  const product = response.data;

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">
          {product.name}
        </h1>

        <p className="mt-4 text-gray-500">
          আজকের দাম
        </p>

        <p className="mt-2 text-3xl font-bold text-green-700">
          {product.price} টাকা
        </p>
      </div>
    </main>
  );
}