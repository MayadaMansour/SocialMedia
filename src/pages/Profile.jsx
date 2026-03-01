import { useContext, useEffect, useState } from "react";
import ProfileHeader from "../componant/profile/ProfileHeader";
import ProfileInfo from "../componant/profile/ProfileInfo";
import ProfilePosts from "../componant/profile/ProfilePosts";
import Loading from "../componant/Loading";
import { authContext } from './../context/AuthContext';
import { apiServices } from "../services/api";

export default function Profile() {
  const { userData } = useContext(authContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getMyPosts() {
    try {
      const response = await apiServices.getProfile();

      const myPosts = response.data.posts.filter(
        (post) => post.user._id === userData._id
      );

      setPosts(myPosts);
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
    <div className="flex flex-col items-center gap-6 p-6">

      <ProfileHeader user={userData} postsCount={posts.length} />

      <ProfileInfo user={userData} />

      <ProfilePosts posts={posts} refreshPosts={getMyPosts} />

    </div>
  );
}