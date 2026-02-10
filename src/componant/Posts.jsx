import React from "react";

export default function Posts({ posts }) {
  if (!posts?.length) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No posts yet
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white/10 backdrop-blur-xl p-5 rounded-xl shadow-md border border-white/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.userImage}
              alt={post.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-white font-semibold">
                {post.userName}
              </h4>
              <span className="text-xs text-gray-400">
                {post.date}
              </span>
            </div>
          </div>

          <p className="text-gray-200 mb-3">
            {post.content}
          </p>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="rounded-lg w-full max-h-96 object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
