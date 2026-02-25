import { useState } from "react";

export default function CommentInput({ createComment }) {
  const [comments, setComments] = useState("");

  async function handleCommentData() {
    const formData = new FormData();
    formData.set("content", comments);
     await createComment(formData);
    setComments("");
  }

  return (
    <div className="px-4 py-4">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full bg-gray-100 rounded-full pl-4 pr-12 py-2 outline-none text-sm"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />

        <button
          onClick={handleCommentData}
          className="absolute right-2 text-primary 
                 w-8 h-8 rounded-full flex items-center justify-center"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

