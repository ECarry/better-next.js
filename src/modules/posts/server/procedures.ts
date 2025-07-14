import z from "zod";
import { db } from "@/db";
import { createTRPCRouter, baseProcedure, adminProcedure } from "@/trpc/init";
import { count, desc, eq, ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { posts } from "@/db/schema";

export const postsRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        coverImageKey: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = input.title.toLowerCase().replace(/\s+/g, "-");
      const [existingPost] = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug));
      if (existingPost) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Post with this title already exists",
        });
      }

      const [data] = await db
        .insert(posts)
        .values({
          title: input.title,
          description: input.description,
          slug: slug,
          coverImageKey: input.coverImageKey,
        })
        .returning();

      return data;
    }),
  remove: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const [data] = await db
        .delete(posts)
        .where(eq(posts.id, input.id))
        .returning();

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      return data;
    }),
  getOne: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const [data] = await db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug));

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });
      }

      return data;
    }),
  getMany: baseProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize, search } = input;

      const data = await db
        .select()
        .from(posts)
        .where(search ? ilike(posts.title, `%${search}%`) : undefined)
        .orderBy(desc(posts.createdAt), desc(posts.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({
          count: count(),
        })
        .from(posts)
        .where(search ? ilike(posts.title, `%${search}%`) : undefined);

      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages,
      };
    }),
});
