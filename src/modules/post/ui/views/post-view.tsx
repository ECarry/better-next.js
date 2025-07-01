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
    <div className="flex-1 py-6 px-4 md:px-8 flex flex-col gap-y-8 max-w-4xl mx-auto">
      {/* Post Header */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <p className="text-lg text-gray-600 mb-4 font-medium italic">{post.description}</p>
        <div className="h-0.5 bg-gradient-to-r from-gray-200 to-transparent my-4" />
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* Comment Form Section */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add Comment</h2>
        <CommentForm postSlug={slug} />
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Comments ({comments.items.length})</h2>
        
        <div className="flex flex-col gap-4 mt-2">
          {comments.items.length > 0 ? (
            comments.items.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-gray-500 italic">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};
