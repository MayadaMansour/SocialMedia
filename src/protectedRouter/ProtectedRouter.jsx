import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";
import { useContext } from "react";

export default function ProtectedRouter({ children }) {
  const { token } = useContext(authContext);
  const isLoggedIn = !!token;

  return isLoggedIn ? children : <Navigate to={"/signin"} />;
}
