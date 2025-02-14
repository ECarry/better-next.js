"use client";

import { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import { EyeIcon, HeartIcon } from "lucide-react";
import Link from "next/link";

export const PostsSection = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <PostsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const PostsSectionSuspense = () => {
  const [posts] = trpc.posts.getMany.useSuspenseQuery();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="flex items-center gap-4">
          <Link href={`/posts/${post.slug}`}>
            <h1 className="text-blue-500">{post.title}</h1>
          </Link>
          <p>{post.content}</p>
          <p>{post.createdAt.toDateString()}</p>
          <p className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            {post.views}
          </p>
          <p className="flex items-center gap-2">
            <HeartIcon className="h-4 w-4" />
            {post.likes}
          </p>
        </div>
      ))}
    </div>
  );
};
