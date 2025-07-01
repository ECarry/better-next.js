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
    <div>
      <div className="flex flex-col gap-5 mt-2">
        {isLoading && (
          <div className="flex items-center justify-center py-3">
            <Loader2 className="animate-spin size-5 text-blue-500" />
          </div>
        )}
        {data?.items.map((comment, index) => (
          <div key={index} className="py-2">
            <CommentItem key={comment.id} comment={comment} variant="reply" />
          </div>
        ))}
        {!isLoading && data?.items.length === 0 && (
          <div className="text-gray-500 text-sm italic py-2">
            No replies yet.
          </div>
        )}
      </div>
    </div>
  );
};
