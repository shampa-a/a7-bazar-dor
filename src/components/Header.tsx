import Image from "next/image";
import Link from "next/link";
import Navlinks from "./Navlinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white px-3 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-3">
          {/* Logo and Date */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3"
          >
            <Image
              className="shrink-0 rounded-full bg-green-100 p-1.5 sm:p-2"
              src="/images/logo-icon.png"
              alt="Bazar Dor Logo"
              width={48}
              height={48}
              priority
            />

            <div className="min-w-0">
              <h1 className="text-lg font-bold text-green-700 sm:text-2xl">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-500 sm:text-sm">
                {date}
              </p>
            </div>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/signin"
              className="rounded-lg border border-green-600 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-50 sm:px-5 sm:text-sm"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 sm:px-5 sm:text-sm"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-4 border-t border-gray-200 pt-3">
          <nav
            aria-label="প্রধান নেভিগেশন"
            className="flex justify-center overflow-x-auto"
          >
            <div className="w-full">
              <Navlinks />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
