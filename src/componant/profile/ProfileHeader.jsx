export default function ProfileHeader({ user, postsCount }) {
  return (
    <div className="bg-white w-full max-w-3xl shadow rounded-xl p-6 flex items-center gap-6">

      <img
        src={user?.photo}
        alt="profile"
        className="w-28 h-28 rounded-full object-cover border"
      />

      <div className="flex flex-col gap-2">

        <h2 className="text-2xl font-bold">
          {user?.name}
        </h2>

        <p className="text-gray-500">
          {user?.email}
        </p>

        <div className="flex gap-6 mt-2 text-sm text-gray-600">

          <span>
            <strong>{postsCount}</strong> Posts
          </span>

          <span>
            <strong>{user?.followers?.length}</strong> Followers
          </span>

          <span>
            <strong>{user?.following?.length}</strong> Following
          </span>

        </div>

      </div>

    </div>
  );
}