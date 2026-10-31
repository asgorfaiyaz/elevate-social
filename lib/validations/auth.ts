import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.");

export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: passwordSchema,
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(60, "Name is too long."),
    email: z.email("Enter a valid email address."),
    photoURL: z.url("Enter a valid URL.").optional().or(z.literal("")),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignInValues = z.infer<typeof signInSchema>;
export type SignUpValues = z.infer<typeof signUpSchema>;
