
import Link from "next/link";

type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

const Navlinks = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const navs: Category[] = await response.json();

  return (
    <nav className="flex flex-wrap items-center gap-4">
      {navs.map((nav) => (
        <Link
          key={nav.id}
          href={`/category/${nav.slug}`}
          className="flex items-center gap-1 hover:text-green-600"
        >
          <span>{nav.icon}</span>
          <span>{nav.nameBn}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
