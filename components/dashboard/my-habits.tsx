"use client";
import { trpc } from "@/trpc/react";
import RetroSpinner from "../ui/retro-loader";
import HabitCard from "./habit-card";

const MyHabits = () => {
  const { data, isLoading } = trpc.habits.fetchMyHabits.useQuery();

  return (
    <div>
      {isLoading && <RetroSpinner />}
      <div className="grid grid-cols-3 gap-6">
        {data &&
          data.map((habit) => <HabitCard key={habit.id} habit={habit} />)}
      </div>
    </div>
  );
};

export default MyHabits;
