import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../init";
import { db } from "@/db";
import { format } from "date-fns";

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
  checkInHabit: privateProcedure
    .input(
      z.object({
        date: z.date(),
        count: z.number(),
        habitId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { date, count, habitId } = input;

      const habit = await db.habit.findFirst({
        where: {
          id: habitId,
        },
      });

      let existingCheckIn = await db.checkIn.findFirst({
        where: {
          date: format(new Date(), "dd/MM/yyyy"),
          habitId: habitId,
          userId: ctx.user.id,
        },
      });

      if (!existingCheckIn) {
        return await db.checkIn.create({
          data: {
            date: format(new Date(), "dd/MM/yyyy"),
            count,
            userId: ctx.user.id,
            habitId,
          },
        });
      }

      if (habit && habit.frequency > 1) {
        return await db.checkIn.update({
          where: {
            id: existingCheckIn?.id,
          },
          data: {
            count: existingCheckIn?.count + 1,
          },
        });
      }
    }),
  fetchCheckIns: privateProcedure
    .input(
      z.object({
        habitId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { habitId } = input;

      const checkIns = await db.checkIn.findFirst({
        where: {
          habitId,
          userId: ctx.user.id,
          date: format(new Date(), "dd/MM/yyyy"),
        },
      });

      return checkIns;
    }),
});
