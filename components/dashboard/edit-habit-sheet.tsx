"use client";
import { Habit } from "@/app/generated/prisma/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, getHabitColor } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cog } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HabitForm from "./habit-form";
import { trpc } from "@/trpc/react";
import { toast } from "sonner";

type EditHabitSheetProps = {
  habit: Habit;
};

const formSchema = z.object({
  name: z.string().min(2, "Please enter a valid name").max(50),
  description: z.string().max(200).optional(),
  goal: z.string().min(2, "Please enter a valid goal").max(50),
  frequency: z.number("Please enter a valid frequency").min(1).max(7),
  color: z.string("Please select a color"),
});

const EditHabitSheet = ({ habit }: EditHabitSheetProps) => {
  const habitColor = getHabitColor(habit.color);

  const utils = trpc.useUtils();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: habit.name,
      description: habit.description as string,
      goal: habit.goal,
      frequency: habit.frequency,
      color: habit.color,
    },
  });

  const { isPending, mutate: updateHabit } =
    trpc.habits.updateHabit.useMutation({
      onSuccess: () => {
        toast.success("Habit updated successfully!");
        utils.habits.fetchMyHabits.invalidate();
      },
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, frequency, goal, description, color } = values;

    updateHabit({
      name,
      frequency,
      goal,
      description,
      color,
      habitId: habit.id,
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "p-2 rounded-sm active:scale-90 transition-transform",
          habitColor.bgColor
        )}
      >
        <Cog className={habitColor.textColor} />
      </SheetTrigger>
      <SheetContent className="hard-shadow w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Habit</SheetTitle>
          <SheetDescription>Edit the details of your habit</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <HabitForm form={form} onSubmit={onSubmit} isLoading={isPending} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditHabitSheet;
