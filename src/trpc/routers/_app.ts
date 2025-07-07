import { createTRPCRouter } from "../init";
import { postsRouter } from "@/modules/posts/server/procedures";
import { commentsRouter } from "@/modules/comments/server/procedures";
import { cloudflareRouter } from "@/modules/cloudflare/server/procedures";

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  comments: commentsRouter,
  cloudflare: cloudflareRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
