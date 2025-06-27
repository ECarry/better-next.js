import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { CommentForm } from "./comment-form";
import { CommentsGetManyOutPut } from "../../types";
import { UserAvatar } from "@/components/user-avatar";

interface CommentItemProps {
  comment: CommentsGetManyOutPut["items"][number];
  variant?: "reply" | "comment";
}

export const CommentItem = ({
  comment,
  variant = "comment",
}: CommentItemProps) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-4">
        <Link prefetch href={`/users/${comment.userId}`}>
          <UserAvatar
            size={variant === "comment" ? "lg" : "sm"}
            imageUrl={comment.user.image || "/user-placeholder.svg"}
            name={comment.user.name || "User"}
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link prefetch href={`/users/${comment.userId}`}>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-sm pb-0.5">
                {comment.user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>
          </Link>
          <p className="text-sm">{comment.text}</p>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {variant === "comment" && (
              <DropdownMenuItem onClick={() => setIsReplyOpen(true)}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Reply
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isReplyOpen && variant === "comment" && (
        <div className="mt-4 pl-14">
          <CommentForm
            postSlug={comment.postSlug}
            parentId={comment.id}
            onCancel={() => setIsReplyOpen(false)}
            variant="reply"
            onSuccess={() => {
              setIsReplyOpen(false);
              setIsRepliesOpen(true);
            }}
          />
        </div>
      )}
      {comment.replyCount > 0 && variant === "comment" && (
        <div className="pl-14">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-500 rounded-full"
            onClick={() => setIsRepliesOpen((current) => !current)}
          >
            {isRepliesOpen ? (
              <ChevronUp className="mr-2 h-4 w-4" />
            ) : (
              <ChevronDown className="mr-2 h-4 w-4" />
            )}
            {comment.replyCount} replies
          </Button>
        </div>
      )}
    </div>
  );
};
