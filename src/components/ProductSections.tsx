import ProductCard from "./ProductCard";
import { getPriceChange } from "./ProductCard";
import type { Product } from "@/lib/types";

type ProductSectionsProps = {
products: Product[];
};

export default function ProductSections({
products,
}: ProductSectionsProps) {
const list = Array.isArray(products) ? products : [];

const risers = [...list]
.filter((product) => getPriceChange(product) > 0)
.sort(
(a, b) => getPriceChange(b) - getPriceChange(a)
)
.slice(0, 6);

const fallers = [...list]
.filter((product) => getPriceChange(product) < 0)
.sort(
(a, b) => getPriceChange(a) - getPriceChange(b)
)
.slice(0, 6);

const sections = [
{
title: "আজ দাম বেড়েছে ▲",
subtitle: "যেসব পণ্যের দাম বেড়েছে",
items: risers,
},
{
title: "আজ দাম কমেছে ▼",
subtitle: "যেসব পণ্যের দাম কমেছে",
items: fallers,
},
{
title: "সব পণ্য",
subtitle: "নিত্যপ্রয়োজনীয় সব পণ্যের বর্তমান দাম দেখুন",
items: list,
},
];

return ( <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
{sections.map((section, index) => (
<section
key={section.title}
id={index === 2 ? "সব-পণ্য" : undefined}
className="mb-14 scroll-mt-24"
> <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
{section.title} </h2>

      <p className="mb-6 mt-2 text-sm text-gray-500 sm:text-base">
        {section.subtitle}
      </p>

  {section.items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center text-gray-500">
          {index === 2
            ? "কোনো পণ্য পাওয়া যায়নি।"
            : "বর্তমানে পর্যাপ্ত মূল্য পরিবর্তনের তথ্য নেই।"}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </section>
  ))}
</div>


);
}
