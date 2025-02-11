import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  hello: baseProcedure.query(() => {
    return {
      greeting: `hello world`,
    };
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
