import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up — Social Event",
  description: "Create your Social Event account.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
