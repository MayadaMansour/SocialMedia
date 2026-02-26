import CommentItem from "./CommentItem";

export default function CommentList({
  comments,
  showAll,
  postOwnerId,
  onDelete,
  userData,
  onUpdate,
}) {
  const displayed = showAll ? comments : comments.slice(0, 2);

  return (
    <div className="px-4 pb-3">
      <div className="space-y-2 mb-2">
        {displayed.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postOwnerId={postOwnerId}
            onDelete={onDelete}
            onUpdate={onUpdate}
            userData={userData}
          />
        ))}
      </div>
    </div>
  );
}