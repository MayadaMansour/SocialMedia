import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import axios from "axios";
import PostCard from "../componant/posts/PostCard";
import Loading from "../componant/Loading";

export default function PostDetails() {
  const { token } = useContext(authContext);
  const { postId } = useParams();

  const [post, setPost] = useState(null);

  async function getPostDetail() {
    try {
      const { data } = await axios.get(
        `https://route-posts.routemisr.com/posts/${postId}`,
        {
          headers: {
            token: token,
          },
        },
      );

      setPost(data.data.post);
      console.log(data.data.post);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPostDetail();
  }, []);

  return (
    <div className="min-h-screen py-5 flex flex-col items-center ">
      {post ? (
        <PostCard post={post} showAllComments={true} />
      ) : (
      <Loading />
      )}
    </div>
  );
}
