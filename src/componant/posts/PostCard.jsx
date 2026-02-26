import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import CommentSection from "./CommentSection";
import CommentInput from "./CommentInput";
import { apiServices } from "../../services/api";

export default function PostCard({ post, showAllComments, getPosts }) {
  async function createComment(content) {
    const response = await apiServices.createComment(post._id, content);
    if (response.success) {
      await getPosts();
    }
  }

  return (
    <div className="bg-white rounded-xl shadow w-full max-w-2xl overflow-hidden">
      <PostHeader post={post} getPosts={getPosts} />

      <PostContent post={post} />

      <PostStats post={post} />

      <CommentInput createComment={createComment} />

      <CommentSection
        postId={post._id}
        showAll={showAllComments}
        refresh={post.commentsCount}
        postOwnerId={post.user._id}
        getPosts={getPosts}
      />
    </div>
  );
}
