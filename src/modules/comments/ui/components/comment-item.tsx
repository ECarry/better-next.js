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
import { CommentReplies } from "./comment-replies";

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
    <div className={variant === "comment" ? "border border-gray-100 rounded-lg p-4 bg-white shadow-sm" : ""}>  
      <div className="flex gap-4">
        <Link prefetch href={`/users/${comment.userId}`} className="shrink-0">
          <UserAvatar
            size={variant === "comment" ? "lg" : "sm"}
            imageUrl={comment.user.image || "/user-placeholder.svg"}
            name={comment.user.name || "User"}
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link prefetch href={`/users/${comment.userId}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-semibold text-gray-800 text-sm hover:text-blue-600 transition-colors duration-200">
                {comment.user.name}
              </span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>
          </Link>
          <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{comment.text}</p>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {variant === "comment" && (
              <DropdownMenuItem 
                onClick={() => setIsReplyOpen(true)}
                className="cursor-pointer"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Reply
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isReplyOpen && variant === "comment" && (
        <div className="mt-6 pl-14 border-t border-gray-100 pt-4">
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
        <div className="pl-14 mt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full text-xs font-medium transition-colors duration-200"
            onClick={() => setIsRepliesOpen((current) => !current)}
          >
            {isRepliesOpen ? (
              <ChevronUp className="mr-1.5 h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="mr-1.5 h-3.5 w-3.5" />
            )}
            {comment.replyCount} {comment.replyCount === 1 ? 'reply' : 'replies'}
          </Button>
        </div>
      )}

      {comment.replyCount > 0 && variant === "comment" && isRepliesOpen && (
        <div className="mt-3 pl-14 border-l-2 border-gray-100">
          <CommentReplies parentId={comment.id} postSlug={comment.postSlug} />
        </div>
      )}
    </div>
  );
};
