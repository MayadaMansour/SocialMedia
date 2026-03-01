import { useState } from "react";

export default function CommentInput({ createComment }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

async function handleCommentData() {
  if (!comment.trim()) return;
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append("content", comment);
    await createComment(formData);
    setComment("");
  } catch (error) {
    console.log("Comment Error:", error);
  } finally {
    setLoading(false); 
  }
}

  return (
    <div className="px-4 py-4">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full bg-gray-100 rounded-full pl-4 pr-12 py-2 outline-none text-sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleCommentData}
          disabled={loading}
          className="absolute right-2 text-primary w-8 h-8 rounded-full flex items-center justify-center"
        >
          {loading ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
}