import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";

export const createTRPCContext = async () => {
  const clerkUser = await currentUser();

  let user = null;

  if (clerkUser) {
    user = await db.user.findUnique({
      where: { email: clerkUser.emailAddresses[0].emailAddress },
    });
  }

  return { user };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;

const enforceUser = t.middleware(({ ctx, next }) => {
  if (!ctx.user) throw new Error("UNAUTHORIZED");

  return next({
    ctx: { ...ctx, user: ctx.user },
  });
});

export const privateProcedure = t.procedure.use(enforceUser);
