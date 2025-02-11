import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { baseProcedure, createTRPCRouter, adminProcedure } from "@/trpc/init";

export const postsRouter = createTRPCRouter({
  create: adminProcedure.mutation(async ({ ctx }) => {
    console.log(ctx);

    const [post] = await db
      .insert(posts)
      .values({
        title: "My first post",
        content: "This is my first post",
        slug: "my-first-post-" + Date.now(),
        description: "This is my first post",
        coverImage: "https://example.com/cover-image.jpg",
      })
      .returning();

    return { post };
  }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(posts);

    return data;
  }),
});
