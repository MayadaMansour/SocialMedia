export default function ProfileHeader({ user, postsCount }) {
  return (
    <div className="w-full max-w-3xl bg-white rounded-xl shadow overflow-hidden">

      <div className="h-44 w-full relative">

        {user?.cover ? (
          <img
            src={user.cover}
            alt="cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
        )}

      </div>

      <div className="px-6 pb-6">

        <div className="relative -mt-16 mb-3">
          <img
            src={user?.photo}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow bg-white" 
          />
        </div>

        {/* NAME */}
        <h2 className="text-2xl font-bold text-gray-800">
          {user?.name}
        </h2>

        {/* EMAIL */}
        <p className="text-gray-500">
          {user?.email}
        </p>

        {/* STATS */}
        <div className="flex gap-8 mt-4 text-sm text-gray-600">

          <div>
            <span className="font-bold text-gray-900">
              {postsCount}
            </span>
            <p>Posts</p>
          </div>

          <div>
            <span className="font-bold text-gray-900">
              {user?.followers?.length || 0}
            </span>
            <p>Followers</p>
          </div>

          <div>
            <span className="font-bold text-gray-900">
              {user?.following?.length || 0}
            </span>
            <p>Following</p>
          </div>

        </div>

      </div>
    </div>
  );
}