"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2, PlusIcon } from "lucide-react";
import { toast } from "sonner";

export const CreatePostSection = () => {
  const utils = trpc.useUtils();
  const create = trpc.posts.create.useMutation({
    onSuccess: () => {
      utils.posts.getMany.invalidate();

      toast.success("Post created");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      <Button onClick={() => create.mutate()} disabled={create.isPending}>
        {create.isPending ? <Loader2 className="animate-spin" /> : <PlusIcon />}
        Create Post
      </Button>
    </div>
  );
};
