import { useEffect, useState } from "react";
import Posts from "../componant/posts/Posts";
import CreatePost from "../componant/posts/CreatePost";
import Loading from "../componant/Loading";
import { apiServices } from "../services/api";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const response = await apiServices.getPosts();
      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <CreatePost getPosts={getPosts} />
      {loading ? <Loading /> : <Posts posts={posts} refreshPost={getPosts} />}
    </div>
  );
}
