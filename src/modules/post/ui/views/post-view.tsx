"use client";

import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-item";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PostView = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data: post } = useSuspenseQuery(
    trpc.posts.getOne.queryOptions({ slug })
  );
  const { data: comments } = useSuspenseQuery(
    trpc.comments.getMany.queryOptions({ postSlug: slug, limit: 10 })
  );

  return (
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <div>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <p>{post.content}</p>
      </div>

      <div>
        <CommentForm postSlug={slug} />
      </div>

      <h2>Comments</h2>
      <div className="flex flex-col gap-4 mt-2">
        {comments.items.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
