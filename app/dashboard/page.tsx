"use client";
import MyHabits from "@/components/dashboard/my-habits";
import NewHabitDialog from "@/components/dashboard/new-habit-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartNoAxesCombined, ChartScatter, User } from "lucide-react";
import { useState } from "react";

const DashboardPage = () => {
  const [newHabitDialog, setNewHabitDialog] = useState(false);

  return (
    <div className="py-6 px-4 border-2 border-black dark:border-white mt-12 w-full">
      <Tabs defaultValue="my-habits" className="w-full">
        <TabsList
          className="
            w-full 
            border-none border-b border-black dark:border-white 
            py-3 
            flex flex-wrap items-center gap-3
            justify-between 
          "
        >
          <div className="flex flex-wrap gap-2">
            <TabsTrigger className="flex items-center gap-2" value="my-habits">
              <ChartNoAxesCombined />
              My Habits
            </TabsTrigger>

            <TabsTrigger className="flex items-center gap-2" value="statistics">
              <ChartScatter />
              Statistics
            </TabsTrigger>

            <TabsTrigger className="flex items-center gap-2" value="friends">
              <User />
              Friends
            </TabsTrigger>
          </div>

          <div className="w-full sm:w-auto flex justify-start sm:justify-end">
            <Button onClick={() => setNewHabitDialog(true)}>Add Habit</Button>
            {newHabitDialog && (
              <NewHabitDialog
                isOpen={newHabitDialog}
                setOpen={setNewHabitDialog}
              />
            )}
          </div>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="my-habits" className="border-none">
            <MyHabits />
          </TabsContent>

          <TabsContent value="statistics"></TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
