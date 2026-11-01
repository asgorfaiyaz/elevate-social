import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In — Elevate Social",
  description: "Sign in to find and organize local community events.",
};

export default function SignInPage() {
  return <SignInForm />;
}
