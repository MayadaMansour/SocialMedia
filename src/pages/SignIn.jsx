import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Alert,
  addToast,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeSlashFilledIcon } from "../componant/password/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../componant/password/EyeFilledIcon";
import { getInputProps } from "../helpers/authHelper";

import authSideImage from "../assets/login.webp";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { apiServices } from "../services/api";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setUserToken } = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function signIn(loginData) {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await apiServices.signIn(loginData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setUserToken(token);
      addToast({
        title: "Success",
        description: "Logged in successfully",
        color: "success",
      });
    } catch (error) {
      setErrorMsg(error?.response?.data?.error || "Invalid email or password");
      console.log(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl shadow-2xl">
      <div
        className="hidden md:flex bg-cover bg-center"
        style={{ backgroundImage: `url(${authSideImage})` }}
      />

      <div className="p-6 sm:p-10 flex items-center justify-center">
        <Card className="bg-transparent shadow-none w-full max-w-md">
          <CardHeader className="mb-2 flex flex-col items-center gap-2">
            <h1 className="text-4xl font-extrabold text-white text-center">
              Welcome Back 👋
            </h1>

            <p className="text-sm text-gray-300 text-center">
              Log in to your Account
            </p>
          </CardHeader>

          <CardBody>
            <form className="space-y-4" onSubmit={handleSubmit(signIn)}>
              <Input
                {...getInputProps({
                  name: "email",
                  label: "Email",
                  type: "email",
                  errors,
                })}
                {...register("email")}
              />
              <Input
                {...getInputProps({
                  name: "password",
                  label: "Password",
                  type: showPassword ? "text" : "password",
                  errors,
                  endContent: (
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? (
                        <EyeSlashFilledIcon />
                      ) : (
                        <EyeFilledIcon />
                      )}
                    </button>
                  ),
                })}
                {...register("password")}
              />

              <Button
                isLoading={isLoading}
                type="submit"
                radius="full"
                size="lg"
                className="w-full bg-primary text-white"
              >
                Sign In
              </Button>

              <p className="text-center text-sm text-gray-300">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-primary-700 hover:underline">
                  Sign up
                </Link>
              </p>

              {errorMsg && (
                <Alert className="bg-red-500/10 border border-red-500/30 text-red-400">
                  {errorMsg}
                </Alert>
              )}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
