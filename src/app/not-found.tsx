import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
          ERROR 404
        </p>

        <h1 className="mt-4 text-7xl font-extrabold uppercase tracking-tight text-white sm:text-8xl">
          NOT FOUND
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          The page you are looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-6 py-3.5 text-xs font-bold uppercase text-black transition hover:bg-[#baf000]"
        >
          <span>←</span>
          <span>Back to workouts</span>
        </Link>
      </div>
    </main>
  );
}