"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFitLog } from "@/context/FitLogContext";

type Tab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    isLoaded,
    removeFromPlan,
    removeFromSaved,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const currentWorkouts = activeTab === "today" ? plan : saved;

  // Search by workout name or muscle-group tag
  const filteredWorkouts = currentWorkouts.filter((workout) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return true;

    const matchesName = workout.name
      .toLowerCase()
      .includes(searchText);

    const matchesTag = workout.muscleGroups.some((muscle) =>
      muscle.toLowerCase().includes(searchText)
    );

    return matchesName || matchesTag;
  });

  // Sort workouts
  const sortedWorkouts = [...filteredWorkouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return a.rating - b.rating;
  });

  const handleMarkAsDone = (id: number) => {
    removeFromPlan(id);

    setToast("Workout marked as done");

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromPlan(id);
      setToast("Workout removed from your plan");
    } else {
      removeFromSaved(id);
      setToast("Workout removed from saved");
    }

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSearch("");
  };

  return (
    <main className="mx-auto min-h-screen max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Toast */}
      {toast && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-md border border-[#3a3f46] bg-[#181c22] px-5 py-3 text-xs font-medium text-white shadow-xl">
          <span className="mr-2 text-[#ccff00]">✓</span>
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">
          YOUR WORKOUTS
        </p>

        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
          MY PLAN
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Build your workout plan, save exercises for later, and keep track of
          your training.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Today&apos;s Plan
          </p>

          <p className="mt-2 text-3xl font-extrabold text-white">
            {isLoaded ? plan.length : 0}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Maximum 5 workouts
          </p>
        </div>

        <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Saved
          </p>

          <p className="mt-2 text-3xl font-extrabold text-white">
            {isLoaded ? saved.length : 0}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            Saved for later
          </p>
        </div>

        <div className="rounded-lg border border-[#242830] bg-[#15181e] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500">
            Status
          </p>

          <p className="mt-2 text-lg font-extrabold uppercase text-[#ccff00]">
            {plan.length > 0 ? "Ready" : "Empty"}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {plan.length > 0
              ? "Your plan is ready"
              : "Add workouts to get started"}
          </p>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="mt-10 flex flex-col gap-5 border-b border-[#242830] sm:flex-row sm:items-end sm:justify-between">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => handleTabChange("today")}
            className={`border-b-2 px-1 pb-4 text-xs font-bold uppercase tracking-wide transition ${
              activeTab === "today"
                ? "border-[#ccff00] text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Today&apos;s Plan
            <span className="ml-2 text-[#ccff00]">
              {plan.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("saved")}
            className={`border-b-2 px-1 pb-4 text-xs font-bold uppercase tracking-wide transition ${
              activeTab === "saved"
                ? "border-[#ccff00] text-white"
                : "border-transparent text-gray-500 hover:text-white"
            }`}
          >
            Saved
            <span className="ml-2 text-gray-500">
              {saved.length}
            </span>
          </button>
        </div>

        {/* Sort By */}
        <div className="pb-4">
          <div className="relative">
            <label
              htmlFor="sort"
              className="mr-3 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500"
            >
              Sort By
            </label>

            <div className="relative inline-block">
              <select
                id="sort"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="w-40 appearance-none rounded-md border border-[#343941] bg-[#15181e] px-4 py-2.5 pr-9 text-xs font-medium text-white outline-none transition focus:border-[#ccff00]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                ▼
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6 max-w-md">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by workout name or muscle..."
          className="w-full rounded-md border border-[#343941] bg-[#15181e] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-[#ccff00]"
        />
      </div>

      {/* Workout List */}
      {!isLoaded ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#2a2f36] border-t-[#ccff00]" />

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Loading...
            </p>
          </div>
        </div>
      ) : sortedWorkouts.length === 0 ? (
        <div className="mt-8 rounded-lg border border-[#242830] bg-[#15181e] px-6 py-16 text-center">
          {search ? (
            <>
              <h2 className="text-lg font-extrabold uppercase text-white">
                No workouts found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try searching with a different workout name or muscle group.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-extrabold uppercase text-white">
                {activeTab === "today"
                  ? "Your plan is empty"
                  : "No saved workouts"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {activeTab === "today"
                  ? "Browse the workout library and add exercises to your plan."
                  : "Save workouts from the library to see them here."}
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black transition hover:bg-[#baf000]"
              >
                <span>→</span>
                <span>Browse Workouts</span>
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {sortedWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="overflow-hidden rounded-lg border border-[#242830] bg-[#15181e]"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="relative h-52 w-full shrink-0 bg-[#1b1f25] sm:h-auto sm:w-56 lg:w-64">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {workout.muscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="rounded-full border border-[#343941] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-300"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>

                  <h2 className="mt-3 text-xl font-extrabold uppercase leading-tight text-white sm:text-2xl">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-xs text-gray-500">
                    {workout.equipment}
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#252930] pt-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>◷</span>
                      {workout.duration} min
                    </span>

                    <span className="flex items-center gap-1">
                      <span>🔥</span>
                      {workout.caloriesBurned} kcal
                    </span>

                    <span className="flex items-center gap-1">
                      <span>★</span>
                      {workout.rating}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex flex-col gap-3 sm:mt-auto sm:flex-row sm:items-center">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-md bg-[#ccff00] px-5 py-3 text-center text-[10px] font-bold uppercase text-black transition hover:bg-[#baf000]"
                    >
                      View Details
                    </Link>

                    {activeTab === "today" && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsDone(workout.id)}
                        className="rounded-md border border-[#3a3f46] px-5 py-3 text-[10px] font-bold uppercase text-gray-300 transition hover:border-[#ccff00] hover:text-white"
                      >
                        <span className="mr-2 text-[#ccff00]">
                          ✓
                        </span>
                        Mark as Done
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(workout.id)}
                      className="rounded-md border border-[#3a3f46] px-5 py-3 text-[10px] font-bold uppercase text-gray-400 transition hover:border-red-400 hover:text-red-400"
                    >
                      <span className="mr-2">✕</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}