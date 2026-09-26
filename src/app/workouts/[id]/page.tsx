"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

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

  const { addToPlan, saveForLater } = useFitLog();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

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

  const handleAddToPlan = () => {
    if (!workout) return;

    addToPlan(workout);

    setToast("Added to today's plan");

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleSaveForLater = () => {
    if (!workout) return;

    saveForLater(workout);

    setToast("Saved for later");

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[1400px] items-center justify-center px-4">
        <p className="text-sm text-gray-500">Loading workout...</p>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-4 text-center">
        <p className="text-sm text-red-400">
          {error || "Workout not found."}
        </p>

        <Link
          href="/"
          className="mt-5 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#baf000]"
        >
          Back to Library
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-md border border-[#3a3f46] bg-[#181c22] px-5 py-3 text-xs font-medium text-white shadow-xl">
          <span className="mr-2 text-[#ccff00]">✓</span>
          {toast}
        </div>
      )}

      {/* Back Button */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-white"
      >
        <span>←</span>
        <span>Back to Library</span>
      </Link>

      {/* Main Details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Workout Image */}
        <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-[#242830] bg-[#15181e] sm:min-h-[500px] lg:min-h-[700px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Workout Information */}
        <div className="flex flex-col justify-center">
          {/* Muscle Groups */}
          <div className="mb-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full border border-[#343941] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-gray-300"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            {workout.description}
          </p>

          {/* Key Specs */}
          <div className="mt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              KEY SPECS
            </p>

            <div className="overflow-hidden rounded-lg border border-[#242830]">
              <div className="grid grid-cols-2 border-b border-[#242830]">
                <div className="border-r border-[#242830] p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Equipment
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {workout.equipment}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Difficulty
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {workout.difficulty}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 border-b border-[#242830]">
                <div className="border-r border-[#242830] p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Sets
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {workout.sets}
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Reps
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {workout.reps}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3">
                <div className="border-r border-[#242830] p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Duration
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {workout.duration} min
                  </p>
                </div>

                <div className="border-r border-[#242830] p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Calories
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {workout.caloriesBurned} kcal
                  </p>
                </div>

                <div className="p-4">
                  <p className="text-[10px] uppercase text-gray-500">
                    Rating
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    ★ {workout.rating}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              INSTRUCTIONS
            </p>

            <div className="space-y-4">
              {workout.instructions.map((instruction, index) => (
                <div key={index} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#343941] text-xs font-bold text-[#ccff00]">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm leading-6 text-gray-400">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToPlan}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 py-3.5 text-xs font-bold uppercase text-black transition hover:bg-[#baf000]"
            >
              <span>+</span>
              <span>Add to today&apos;s plan</span>
            </button>

            <button
              type="button"
              onClick={handleSaveForLater}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#3a3f46] bg-transparent px-5 py-3.5 text-xs font-bold uppercase text-gray-300 transition hover:border-[#ccff00] hover:text-white"
            >
              <span>♡</span>
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}