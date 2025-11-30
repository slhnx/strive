import { Habit } from "@/app/generated/prisma/client";
import { cn, getHabitColor } from "@/lib/utils";
import ProgressDots from "./progress-dots";
import { Button } from "../ui/button";

type HabitCardProps = {
  habit: Habit;
};

const HabitCard = ({ habit }: HabitCardProps) => {
  const habitColors = getHabitColor(habit.color);
  const isCompleted = false; // Placeholder for completion status

  return (
    <div
      className={cn(
        "border-3 px-8 py-6 retro-shadow",
        habitColors.bgColor,
        habitColors.borderColor
      )}
    >
      <h3 className={cn("font-bold text-xl", habitColors.textColor)}>
        {habit.name}
      </h3>
      <p className={cn(habitColors.textColor)}>{habit.description}</p>

      <div className="flex items-center gap-2">
        <h1
          className={cn(
            "px-4 py-2 border-2 w-fit font-semibold my-2 text-xs",
            habitColors.borderColor,
            habitColors.textColor
          )}
        >
          {habit.frequency}X/Day
        </h1>
        <div
          className={`inline-block px-2 py-2 border-2 border-orange-600 bg-orange-300 font-bold text-xs text-black`}
        >
          🔥 {5}
        </div>
      </div>

      <div className="my-4">
        <div className="text-xs font-bold text-gray-700 mb-2 uppercase">
          Today's Progress: 0/{habit.frequency}
        </div>
        {habit.frequency > 1 ? (
          <ProgressDots
            current={1}
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
            style={{ width: `${30}%` }}
          />
        </div>
      </div>
      <Button className={cn("w-full mt-4 bg-yellow-300 hover:bg-yellow-500 hover:text-black text-black font-semibold")}>Log Habit</Button>
    </div>
  );
};

export default HabitCard;
