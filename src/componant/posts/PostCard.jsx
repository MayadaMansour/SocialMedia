import { useState } from "react";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import CommentSection from "./CommentSection";
import CommentInput from "./CommentInput";
import { apiServices } from "../../services/api";
import { Link } from "react-router-dom";

export default function PostCard({
  post,
  showAllComments,
  refreshPost,
  isDetails = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(post.body || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post.image || null);

  function handleEdit() {
    setIsEditing(true);
    setText(post.body || "");
    setPreview(post.image || null);
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImage(null);
    setPreview(null);
  }

  async function handleUpdatePost() {
    try {
      const formData = new FormData();

      formData.append("body", text);

      if (image instanceof File) {
        formData.append("image", image);
      }

      await apiServices.updatePost(post._id, formData);

      setIsEditing(false);

      await refreshPost();
    } catch (error) {
      console.log("Update Error:", error.response?.data || error);
    }
  }

  async function createComment(formData) {
    const response = await apiServices.createComment(post._id, formData);
    if (response.success) {
      await refreshPost();
    }
  }

  const hasMoreComments = post.commentsCount > 1 && !showAllComments;

  return (
    <div className="bg-white rounded-xl shadow w-full max-w-2xl overflow-hidden my-3">
      <PostHeader
        post={post}
        refreshPost={refreshPost}
        isDetails={isDetails}
        onEdit={handleEdit}
      />

      {isEditing ? (
        <div className="p-4 space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded p-2"
          />

          {preview && (
            <div className="relative">
              <img
                src={preview}
                className="rounded-lg max-h-[350px] w-full object-cover"
              />

              <button
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

          <input type="file" accept="image/*" onChange={handleImage} />

          <div className="flex gap-2">
            <button
              onClick={handleUpdatePost}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <PostContent post={post} />

          <PostStats post={post} />

          <CommentInput createComment={createComment} />

          <CommentSection
            postId={post._id}
            showAll={showAllComments}
            postOwnerId={post.user._id}
            initialComments={
              showAllComments ? null : post.topComment ? [post.topComment] : []
            }
          />

          {hasMoreComments && (
            <Link
              to={`/post/${post._id}`}
              className="block px-4 py-2 text-sm text-gray-500 hover:text-blue-600 hover:underline"
            >
              See all comments
            </Link>
          )}
        </>
      )}
    </div>
  );
}
