import { z } from "zod";

export const commentsInsertSchema = z.object({
  parentId: z.string().uuid().nullish(),
  postSlug: z.string(),
  text: z.string().min(1, {
    message: "Please enter a comment",
  }),
});
