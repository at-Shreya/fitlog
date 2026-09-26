import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#202329] bg-[#0d0f12]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 px-5 py-7 sm:px-7 md:flex-row lg:px-10">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />

          <span className="text-sm font-extrabold tracking-wide text-white sm:text-base">
            FITLOG
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-center text-[11px] text-gray-500 sm:text-xs">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}