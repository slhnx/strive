"use client";
import { Habit } from "@/app/generated/prisma/client";
import { cn, getHabitColor, getHabitProgressColor } from "@/lib/utils";
import { trpc } from "@/trpc/react";
import { useEffect, useState } from "react";
import RetroSpinner from "../ui/retro-loader";
import HabitProgress from "./habit-progress";
import HabitDrawer from "./habit-drawer";
import HabitHeatmap from "./habit-heatmap";
import { Button } from "../ui/button";
import { CHECKIN_MESSAGES } from "@/constants";
import { toast } from "sonner";
import { CheckIcon, PlusIcon } from "lucide-react";

type HabitCardProps = {
  habit: Habit;
};

const HabitCard = ({ habit }: HabitCardProps) => {
  const habitColors = getHabitColor(habit.color);
  const utils = trpc.useUtils();

  const { data: checkIns, isLoading } = trpc.habits.fetchCheckIns.useQuery({
    habitId: habit.id,
  });

  const { mutate: checkInHabit } = trpc.habits.checkInHabit.useMutation({
    onMutate: () => {
      setHabitCount(habitCount + 1);
      setCompleted(habitCount + 1 === habit.frequency);

      const randomMessageIndex = Math.floor(
        Math.random() * CHECKIN_MESSAGES.length
      );
      toast.success(CHECKIN_MESSAGES[randomMessageIndex]);
    },
    onSuccess: () => {
      utils.habits.fetchAllCheckIns.invalidate({ habitId: habit.id });
    },
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

        habitColors.borderColor
      )}
    >
      <div className="flex items-center justify-between">
        <div className="habit-info">
          <h3 className={cn("font-bold text-xl", habitColors.textColor)}>
            {habit.name}
          </h3>
          <p className={cn(habitColors.textColor)}>{habit.description}</p>
        </div>
        <div
          className={cn(
            "circular-progress rounded-full bg-gray-300 flex items-center justify-center w-10 h-10 p-2 transition-colors",
            getHabitProgressColor(habitCount, habit.frequency, habit.color)
          )}
        >
          <Button
            disabled={isCompleted}
            onClick={() =>
              checkInHabit({
                habitId: habit.id,
                date: new Date(),
                count: habitCount + 1,
              })
            }
            className={cn(
              "rounded-full shadow-none p-2 h-8 w-8 flex items-center text-white justify-center active:scale-90 active:translate-none border-none",
              getHabitColor(habit.color).buttonColor,
              getHabitColor(habit.color).buttonHoverColor
            )}
          >
            {!isCompleted ? (
              <PlusIcon strokeWidth={6} />
            ) : (
              <CheckIcon strokeWidth={6} />
            )}
          </Button>
        </div>
      </div>

      <HabitHeatmap habit={habit} />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-x-2 mr-auto">
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
        <HabitDrawer habit={habit} />
      </div>
    </div>
  );
};

export default HabitCard;
