import Hero from "@/components/Hero";

const Page = () => {
  return (
    <main>
      <Hero />

      <section
        id="library"
        className="mx-auto min-h-[500px] max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8"
      >
        {/* Workout Library will be added here later */}
      </section>
    </main>
  );
};

export default Page;