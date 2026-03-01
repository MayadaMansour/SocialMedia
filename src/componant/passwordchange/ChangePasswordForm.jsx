import { useContext, useState } from "react";
import { apiServices } from "../../services/api";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../passwordchange/PasswordInput";
import { addToast } from "@heroui/react";
import { authContext } from "../../context/AuthContext";

export default function ChangePasswordForm() {

  const navigate = useNavigate();
  const { setUserToken, getUserData } = useContext(authContext);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentPassword || !password || !rePassword) {
      addToast({
        title: "Error",
        description: "All fields are required",
        color: "danger",
      });
      return;
    }

    if (password !== rePassword) {
      addToast({
        title: "Error",
        description: "Passwords do not match",
        color: "danger",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await apiServices.changePassword({
        password: currentPassword,
        newPassword: password,
      });

      const newToken = response?.token || response?.data?.token;

      if (newToken) {
        localStorage.setItem("token", newToken);
        setUserToken(newToken);
        await getUserData();
      }

      addToast({
        title: "Success",
        description: "Password changed successfully",
        color: "success",
      });

      setCurrentPassword("");
      setPassword("");
      setRePassword("");

      setTimeout(() => {
        navigate("/profile");
      }, 1200);

    } catch (error) {

      addToast({
        title: "Error",
        description:
          error.response?.data?.message || "Error updating password",
        color: "danger",
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full">

      <h2 className="text-lg font-semibold mb-5">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <PasswordInput
          label="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <PasswordInput
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          label="Confirm Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        <button
          disabled={loading}
          className={`mt-2 py-2 rounded-lg text-white font-medium transition
          ${loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </form>
    </div>
  );
}