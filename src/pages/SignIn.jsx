import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Alert,
  addToast,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EyeSlashFilledIcon } from "../componant/password/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../componant/password/EyeFilledIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../validation/schema";
import { getInputProps } from "../helpers/authHelper";
import axios from "axios";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  async function signIn(loginData) {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        loginData,
      );
      addToast({
        title: "Sucess",
        description: "Login successfully",
        color: "success",
      });
      navigate("/feed");
      console.log(data);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.error || "Something went wrong, try again",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 sm:p-10">
      <Card className="bg-transparent shadow-none">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Welcome Back ✨
          </h1>
          <p className="text-sm text-gray-600">Login to your account</p>
        </CardHeader>

        <CardBody>
          <form className="space-y-5" onSubmit={handleSubmit(signIn)}>
            <Input
              {...getInputProps({
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "you@example.com",
                errors,
              })}
              {...register("email")}
            />
            <Input
              {...getInputProps({
                name: "password",
                label: "Password",
                type: showPassword ? "text" : "password",
                placeholder: "••••••••",
                errors,
                endContent: (
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                  >
                    {showPassword ? (
                      <EyeSlashFilledIcon className="text-xl text-default-400" />
                    ) : (
                      <EyeFilledIcon className="text-xl text-default-400" />
                    )}
                  </button>
                ),
              })}
              {...register("password")}
            />
           
            <Button
              isLoading={isLoading}
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
            >
              Sign In
            </Button>

            <p className="text-center text-sm text-gray-600">
              Create an account?
              <Link to="/signup" className="text-primary hover:underline">
                Sign Up
              </Link>
            </p>
            {errorMsg && (
              <Alert
                color="danger"
                variant="flat"
                className={{ base: "capitalize" }}
              >
                {errorMsg}
              </Alert>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
