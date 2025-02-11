import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  hello: protectedProcedure.query(() => {
    return {
      greeting: `hello world`,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
