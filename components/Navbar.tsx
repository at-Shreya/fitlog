"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

const navLinks = [
  { name: "Workouts", href: "/" },
  { name: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, isLoaded } = useFitLog();

  return (
    <nav className="border-b border-[#202329] bg-[#0d0f12]">
      <div className="mx-auto flex min-h-[64px] max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
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

        {/* Navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-[#ccff00] text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Plan and Saved */}
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-gray-300 transition hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 font-bold text-black">
              {isLoaded ? plan.length : 0}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-gray-300 transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a3f46] px-1.5 text-gray-300">
              {isLoaded ? saved.length : 0}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}