import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../componant/posts/PostCard";
import Loading from "../componant/Loading";
import { apiServices } from "../services/api";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  async function getPostDetail() {
    try {
      const data = await apiServices.getDetailsPost(postId);
      setPost(data.data.post);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <div className="min-h-screen py-5 flex flex-col items-center">
      {post ? (
        <PostCard
          post={post}
          showAllComments={true}
          refreshPost={getPostDetail}
          isDetails={true}   
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}