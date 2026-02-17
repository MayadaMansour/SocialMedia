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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { EyeSlashFilledIcon } from "../componant/password/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../componant/password/EyeFilledIcon";
import { schema } from "../validation/schema";
import { getInputProps, getSelectProps } from "../helpers/authHelper";

import authSideImage from "../assets/login.webp";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  async function signUp(data) {
    setIsLoading(true);
    setErrorMsg("");
    try {
      await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        data
      );

      addToast({
        title: "Success",
        description: "Account created successfully",
        color: "success",
      });

      navigate("/signin");
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl shadow-2xl">

      <div
        className="hidden md:flex bg-cover bg-center "
        style={{ backgroundImage: `url(${authSideImage}) ` }}
      />

      <div className="p-6 sm:p-10 flex items-center justify-center">
        <Card className="bg-transparent shadow-none w-full max-w-md">
          <CardHeader className="text-center mb-4 ">
            <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
            <p className="text-sm text-gray-300">It’s quick and easy</p>
          </CardHeader>

          <CardBody>
            <form className="space-y-4" onSubmit={handleSubmit(signUp)}>

              <Input {...getInputProps({ name: "name", label: "Full Name", errors })} {...register("name")} />
              <Input {...getInputProps({ name: "email", label: "Email", type: "email", errors })} {...register("email")} />

              <Input {...getInputProps({
                name: "password",
                label: "Password",
                type: showPassword ? "text" : "password",
                errors,
                endContent: (
                  <button type="button" onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                  </button>
                ),
              })} {...register("password")} />

              <Input {...getInputProps({
                name: "rePassword",
                label: "Confirm Password",
                type: showConfirmPassword ? "text" : "password",
                errors,
                endContent: (
                  <button type="button" onClick={() => setShowConfirmPassword(p => !p)}>
                    {showConfirmPassword ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                  </button>
                ),
              })} {...register("rePassword")} />

              <Input {...getInputProps({ name: "dateOfBirth", label: "Date of Birth", type: "date", errors })} {...register("dateOfBirth")} />

              <Select {...getSelectProps({ name: "gender", label: "Gender", errors })} {...register("gender")}>
                <SelectItem key="male">Male</SelectItem>
                <SelectItem key="female">Female</SelectItem>
              </Select>

              <Button isLoading={isLoading} type="submit" radius="full" size="lg" className="w-full bg-primary text-white">
                Sign Up
              </Button>

              <p className="text-center text-sm text-gray-300">
                Already have an account? <Link to="/signin" className="text-primary hover:underline">Sign in</Link>
              </p>

              {errorMsg && <Alert className="bg-red-500/10 border border-red-500/30 text-red-400">{errorMsg}</Alert>}
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
