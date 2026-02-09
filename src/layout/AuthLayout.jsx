import SignUp from "./../pages/SignUp";
import bgImage from "../assets/bg.jpg";

export default function AuthLayout() {
  return (
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">

    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <SignUp />
      </div>
    </div>
    </div>
  );
}
