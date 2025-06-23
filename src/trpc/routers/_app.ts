import { createTRPCRouter } from "../init";
import { postsRouter } from "@/modules/post/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  comments: commentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
