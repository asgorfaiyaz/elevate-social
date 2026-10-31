"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { UserMenu } from "./user-menu";

export function AuthButton({ className }: { className?: string }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="size-8 animate-pulse rounded-full bg-muted" />;
  }

  if (session?.user) {
    return <UserMenu />;
  }

  return (
    <Link href="/sign-in" className={cn(buttonVariants(), className)}>
      Sign In
    </Link>
  );
}
