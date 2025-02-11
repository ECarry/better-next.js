import { CreatePostSection } from "../sections/create-post-section";
import { PostsSection } from "../sections/posts-section";

export const PostView = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <CreatePostSection />
      <PostsSection />
    </div>
  );
};
