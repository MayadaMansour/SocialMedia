import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentSection({ postId, totalComments }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  async function loadInitialComments() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=2`,
        { headers: { token } },
      );
      setComments(data.data.comments);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    loadInitialComments();
  }, []);

  return (
    <div className="px-4 pb-3">
      <div className="my-5">
        <div className="relative">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full bg-gray-100 rounded-medium px-4 pr-12 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 
                 text-blue-500
                 w-15 h-15  flex items-center justify-center
                 transition"
          >
            ➤
          </button>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="space-y-2 mb-2">
        {comments.map((c) => (
          <div key={c._id} className="flex gap-2">
            <img
              src={c.commentCreator?.photo}
              className="w-7 h-7 rounded-full"
            />
            <div className="bg-gray-100 rounded-2xl px-3 py-2 text-sm">
              <span className="font-semibold block">
                {c.commentCreator?.name}
              </span>
              {c.content}
            </div>
          </div>
        ))}
      </div>

      {/* SEE MORE */}
      {totalComments > 2 ? (
        <button className="text-sm text-gray-500 hover:underline mb-2 m-auto">
          See more comments
        </button>
      ) : null}
    </div>
  );
}
