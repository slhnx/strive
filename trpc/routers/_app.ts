import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { habitsRouter } from "./habits";

export const appRouter = createTRPCRouter({
  hello: baseProcedure.input(z.string()).query(({ input }) => {
    return {
      greeting: `Hello ${input}`,
    };
  }),
  habits: habitsRouter,
});

export type AppRouter = typeof appRouter;
