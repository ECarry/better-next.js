import { HydrateClient, trpc } from "@/trpc/server";
import { PostView } from "@/modules/posts/ui/views/post-view";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Posts",
};

const PostsPage = () => {
  void trpc.posts.getMany.prefetch();

  return (
    <HydrateClient>
      <PostView />
    </HydrateClient>
  );
};

export default PostsPage;
