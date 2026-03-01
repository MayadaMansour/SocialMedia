import { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { apiServices } from "../../services/api";
import PostCard from "../posts/PostCard";
import CreatePost from "../posts/CreatePost";
import Loading from "../Loading";

export default function ProfilePosts() {
  const { userData } = useContext(authContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMyPosts() {
    try {
      const response = await apiServices.getProfilePosts(userData._id);

      setPosts(response.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userData) {
      getMyPosts();
    }
  }, [userData]);

  if (loading) return <Loading />;

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4">
      <h3 className="text-xl font-semibold">My Posts</h3>

      <CreatePost getPosts={getMyPosts} />

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts yet</p>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id} post={post} refreshPost={getMyPosts} />
        ))
      )}
    </div>
  );
}
