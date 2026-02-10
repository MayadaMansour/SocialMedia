import { regex } from "../validation/regex";
import * as zod from "zod";
import { isAdult } from "../validation/birthdata";




export   const schema = zod
    .object({
      name: zod
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters"),
      email: zod
        .string()
        .min(1, "Email is required")
        .regex(regex.email, "Please enter a valid email"),
      password: zod
        .string()
        .regex(
          regex.password,
          "Password must be 8–10 chars, include uppercase, lowercase, number & special character",
        ),
      rePassword: zod.string(),
      dateOfBirth: zod.string().min(1, "Date of birth is required"),
      gender: zod.string().min(1, "Gender is required"),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: "Passwords do not match",
    })
    .refine((data) => isAdult(data.dateOfBirth), {
      path: ["dateOfBirth"],
      message: "You must be at least 18 years old",
    });
