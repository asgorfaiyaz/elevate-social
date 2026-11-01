"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { signUpSchema, type SignUpValues } from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SignUpForm() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: SignUpValues) {
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      image: values.photoURL || undefined,
      callbackURL: "/sign-in",
    });

    if (error) {
      toast.error("Registration failed", {
        description: error.message ?? "Something went wrong. Please try again.",
      });
    } else {
      toast.success("Account created!", {
        description: "Welcome to Elevate Social. Sign in to continue.",
      });
      router.push("/sign-in");
    }
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) {
      toast.error("Google sign-in failed", {
        description: error.message ?? "Please try again.",
      });
    }
    setGoogleLoading(false);
  }

  return (
    <Card className="w-full border-border/70 shadow-lg shadow-foreground/5">
      <CardHeader className="px-6 pt-7 sm:px-8 sm:pt-8">
        <CardTitle className="font-heading text-3xl font-bold tracking-tight">
          Create your account
        </CardTitle>
        <CardDescription className="text-sm leading-6">
          Join Elevate Social to find, join, and organize local service events.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-6 sm:px-8">
        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full"
          onClick={handleGoogle}
          disabled={googleLoading || isSubmitting}
        >
          {googleLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <FcGoogle className="size-4" />
          )}
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs font-medium text-muted-foreground">
            Or sign up with email
          </span>
          <Separator className="flex-1" />
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            {/* Name */}
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                className="h-11"
                {...register("name")}
              />
              <FieldError errors={[errors.name]} />
            </Field>

            {/* Email */}
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="reg-email">Email</FieldLabel>
              <Input
                id="reg-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className="h-11"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "reg-email-error" : undefined}
                {...register("email")}
              />
              <FieldError id="reg-email-error" errors={[errors.email]} />
            </Field>

            {/* Photo URL */}
            <Field data-invalid={!!errors.photoURL}>
              <FieldLabel htmlFor="photoURL">
                Photo URL{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </FieldLabel>
              <Input
                id="photoURL"
                type="url"
                placeholder="https://example.com/avatar.png"
                autoComplete="photo"
                className="h-11"
                {...register("photoURL")}
              />
              <FieldDescription id="photoURL-hint">
                A public URL to your profile picture.
              </FieldDescription>
              <FieldError errors={[errors.photoURL]} />
            </Field>

            {/* Password */}
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="reg-password">Password</FieldLabel>
              <PasswordInput
                id="reg-password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="h-11"
                {...register("password")}
              />
              <FieldDescription id="reg-password-hint">
                Min. 6 characters with uppercase and lowercase letters.
              </FieldDescription>
              <FieldError errors={[errors.password]} />
            </Field>

            {/* Confirm password */}
            <Field data-invalid={!!errors.confirmPassword}>
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                id="confirmPassword"
                placeholder="••••••••"
                autoComplete="new-password"
                className="h-11"
                {...register("confirmPassword")}
              />
              <FieldError errors={[errors.confirmPassword]} />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="mt-5 h-11 w-full"
            disabled={isSubmitting || googleLoading}
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center px-6 pb-7 sm:px-8 sm:pb-8">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground underline underline-offset-4  transition-colors"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
