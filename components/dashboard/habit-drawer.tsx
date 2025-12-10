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

type HabitDrawerProps = {
  habit: Habit;
};

const HabitDrawer = ({ habit }: HabitDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
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
