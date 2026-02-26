import { useState, useEffect } from "react";
import CommentMenu from "./CommentMenu";
import { Input } from "@heroui/react";

export default function CommentItem({
  comment,
  postOwnerId,
  userData,
  onDelete,
  onUpdate,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);
  const [loading, setLoading] = useState(false);
  const isMyComment =
    String(comment.commentCreator?._id) === String(userData?._id);
  const isPostOwner =
    String(postOwnerId) === String(userData?._id);


  useEffect(() => {
    setEditedText(comment.content);
  }, [comment.content]);

  async function handleSave() {
    if (!editedText.trim()) return;
    try {
      setLoading(true);
      await onUpdate(comment._id, editedText);
      setIsEditing(false);
    } catch (error) {
      console.log("Update Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setEditedText(comment.content);
    setIsEditing(false);
  }

  return (
    <div className="flex gap-2 items-start group">
      <img
        src={comment.commentCreator?.photo || "https://i.pravatar.cc/150"}
        className="w-8 h-8 rounded-full object-cover"
        alt=""
      />

      <div className="flex-1 flex justify-between items-start">
        <div className="bg-gray-100 rounded-2xl px-3 py-2 text-sm max-w-[85%]">
          <span className="font-semibold block text-gray-800">
            {comment.commentCreator?.name}
          </span>

          {!isEditing ? (
            <p className="mt-1 text-gray-700">{comment.content}</p>
          ) : (
            <div className="mt-2 space-y-2">
              <Input
                autoFocus
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                disabled={loading}
                radius="full"
                size="sm"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  disabled={loading}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full flex items-center justify-center min-w-[70px]"
                >
                  {loading ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {(isMyComment || isPostOwner) && (
          <CommentMenu
            isMyComment={isMyComment}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            onDelete={() => onDelete(comment._id)}
            onUpdate={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  );
}