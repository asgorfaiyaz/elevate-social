import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create an Account — Elevate Social",
  description: "Join your local community and take part in service events.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
