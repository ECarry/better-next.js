import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { commentsInsertSchema } from "@/modules/comments/schemas";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CommentFormProps {
  postSlug: string;
  onSuccess?: () => void;
  parentId?: string;
  onCancel?: () => void;
  variant?: "reply" | "comment";
}

export const CommentForm = ({
  postSlug,
  onSuccess,
  parentId,
  onCancel,
  variant = "comment",
}: CommentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const create = useMutation(
    trpc.comments.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.comments.getMany.queryOptions({
            postSlug,
            limit: 10,
          })
        );
        await queryClient.invalidateQueries(
          trpc.comments.getMany.queryOptions({
            postSlug,
            limit: 10,
            parentId,
          })
        );
        form.reset();
        toast.success("Comment added");
        onSuccess?.();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    })
  );

  const form = useForm<z.infer<typeof commentsInsertSchema>>({
    resolver: zodResolver(commentsInsertSchema),
    defaultValues: {
      parentId,
      postSlug,
      text: "",
    },
  });

  const onSubmit = (values: z.infer<typeof commentsInsertSchema>) => {
    create.mutate(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  return (
    <Form {...form}>
      <form className="flex gap-4 group" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={
                      variant === "reply"
                        ? "Reply to comment..."
                        : "Add a comment..."
                    }
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="justify-end gap-2 mt-2 flex">
            {variant === "reply" && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
            <Button type="submit" size="sm" disabled={create.isPending}>
              {variant === "reply" ? "Reply" : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
