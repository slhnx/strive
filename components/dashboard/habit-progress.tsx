import { Habit } from "@/app/generated/prisma/client";
import ProgressDots from "./progress-dots";
import { cn, getHabitColor } from "@/lib/utils";
import { trpc } from "@/trpc/react";
import { CHECKIN_MESSAGES } from "@/constants";
import { toast } from "sonner";
import { Button } from "../ui/button";

type HabitProgressProps = {
  habitCount: number;
  setHabitCount: React.Dispatch<React.SetStateAction<number>>;
  habit: Habit;
  isCompleted: boolean;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const HabitProgress = ({
  habit,
  habitCount,
  setHabitCount,
  isCompleted,
  setCompleted,
}: HabitProgressProps) => {
  const habitColors = getHabitColor(habit.color);

  const utils = trpc.useUtils();

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
          "w-full mt-4 bg-yellow-300 hover:bg-yellow-500 hover:text-black text-black font-semibold"
        )}
      >
        Log Habit
      </Button>
    </div>
  );
};

export default HabitProgress;
