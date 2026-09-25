import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
}

export default function WorkoutCard({
  id,
  name,
  image,
  muscleGroups,
  equipment,
  duration,
  caloriesBurned,
  rating,
}: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${id}`}
      className="group block overflow-hidden rounded-lg border border-[#242830] bg-[#15181e] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]/40"
    >
      {/* Workout Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#1b1f25]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Category Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full border border-[#343941] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-gray-300"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h3 className="text-base font-extrabold uppercase leading-tight text-white">
          {name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-xs text-gray-500">
          {equipment}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 border-t border-[#252930] pt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <span>◷</span>
            {duration} min
          </span>

          <span className="flex items-center gap-1">
            <span>🔥</span>
            {caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <span>★</span>
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}