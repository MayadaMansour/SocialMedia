import { apiServices } from "../../services/api";
import { useEffect, useState, useContext } from "react";
import { authContext } from "../../context/AuthContext";
import CommentList from "./CommentList";

export default function CommentSection({
  postId,
  showAll,
  refresh,
  postOwnerId,
  getPosts,
}) {
  const [comments, setComments] = useState([]);
  const { userData } = useContext(authContext);

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
      await getPosts();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  }

  async function handleUpdate(commentId, content) {
    try {
      const formData = new FormData();
      formData.append("content", content);
      await apiServices.updateComment(postId, commentId, formData);
      console.log("Updated Successfully");
      await getPosts();
    } catch (err) {
      console.log("Update Error:", err.response?.data || err);
      throw err;
    }
  }

  useEffect(() => {
    if (!postId) return;
    loadComments();
  }, [postId, refresh]);

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
