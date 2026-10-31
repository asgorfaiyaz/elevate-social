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
      callbackURL: "/",
    });

    if (error) {
      toast.error("Registration failed", {
        description: error.message ?? "Something went wrong. Please try again.",
      });
    } else {
      toast.success("Account created!", {
        description: "Welcome to Elevate Social. You're now signed in.",
      });
      router.push("/");
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Join Socail Event and start connecting today.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Google */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
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
          <span className="text-xs text-muted-foreground">
            or register with email
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
                {...register("confirmPassword")}
              />
              <FieldError errors={[errors.confirmPassword]} />
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="mt-5 w-full"
            disabled={isSubmitting || googleLoading}
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}
            Create Account
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center">
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
