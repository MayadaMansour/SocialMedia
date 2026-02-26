
import { apiServices } from "../../services/api";
import { useEffect, useState, useContext } from "react";
import { authContext } from "../../context/AuthContext";
import CommentList from "./CommentList";

export default function CommentSection({
  postId,
  showAll,
  postOwnerId,
  initialComments = null,
}) {
  const { userData } = useContext(authContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (initialComments) {
      setComments(initialComments);
    }
  }, [initialComments]);

  useEffect(() => {
    if (!initialComments && postId) {
      loadComments();
    }
  }, [postId, initialComments]);

  async function loadComments() {
    try {
      const response = await apiServices.getPostComments(postId);
      setComments(response.data.comments);
    } catch (err) {
      console.log("Comments Error:", err);
    }
  }

  async function handleDelete(commentId) {
    try {
      await apiServices.deleteComment(postId, commentId);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (err) {
      console.log("Delete Error:", err);
    }
  }

  async function handleUpdate(commentId, content) {
    try {
      const formData = new FormData();
      formData.set("content", content);

      await apiServices.updateComment(postId, commentId, formData);

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === commentId
            ? { ...comment, content }
            : comment
        )
      );
    } catch (err) {
      console.log("Update Error:", err.response?.data || err);
      throw err;
    }
  }

  return (
    <CommentList
      comments={comments}
      showAll={showAll}
      postOwnerId={postOwnerId}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      userData={userData}
    />
  );
}