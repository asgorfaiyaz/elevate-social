import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In — Social Event",
  description: "Sign in to your Social Event account.",
};

export default function SignInPage() {
  return <SignInForm />;
}
