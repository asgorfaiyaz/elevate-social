"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <section className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-destructive">
          Something went wrong
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          Please try again, or return to the events list.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" onClick={retry}>
            Try again
          </Button>
          <Link
            href="/"
            className={buttonVariants({ variant: "outline" })}
          >
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}
