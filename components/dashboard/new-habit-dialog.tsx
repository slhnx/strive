"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, colors } from "@/lib/utils";
import { trpc } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Please enter a valid name").max(50),
  description: z.string().max(200).optional(),
  goal: z.string().min(2, "Please enter a valid goal").max(50),
  frequency: z.number("Please enter a valid frequency").min(1).max(7),
  color: z.string("Please select a color"),
});

type NewHabitDialogProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewHabitDialog = ({ isOpen, setOpen }: NewHabitDialogProps) => {
  const { mutate: createHabit, isPending } =
    trpc.habits.createHabits.useMutation({
      onSuccess: (newHabit) => {
        toast.success("Habit created successfully!");
      },
      onError: (err) => console.log(err),
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      goal: "",
      frequency: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { name, frequency, goal, description, color } = values;
    createHabit({
      name,
      frequency,
      goal,
      description,
      color,
    });
  };

  const updateFrequency = (offset: number) => {
    const oldFrequency = form.getValues("frequency");

    if (offset > 0) {
      form.setValue("frequency", oldFrequency + 1);
    } else {
      form.setValue("frequency", oldFrequency - 1 < 1 ? 1 : oldFrequency - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Habit</DialogTitle>
          <DialogDescription>
            Add a new habit to track your progress and stay motivated!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-pixel text-xs">
                    Habit Name
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Jogging" {...field} />
                  </FormControl>
                  <FormMessage className="font-pixel text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-pixel text-xs">Goal</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Loose Weight" {...field} />
                  </FormControl>
                  <FormMessage className="font-pixel text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-pixel text-xs">
                    Description (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="abba jabba dabba" {...field} />
                  </FormControl>
                  <FormMessage className="font-pixel text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-pixel text-xs">Freuency</FormLabel>
                  <FormDescription>No of times a day.</FormDescription>
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      onClick={() => updateFrequency(-1)}
                      size="icon"
                      disabled={field.value === 1}
                    >
                      -
                    </Button>
                    <FormControl className="flex items-center justify-between">
                      <Input
                        type="number"
                        className="w-12 no-spinner"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      type="button"
                      onClick={() => updateFrequency(1)}
                      size="icon"
                    >
                      +
                    </Button>
                  </div>
                  <FormMessage className="font-pixel text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-pixel text-xs">Color</FormLabel>
                  <div className="flex items-center justify-between">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        onClick={() => form.setValue("color", color)}
                        className={cn(
                          "h-7 w-7 border-black cursor-pointer",
                          color,
                          field.value === color ? "border-4" : "border-2"
                        )}
                      ></div>
                    ))}
                  </div>
                  <FormMessage className="font-pixel text-xs" />
                </FormItem>
              )}
            />
            <Button isLoading={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewHabitDialog;
