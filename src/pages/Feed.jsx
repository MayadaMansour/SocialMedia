import React, { useEffect, useState } from "react";
import axios from "axios";
import Posts from "../componant/Posts";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-10">
        Loading posts...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Posts posts={posts} />
    </div>
  );
}
