import { z } from "zod";

export const postInsertSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  description: z.string(),
  coverImageKey: z.string().optional(),
});
