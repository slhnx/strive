import { Habit } from "@/app/generated/prisma/client";
import { getHabitColor } from "@/lib/utils";
import { useMemo } from "react";
import ProgressDots from "./progress-dots";

type HabitProgressProps = {
  habitCount: number;
  habit: Habit;
  isCompleted: boolean;
};

const HabitProgress = ({
  habit,
  habitCount,
  isCompleted,
}: HabitProgressProps) => {
  const completionRatio = useMemo(() => {
    return habitCount / habit.frequency;
  }, [habitCount]);

  const habitColors = getHabitColor(habit.color);

  return (
    <div className="habit-progress">
      <div className="my-4">
        <div className="text-xs font-bold text-gray-700 mb-2 uppercase">
          Today's Progress: 0/{habit.frequency}
        </div>
        {habit.frequency > 1 ? (
          <ProgressDots
            current={habitCount}
            total={habit.frequency}
            color={habit.color}
          />
        ) : (
          <div
            className={`h-8 border-3 border-black ${
              isCompleted ? "bg-green-300" : "bg-gray-200"
            } flex items-center justify-center font-bold text-black`}
          >
            {isCompleted ? "✓ COMPLETE" : "INCOMPLETE"}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div
          className={`h-6 border-3 border-black bg-gray-100 overflow-hidden`}
        >
          <div
            className={`h-full ${habitColors.accentColor} border-r-4 border-black transition-all duration-300`}
            style={{ width: `${(habitCount / habit.frequency) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default HabitProgress;
