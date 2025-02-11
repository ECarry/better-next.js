"use client";

import { z } from "zod";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, PlusIcon } from "lucide-react";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export const CreatePostSection = () => {
  const utils = trpc.useUtils();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const create = trpc.posts.create.useMutation({
    onSuccess: () => {
      utils.posts.getMany.invalidate();

      toast.success("Post created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    create.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={create.isPending}>
          {create.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <PlusIcon />
          )}
          Create
        </Button>
      </form>
    </Form>
  );
};
