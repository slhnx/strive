import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../init";
import { db } from "@/db";
import { format } from "date-fns";
import { getDescendingDateStreak } from "@/lib/utils";

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
          date: format(new Date(), "yyyy-MM-dd"),
          habitId: habitId,
          userId: ctx.user.id,
        },
      });

      if (!existingCheckIn) {
        return await db.checkIn.create({
          data: {
            date: format(new Date(), "yyyy-MM-dd"),
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
      // Fetches the check-ins of a habit on a particular date
      const { habitId } = input;

      const checkIns = await db.checkIn.findFirst({
        where: {
          habitId,
          userId: ctx.user.id,
          date: format(new Date(), "yyyy-MM-dd"),
        },
      });

      return checkIns;
    }),
  fetchAllCheckIns: privateProcedure
    .input(
      z.object({
        habitId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Fetches all check-ins of a habit
      const { habitId } = input;
      const { id: userId } = ctx.user;

      const checkIns = await db.checkIn.findMany({
        where: {
          habitId,
          userId,
        },
      });

      return checkIns;
    }),
  updateHabit: privateProcedure
    .input(
      z.object({
        habitId: z.string(),
        name: z.string(),
        goal: z.string(),
        frequency: z.number(),
        description: z.string().optional(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { color, frequency, goal, habitId, name, description } = input;

      return await db.habit.update({
        where: {
          id: habitId,
          userId: ctx.user.id,
        },
        data: {
          color,
          frequency,
          goal,
          name,
          description,
        },
      });
    }),
  getHabitStreak: privateProcedure
    .input(
      z.object({
        habitId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { habitId } = input;
      const { id } = ctx.user;

      const checkIns = await db.checkIn.findMany({
        where: {
          habitId,
          userId: id,
        },
      });

      const sortedCheckins = checkIns
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((checkIn) => checkIn.date);

      const streak = getDescendingDateStreak(sortedCheckins);
      console.log(sortedCheckins);
      console.log("streak: ", streak);

      return streak;
    }),
});
