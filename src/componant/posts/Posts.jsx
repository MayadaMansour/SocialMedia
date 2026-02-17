import PostCard from "./PostCard";

export default function Posts({ posts }) {
  if (!posts?.length) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No posts yet
      </p>
    );
  }

  return (
    <div className="min-h-screen py-10 flex flex-col items-center gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
