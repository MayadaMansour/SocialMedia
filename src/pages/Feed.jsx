import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../componant/posts/Posts";
import CreatePost from "../componant/posts/CreatePost";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data } = await axios.get(
        "https://route-posts.routemisr.com/posts",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      setPosts(data.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  
  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading posts...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4 ">
      <CreatePost
        onPostCreated={(newPost) => setPosts((prev) => [newPost, ...prev])}
      />
      <Posts posts={posts} />
    </div>
  );
}
