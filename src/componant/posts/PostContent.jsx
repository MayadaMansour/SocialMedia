export default function PostContent({ post }) {
  return (
    <>
      {post.body && (
        <div className="px-4 pb-2 text-gray-800 whitespace-pre-line">
          {post.body}
        </div>
      )}

      {post.image && (
        <img
          src={post.image}
          className="w-full max-h-[500px] object-cover"
          alt=""
        />
      )}
    </>
  );
}