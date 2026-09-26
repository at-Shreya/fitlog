"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
}

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        // Keep the loader visible for a short time
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setWorkouts(data);
      } catch (error) {
        setError("Could not load workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mb-8 sm:mb-10">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          WORKOUTS
        </p>

        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading Animation */}
      {loading && (
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2a2f36] border-t-[#ccff00]" />

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
            Loading workouts...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-6 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Workout Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              id={workout.id}
              name={workout.name}
              image={workout.image}
              muscleGroups={workout.muscleGroups}
              equipment={workout.equipment}
              duration={workout.duration}
              caloriesBurned={workout.caloriesBurned}
              rating={workout.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
}