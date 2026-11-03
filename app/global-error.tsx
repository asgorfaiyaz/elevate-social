"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import "./globals.css";

export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground">
        <main className="flex min-h-screen items-center justify-center px-4 py-20">
          <section className="w-full max-w-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-destructive">
              Something went wrong
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Elevate Social couldn&apos;t load
            </h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              Please try again in a moment.
            </p>
            <Button type="button" className="mt-6" onClick={retry}>
              Try again
            </Button>
          </section>
        </main>
      </body>
    </html>
  );
}
