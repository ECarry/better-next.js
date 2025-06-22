import { Suspense } from "react";
import { auth } from "@/modules/auth/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/modules/post/params";
import { DashboardPostsView } from "@/modules/post/ui/views/dashboard-posts-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PostsListHeader } from "@/modules/post/ui/components/posts-list-header";

type Props = {
  searchParams: Promise<SearchParams>;
};

const page = async ({ searchParams }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const filters = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.posts.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <PostsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary fallback={<div>Error</div>}>
            <DashboardPostsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
