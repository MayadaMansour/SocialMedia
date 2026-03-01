import ChangePasswordForm from "../componant/passwordchange/ChangePasswordForm";

export default function Setting() {
  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-xl">

        <h1 className="text-2xl font-semibold mb-6">
          Account Settings
        </h1>

        <ChangePasswordForm />

      </div>
    </div>
  );
}