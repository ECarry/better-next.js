import { createTRPCRouter } from "@/trpc/init";
import { postsRouter } from "@/modules/posts/server/procedures";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
