import CommentSection from "./CommentSection";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow w-full max-w-2xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={post.user?.photo}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{post.user?.name}</span>
          <span className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* TEXT */}
      {post.body && (
        <div className="px-4 pb-2 text-gray-800 whitespace-pre-line">
          {post.body}
        </div>
      )}

      {/* IMAGE */}
      {post.image && (
        <img src={post.image} className="w-full max-h-[500px] object-cover" />
      )}

      {/* STATS */}
      <div className="px-4 py-2 flex justify-between items-center text-gray-500 text-sm">
        {/* Likes */}
        <div className="flex items-center gap-1">
          <FaHeart className="text-red-500" size={14} />
          <span>{post.likesCount}</span>
        </div>

        {/* Comments & Shares */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <FaRegCommentDots size={15} />
            <span>{post.commentsCount} Comments</span>
          </div>

          <div className="flex items-center gap-1">
            <FiShare2 size={15} />
            <span>{post.sharesCount} Shares</span>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      <CommentSection postId={post._id} totalComments={post.commentsCount} />
    </div>
  );
}
