import { createTRPCRouter } from "../init";
import { postsRouter } from "@/modules/post/server/procedures";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
