"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("today");

  const currentWorkouts = activeTab === "today" ? plan : saved;

  // Calculate total minutes
  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  // Calculate total calories
  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  // Mark workout as done
  const handleMarkAsDone = (id: number) => {
    removeFromPlan(id);
  };

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          YOUR WORKOUT LOG
        </p>

        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Loading State */}
      {!isLoaded ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-gray-500">Loading workouts…</p>
        </div>
      ) : (
        <>
          {/* Metrics Summary */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* Exercises */}
            <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Exercises
              </p>

              <p className="mt-2 text-3xl font-extrabold text-white">
                {plan.length}
              </p>
            </div>

            {/* Minutes */}
            <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Minutes
              </p>

              <p className="mt-2 text-3xl font-extrabold text-white">
                {totalMinutes}
              </p>
            </div>

            {/* Calories */}
            <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
                Calories
              </p>

              <p className="mt-2 text-3xl font-extrabold text-white">
                {totalCalories}
              </p>
            </div>
          </section>

          {/* Tabs */}
          <div className="mt-10 border-b border-[#242830]">
            <div className="flex gap-6">
              {/* Today's Plan */}
              <button
                type="button"
                onClick={() => setActiveTab("today")}
                className={`relative pb-4 text-xs font-bold uppercase tracking-wide transition ${
                  activeTab === "today"
                    ? "text-[#ccff00]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Today&apos;s Plan

                {activeTab === "today" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
                )}
              </button>

              {/* Saved */}
              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`relative pb-4 text-xs font-bold uppercase tracking-wide transition ${
                  activeTab === "saved"
                    ? "text-[#ccff00]"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Saved

                {activeTab === "saved" && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#ccff00]" />
                )}
              </button>
            </div>
          </div>

          {/* Workout List / Empty State */}
          <section className="mt-7">
            {currentWorkouts.length === 0 ? (
              /* Empty State */
              <div className="flex min-h-[360px] flex-col items-center justify-center rounded-lg border border-dashed border-[#30353d] bg-[#15181e] px-6 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ccff00]">
                  NOTHING HERE YET
                </p>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                  Browse the library and add a lift to get today moving.
                </p>

                <Link
                  href="/"
                  className="mt-6 rounded-md bg-[#ccff00] px-6 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#baf000]"
                >
                  Go to workouts
                </Link>
              </div>
            ) : (
              /* Workout Cards */
              <div className="space-y-4">
                {currentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="overflow-hidden rounded-lg border border-[#242830] bg-[#15181e]"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Thumbnail */}
                      <div className="relative h-56 w-full shrink-0 sm:h-auto sm:w-56 lg:w-64">
                        <Image
                          src={workout.image}
                          alt={workout.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 256px"
                          className="object-cover"
                        />
                      </div>

                      {/* Workout Information */}
                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                        <div>
                          {/* Muscle Group Tags */}
                          <div className="mb-3 flex flex-wrap gap-2">
                            {workout.muscleGroups.map((muscle) => (
                              <span
                                key={muscle}
                                className="rounded-full border border-[#343941] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-300"
                              >
                                {muscle}
                              </span>
                            ))}
                          </div>

                          {/* Workout Name */}
                          <h2 className="text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl">
                            {workout.name}
                          </h2>

                          {/* Equipment */}
                          <p className="mt-2 text-xs text-gray-500">
                            {workout.equipment}
                          </p>

                          {/* Stats */}
                          <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[#252930] pt-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <span className="text-gray-300">◷</span>
                              {workout.duration} min
                            </span>

                            <span className="flex items-center gap-1.5">
                              <span className="text-gray-300">🔥</span>
                              {workout.caloriesBurned} kcal
                            </span>

                            <span className="flex items-center gap-1.5">
                              <span className="text-gray-300">★</span>
                              {workout.rating}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
                          {/* View Details */}
                          <Link
                            href={`/workouts/${workout.id}`}
                            className="rounded-md bg-[#ccff00] px-5 py-3 text-center text-[10px] font-bold uppercase text-black transition hover:bg-[#baf000]"
                          >
                            View Details
                          </Link>

                          {/* Mark as Done */}
                          {activeTab === "today" && (
                            <button
                              type="button"
                              onClick={() => handleMarkAsDone(workout.id)}
                              className="rounded-md border border-[#3a3f46] px-5 py-3 text-[10px] font-bold uppercase text-gray-300 transition hover:border-[#ccff00] hover:text-white"
                            >
                              Mark as Done
                            </button>
                          )}

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() =>
                              activeTab === "today"
                                ? removeFromPlan(workout.id)
                                : removeFromSaved(workout.id)
                            }
                            className="flex h-10 w-10 items-center justify-center rounded-md border border-[#3a3f46] text-sm text-gray-500 transition hover:border-red-500 hover:text-red-400"
                            aria-label={`Remove ${workout.name}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}