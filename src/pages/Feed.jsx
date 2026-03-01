// import { useEffect, useState } from "react";
// import Posts from "../componant/posts/Posts";
// import CreatePost from "../componant/posts/CreatePost";
// import Loading from "../componant/Loading";
// import { apiServices } from "../services/api";

// export default function Feed() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getPosts();
//   }, []);

//   async function getPosts() {
//     try {
//       const response = await apiServices.getPosts();
//       setPosts(response.data.posts);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <CreatePost getPosts={getPosts} />
//       {loading ? <Loading /> : <Posts posts={posts} refreshPost={getPosts} />}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { apiServices } from "../services/api";
import CreatePost from "../componant/posts/CreatePost";
import PostCard from "../componant/posts/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  async function getPosts() {
    const data = await apiServices.getPosts();
    setPosts(data.data.posts);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <CreatePost
        getPosts={getPosts}
        editPost={editingPost}
        cancelEdit={() => setEditingPost(null)}
      />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          refreshPost={getPosts}
          setEditingPost={setEditingPost}
        />
      ))}
    </div>
  );
}
