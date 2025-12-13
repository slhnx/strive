"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, getHabitColor, HABIT_COLORS } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type HabitSchema = {
  name: string;
  goal: string;
  frequency: number;
  color: string;
  description?: string | undefined;
};

type HabitFormProps = {
  isLoading: boolean;
  form: UseFormReturn<HabitSchema, any, HabitSchema>;
  onSubmit: (values: HabitSchema) => void;
};

const HabitForm = ({ form, onSubmit, isLoading }: HabitFormProps) => {
  const updateFrequency = (offset: number) => {
    const oldFrequency = form.getValues("frequency");

    if (offset > 0) {
      form.setValue("frequency", oldFrequency + 1);
    } else {
      form.setValue("frequency", oldFrequency - 1 < 1 ? 1 : oldFrequency - 1);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-pixel text-xs">Habit Name</FormLabel>
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
                  <Input type="number" className="w-12 no-spinner" {...field} />
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
                {HABIT_COLORS.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => form.setValue("color", color)}
                    className={cn(
                      "h-7 w-7 border-black cursor-pointer transition-transform",
                      getHabitColor(color).bgColor,
                      field.value === color
                        ? "border-4 scale-110"
                        : "border-2 scale-100"
                    )}
                  ></div>
                ))}
              </div>
              <FormMessage className="font-pixel text-xs" />
            </FormItem>
          )}
        />
        <Button isLoading={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default HabitForm;
