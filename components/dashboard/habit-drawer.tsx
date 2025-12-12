import { Habit } from "@/app/generated/prisma/client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import HabitHeatmap from "./habit-heatmap";
import { Cog } from "lucide-react";
import { cn, getHabitColor } from "@/lib/utils";

type HabitDrawerProps = {
  habit: Habit;
};

const HabitDrawer = ({ habit }: HabitDrawerProps) => {
  const habitColor = getHabitColor(habit.color);

  return (
    <Drawer>
      <DrawerTrigger className={cn("p-2 rounded-sm active:scale-90 transition-transform", habitColor.bgColor)}>
        <Cog className={habitColor.textColor} />
      </DrawerTrigger>
      <DrawerContent className="w-1/2 mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-left">{habit.name}</DrawerTitle>
          <DrawerDescription className="text-left">
            {habit.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <HabitHeatmap habit={habit} />
        </div>
        {/* <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default HabitDrawer;
