import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { DashboardPostView } from "@/modules/post/ui/views/dashboard-post-view";

interface PageProps {
  params: Promise<{ postSlug: string }>;
}
const page = async ({ params }: PageProps) => {
  const { postSlug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.posts.getOne.queryOptions({ slug: postSlug })
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <DashboardPostView slug={postSlug} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default page;
