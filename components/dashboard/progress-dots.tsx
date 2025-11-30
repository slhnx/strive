"use client";
import { getHabitColor } from "@/lib/utils";

type ProgressDotsProps = {
  current: number;
  total: number;
  color: string;
}

const ProgressDots = ({ current, total, color }: ProgressDotsProps) => {
  const { accentColor } = getHabitColor(color);

  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-12 h-12 border-4 border-black flex items-center justify-center font-bold text-lg transition-all ${
            index < current
              ? `${accentColor} text-black`
              : "bg-gray-200 text-gray-400"
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}

export default ProgressDots;