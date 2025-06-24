"use client";

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

      <h2>Comments</h2>
      <div>
        {comments.items.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
