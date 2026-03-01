export default function ProfileInfo({ user }) {
  return (
    <div className="bg-white w-full max-w-3xl shadow rounded-xl p-5">

      <h3 className="text-lg font-semibold mb-3">
        Personal Information
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <p>
          <span className="font-semibold">Name:</span> {user?.name}
        </p>

        <p>
          <span className="font-semibold">Email:</span> {user?.email}
        </p>

        <p>
          <span className="font-semibold">Gender:</span> {user?.gender}
        </p>

        <p>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {new Date(user?.dateOfBirth).toLocaleDateString()}
        </p>

      </div>

    </div>
  );
}