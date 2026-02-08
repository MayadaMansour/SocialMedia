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

import bgImage from "../assets/bg.jpg";
import signupImage from "../assets/login.webp";

export default function SignUp() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0" />
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-600/20 p-8">
          <img
            src={signupImage}
            alt="Sign up illustration"
            className="max-w-full h-auto"
          />
        </div>
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
              <form className="space-y-5">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  isRequired
                  classNames={{ inputWrapper: "bg-white/90" }}
                />

                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  isRequired
                  classNames={{ inputWrapper: "bg-white/90" }}
                />

                <Input
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  isRequired
                  classNames={{ inputWrapper: "bg-white/90" }}
                />

                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="••••••••"
                  isRequired
                  classNames={{ inputWrapper: "bg-white/90" }}
                />

                <Input
                  type="date"
                  label="Date of Birth"
                  isRequired
                  classNames={{ inputWrapper: "bg-white/90" }}
                />

                <Select
                  label="Gender"
                  placeholder="Select gender"
                  isRequired
                  classNames={{ trigger: "bg-white/90" }}
                >
                  <SelectItem key="male">Male</SelectItem>
                  <SelectItem key="female">Female</SelectItem>
                  <SelectItem key="other">Other</SelectItem>
                </Select>

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
