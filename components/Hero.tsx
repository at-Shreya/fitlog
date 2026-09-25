import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
      <div className="relative overflow-hidden rounded-lg border border-[#20242b] bg-[#15181e]">
        <div className="grid min-h-[360px] grid-cols-1 items-center lg:grid-cols-2">
          
          {/* Left Content */}
          <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
            
            {/* Eyebrow */}
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-[#ccff00] sm:text-xs">
              WORKOUT LIBRARY
            </p>

            {/* Heading */}
            <h1 className="max-w-[650px] text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Train With Intent. Log Every Set.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[560px] text-sm leading-6 text-gray-400 sm:text-base">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA */}
            <Link
              href="#library"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#baf000] sm:px-6 sm:py-3.5"
            >
              <span>➜</span>
              <span>BROWSE WORKOUTS</span>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative flex min-h-[260px] items-end justify-center lg:min-h-[360px]">
            <Image
              src="/images/banner.png"
              alt="FitLog workout"
              width={700}
              height={450}
              priority
              className="h-auto w-full max-w-[620px] object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}