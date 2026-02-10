import { Outlet } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

export default function AuthLayout() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
