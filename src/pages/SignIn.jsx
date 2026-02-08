import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </CardHeader>

        <CardBody className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            isRequired
          />

          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            isRequired
          />

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              Remember me
            </label>

            <button className="text-primary hover:underline">
              Forgot password?
            </button>
          </div>

          <Button color="primary" size="lg" className="w-full">
            Sign In
          </Button>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
