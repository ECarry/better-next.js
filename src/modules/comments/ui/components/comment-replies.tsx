import { Loader2 } from "lucide-react";
import { CommentItem } from "./comment-item";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface CommentRepliesProps {
  parentId: string;
  postSlug: string;
}

export const CommentReplies = ({ parentId, postSlug }: CommentRepliesProps) => {
  const trpc = useTRPC();

  const { data, isLoading } = useQuery(
    trpc.comments.getMany.queryOptions({ postSlug, parentId, limit: 10 })
  );

  return (
    <div className="pl-14">
      <div className="flex flex-col gap-4 mt-2">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin size-6 text-muted-foreground" />
          </div>
        )}
        {data?.items.map((comment, index) => (
          <div key={index}>
            <CommentItem key={comment.id} comment={comment} variant="reply" />
          </div>
        ))}
      </div>
    </div>
  );
};
