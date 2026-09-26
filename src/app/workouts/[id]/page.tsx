"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workout");
        }

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        setError("Could not load workout details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-[1400px] px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500">Loading workout...</p>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="mx-auto max-w-[1400px] px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-red-400">
          {error || "Workout not found."}
        </p>

        <Link
          href="/"
          className="mt-5 inline-flex rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black"
        >
          Back to Library
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      {/* Back to Library */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-500 transition hover:text-white"
      >
        <span>←</span>
        <span>Back to Library</span>
      </Link>

      {/* Main Details Layout */}
      <section className="grid overflow-hidden rounded-lg border border-[#242830] bg-[#15181e] lg:grid-cols-2">
        {/* LEFT - IMAGE */}
        <div className="relative min-h-[360px] bg-[#1b1f25] sm:min-h-[500px] lg:min-h-[700px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT - CONTENT */}
        <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
          {/* Category */}
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-[#343941] px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-300"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="max-w-[650px] text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[650px] text-sm leading-6 text-gray-400 sm:text-base">
            {workout.description}
          </p>

          {/* Key Specs */}
          <div className="mt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              KEY SPECS
            </p>

            <div className="overflow-hidden rounded-md border border-[#292e35]">
              {/* Equipment */}
              <div className="grid grid-cols-[1fr_1.4fr] border-b border-[#292e35]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Equipment
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  {workout.equipment}
                </div>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-[1fr_1.4fr] border-b border-[#292e35]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Difficulty
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  {workout.difficulty}
                </div>
              </div>

              {/* Sets */}
              <div className="grid grid-cols-[1fr_1.4fr] border-b border-[#292e35]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Sets
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  {workout.sets}
                </div>
              </div>

              {/* Reps */}
              <div className="grid grid-cols-[1fr_1.4fr] border-b border-[#292e35]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Reps
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  {workout.reps}
                </div>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-[1fr_1.4fr] border-b border-[#292e35]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Duration
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  {workout.duration} min
                </div>
              </div>

              {/* Calories */}
              <div className="grid grid-cols-[1fr_1.4fr] border-b border-[#292e35]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Calories
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  {workout.caloriesBurned} kcal
                </div>
              </div>

              {/* Rating */}
              <div className="grid grid-cols-[1fr_1.4fr]">
                <div className="bg-[#111419] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Rating
                </div>
                <div className="px-4 py-3 text-sm text-gray-200">
                  ★ {workout.rating}
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              INSTRUCTIONS
            </p>

            <ol className="space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-sm leading-6 text-gray-400"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-xs font-extrabold text-black">
                    {index + 1}
                  </span>

                  <span className="pt-0.5">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3.5 text-xs font-bold uppercase text-black transition hover:bg-[#baf000]"
            >
              <span>+</span>
              <span>Add to today&apos;s plan</span>
            </button>

            <button
              type="button"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#3a3f46] bg-transparent px-5 py-3.5 text-xs font-bold uppercase text-gray-300 transition hover:border-[#ccff00] hover:text-white"
            >
              <span>♡</span>
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}