import { cache } from "react";
import superjson from "superjson";
import { headers } from "next/headers";
import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@/modules/auth/lib/auth";

// Types
import type { Session } from "@/modules/auth/lib/auth-types";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const session: Session | null = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id ?? null;
  const role = session?.user.role ?? null;

  return { userId, role };
});

// types
export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async function isAuthed(
  opts
) {
  const { ctx } = opts;

  console.log({ ctx });

  if (!ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({ ctx: { ...ctx } });
});
export const adminProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;

  if (ctx.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Access denied. Admin privileges required.",
    });
  }

  return opts.next({ ctx: { ...ctx } });
});
