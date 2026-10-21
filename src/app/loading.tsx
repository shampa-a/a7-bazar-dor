export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6">
      <div className="mb-10 rounded-2xl bg-gray-200 p-10 sm:p-16">
        <div className="h-5 w-40 rounded bg-gray-300" />
        <div className="mt-5 h-10 max-w-lg rounded bg-gray-300" />
        <div className="mt-4 h-4 max-w-md rounded bg-gray-300" />
        <div className="mt-6 h-10 w-36 rounded-lg bg-gray-300" />
      </div>

      {[1, 2].map((section) => (
        <section key={section} className="mb-12">
          <div className="mb-5 h-8 w-64 rounded bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="h-24 rounded-xl bg-gray-200" />
                <div className="mt-4 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
                <div className="mt-6 h-6 w-2/3 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
