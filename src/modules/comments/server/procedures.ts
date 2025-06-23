import { db } from "@/db";
import { comments } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const commentsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        parentId: z.string().uuid().nullish(),
        postId: z.string().uuid(),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.auth.user;
      const { postId, text, parentId } = input;

      const [existingComment] = await db
        .select()
        .from(comments)
        .where(inArray(comments.id, parentId ? [parentId] : []));

      if (!existingComment && parentId) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      if (existingComment?.parentId && parentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
        });
      }

      const [newComment] = await db
        .insert(comments)
        .values({
          postId,
          userId,
          parentId,
          text,
        })
        .returning();

      return newComment;
    }),
});
