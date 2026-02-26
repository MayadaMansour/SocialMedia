import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { apiServices } from "../../services/api";

export default function PostHeader({ post, getPosts }) {
  const { userData } = useContext(authContext);
  const [openMenu, setOpenMenu] = useState(false);

  const isMyPost =
    String(post.user?._id) === String(userData?._id);

  async function handleDeletePost() {
    await apiServices.deletePost(post._id);
    setOpenMenu(false);
    await getPosts();
  }

  return (
    <div className="flex items-center justify-between p-4">

      <div className="flex items-center gap-3">
        <img
          src={post.user?.photo}
          className="w-10 h-10 rounded-full object-cover"
          alt=""
        />

        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            {post.user?.name}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {isMyPost && (
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-gray-500 hover:text-gray-800 text-xl px-2"
          >
            ⋮
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-1 w-28 bg-white border rounded-lg shadow-md text-sm z-20">
              <button
                onClick={handleDeletePost}
                className="block w-full text-left px-3 py-2 hover:bg-red-50 text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}