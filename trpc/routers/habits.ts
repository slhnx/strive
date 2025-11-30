import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../init";
import { db } from "@/db";

export const habitsRouter = createTRPCRouter({
  fetchMyHabits: privateProcedure.query(async ({ ctx }) => {
    const { id } = ctx.user;

    const habits = await db.habit.findMany({
      where: {
        userId: id,
      },
    });

    return habits;
  }),
  createHabits: privateProcedure
    .input(
      z.object({
        name: z.string(),
        goal: z.string(),
        frequency: z.number(),
        description: z.string().optional(),
        color: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, frequency, goal, description, color } = input;

      const newHabit = await db.habit.create({
        data: {
          name,
          frequency,
          goal,
          description,
          color,
          userId: ctx.user.id,
        },
      });

      return newHabit;
    }),
});
