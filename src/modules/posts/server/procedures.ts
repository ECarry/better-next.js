import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { baseProcedure, createTRPCRouter, adminProcedure } from "@/trpc/init";
import { desc } from "drizzle-orm";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const postsRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [post] = await db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content,
          slug: input.title.split(" ").join("-") + Date.now(),
        })
        .returning();

      return { post };
    }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(posts).orderBy(desc(posts.createdAt));

    return data;
  }),
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { slug } = input;

      const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      return post;
    }),
});
