"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Please enter a valid name").max(50),
  description: z
    .string()
    .min(2, "Please enter a valid description")
    .max(50)
    .optional(),
  goal: z.string().min(2, "Please enter a valid goal").max(50),
  frequency: z.number().min(1, "Please enter a valid frequency").max(7),
});

const NewHabitDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      goal: "",
      frequency: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Habit</Button>
      </DialogTrigger>
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
                  <FormLabel className="font-pixel text-xs">Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Jogging" {...field} />
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
                  <FormControl>
                    <Input type="number" placeholder="Frequency" {...field} />
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewHabitDialog;
