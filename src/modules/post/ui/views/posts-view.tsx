"use client";

import { useTRPC } from "@/trpc/client";
import { usePostsFilters } from "../../hooks/use-posts-filters";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";

export const PostsView = () => {
  const trpc = useTRPC();
  const [filters] = usePostsFilters();

  const { data } = useSuspenseQuery(
    trpc.posts.getMany.queryOptions({ ...filters })
  );

  return (
    <div>
      {data.items.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};
