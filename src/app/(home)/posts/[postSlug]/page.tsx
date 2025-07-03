import { getQueryClient, trpc } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { PostView } from "@/modules/posts/ui/views/post-view";

interface PageProps {
  params: Promise<{ postSlug: string }>;
}
const page = async ({ params }: PageProps) => {
  const { postSlug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.posts.getOne.queryOptions({ slug: postSlug })
  );
  void queryClient.prefetchQuery(
    trpc.comments.getMany.queryOptions({ postSlug, limit: 10 })
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary fallback={<div>Error</div>}>
        <PostView slug={postSlug} />
      </ErrorBoundary>
    </Suspense>
  );
};

export default page;
