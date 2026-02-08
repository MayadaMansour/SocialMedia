import React from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import bgImage from "../assets/bg.jpg";
import signupImage from "../assets/login.webp";
import { EyeSlashFilledIcon } from "../componant/password/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../componant/password/EyeFilledIcon";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const password = watch("password");

  function signUp(data) {
    console.log("✅ Sign up data:", data);
  }

  function getInputProp({ label, type, placeholder, endContent }) {
    return {
      label,
      type,
      placeholder,
      isRequired: true,
      classNames: { inputWrapper: "bg-white/90" },
      endContent,
    };
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20 p-8">
          <img src={signupImage} alt="Sign up" className="max-w-full h-auto" />
        </div>

        {/* Form */}
        <div className="p-6 sm:p-10">
          <Card className="bg-transparent shadow-none">
            <CardHeader className="flex flex-col gap-1 text-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Create Account ✨
              </h1>
              <p className="text-sm text-gray-600">
                Join us and start your journey
              </p>
            </CardHeader>

            <CardBody>
              <form className="space-y-5" onSubmit={handleSubmit(signUp)}>
                <Input
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  {...getInputProp({
                    label: "Full Name",
                    type: "text",
                    placeholder: "John Doe",
                  })}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />

                <Input
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  {...getInputProp({
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                  })}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />

                <Input
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  {...getInputProp({
                    label: "Password",
                    type: showPassword ? "text" : "password",
                    placeholder: "••••••••",
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <Input
                  isInvalid={!!errors.rePassword}
                  errorMessage={errors.rePassword?.message}
                  {...getInputProp({
                    label: "Confirm Password",
                    type: showConfirmPassword ? "text" : "password",
                    placeholder: "••••••••",
                    endContent: (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashFilledIcon className="text-xl text-default-400" />
                        ) : (
                          <EyeFilledIcon className="text-xl text-default-400" />
                        )}
                      </button>
                    ),
                  })}
                  {...register("rePassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                <Input
                  isInvalid={!!errors.dateOfBirth}
                  errorMessage={errors.dateOfBirth?.message}
                  {...getInputProp({
                    label: "Date of Birth",
                    type: "date",
                  })}
                  {...register("dateOfBirth", {
                    required: "Date of birth is required",
                  })}
                />

                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Gender"
                      isInvalid={!!errors.gender}
                      errorMessage={errors.gender?.message}
                      classNames={{ trigger: "bg-white/90" }}
                    >
                      <SelectItem key="male">Male</SelectItem>
                      <SelectItem key="female">Female</SelectItem>
                    </Select>
                  )}
                />

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full"
                >
                  Sign Up
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link to="/" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
