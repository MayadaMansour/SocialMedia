import "./App.css";
import { HeroUIProvider } from "@heroui/system";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "@heroui/react";

import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Feed /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <RouterProvider router={router} />
    </HeroUIProvider>
  );
}
