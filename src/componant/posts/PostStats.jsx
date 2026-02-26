import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

export default function PostStats({ post }) {
  return (
    <div className="px-4 py-2 flex justify-between items-center text-gray-500 text-sm">

      <div className="flex items-center gap-1">
        <FaHeart className="text-red-500" size={14} />
        <span>{post.likesCount}</span>
      </div>

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
  );
}