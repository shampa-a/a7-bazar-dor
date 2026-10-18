import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-white px-4">
      <div className="mx-auto max-w-7xl border-x border-gray-200 bg-[#fdfcf7] px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left content */}
          <div className="order-2 md:order-1">
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800">
              🌿 প্রতিদিনের বাজার, এক নজরে
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম
              <span className="mt-1 block text-green-700">
                এক নজরে
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              শাকসবজি, মাছ, মাংস, ফলমূলসহ নিত্যপ্রয়োজনীয়
              পণ্যের সর্বশেষ দাম জানুন সহজেই। সঠিক দাম
              জেনে বাজার করুন আরও সচেতনভাবে।
            </p>

            <a
              href="#সব-পণ্য"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3.5 font-bold text-white shadow-sm transition duration-200 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200"
            >
              সব পণ্য দেখুন
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Right illustration */}
          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="relative aspect-square w-full max-w-sm">
              <Image
                src="/images/bazar-hero.png"
                alt="বাজারের তাজা ফল ও সবজির ঝুড়ি"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
