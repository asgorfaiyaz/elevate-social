import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <section className="w-full max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          404 · Page not found
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 leading-7 text-muted-foreground">
          The event or page may have been removed, or the link may be incorrect.
        </p>
        <Link
          href="/upcoming-events"
          className={buttonVariants({ className: "mt-6" })}
        >
          Browse upcoming events
        </Link>
      </section>
    </main>
  );
}
