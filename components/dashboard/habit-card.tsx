"use client";
import { Habit } from "@/app/generated/prisma/client";
import { cn, getHabitColor } from "@/lib/utils";
import { trpc } from "@/trpc/react";
import { useEffect, useState } from "react";
import RetroSpinner from "../ui/retro-loader";
import HabitProgress from "./habit-progress";
import HabitDrawer from "./habit-drawer";

type HabitCardProps = {
  habit: Habit;
};

const HabitCard = ({ habit }: HabitCardProps) => {
  const habitColors = getHabitColor(habit.color);

  const { data: checkIns, isLoading } = trpc.habits.fetchCheckIns.useQuery({
    habitId: habit.id,
  });

  const [habitCount, setHabitCount] = useState(0);
  const [isCompleted, setCompleted] = useState(
    checkIns?.count === habit?.frequency
  );

  useEffect(() => {
    if (checkIns) {
      setHabitCount(checkIns.count);
      setCompleted(checkIns.count === habit.frequency);
    }
  }, [checkIns]);

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

      <HabitDrawer habit={habit} />
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

      {isLoading ? (
        <div className="my-3">
          <RetroSpinner />
        </div>
      ) : (
        <HabitProgress
          habit={habit}
          habitCount={habitCount}
          isCompleted={isCompleted}
          setCompleted={setCompleted}
          setHabitCount={setHabitCount}
        />
      )}
    </div>
  );
};

export default HabitCard;
