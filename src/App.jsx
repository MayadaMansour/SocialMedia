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
import ProtectedRouter from "./protectedRouter/ProtectedRouter";
import ProtectedAuthRouter from "./protectedRouter/ProtectedAuthRouter";
import AuthContextProvider from "./context/AuthContext";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signup",
        element: (
          <ProtectedAuthRouter>
            <SignUp />
          </ProtectedAuthRouter>
        ),
      },
      {
        path: "/signin",
        element: (
          <ProtectedAuthRouter>
            <SignIn />
          </ProtectedAuthRouter>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouter>
            <Feed />
          </ProtectedRouter>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthContextProvider>
      <HeroUIProvider>
        <ToastProvider />
        <RouterProvider router={router} />
      </HeroUIProvider>
    </AuthContextProvider>
  );
}
