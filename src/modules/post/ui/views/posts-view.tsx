"use client";

import { useTRPC } from "@/trpc/client";
import { usePostsFilters } from "../../hooks/use-posts-filters";
import { useSuspenseQuery } from "@tanstack/react-query";

export const PostsView = () => {
  const trpc = useTRPC();
  const [filters] = usePostsFilters();

  const { data } = useSuspenseQuery(
    trpc.posts.getMany.queryOptions({ ...filters })
  );

  return <div>{JSON.stringify(data)}</div>;
};
