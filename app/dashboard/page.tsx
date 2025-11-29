import NewHabitDialog from "@/components/dashboard/new-habit-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartNoAxesCombined, ChartScatter, User } from "lucide-react";
const DashboardPage = () => {
  return (
    <div className="py-6 px-4 border-2 border-black dark:border-white mt-12 flex items-center justiyfy-between w-full">
      <Tabs defaultValue="my-habits" className="w-full">
        <TabsList className="flex items-center w-full justify-between border-none py-3 border-b border-black">
          <div className="flex items-center">
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
          <NewHabitDialog />
        </TabsList>
        <TabsContent value="my-habits"></TabsContent>
        <TabsContent value="statistics"></TabsContent>
        <Button>Add Habit</Button>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
