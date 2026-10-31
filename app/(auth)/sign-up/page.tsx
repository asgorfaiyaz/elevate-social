import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up — Elevate Social",
  description: "Create your Elevate Social account.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
