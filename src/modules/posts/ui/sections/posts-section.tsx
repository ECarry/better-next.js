"use client";

import { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";

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

  return <div>{JSON.stringify(posts)}</div>;
};
