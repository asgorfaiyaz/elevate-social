import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Banner() {
  return (
    <section className="border-b border-border/60 bg-background py-14 sm:py-16 lg:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col items-start">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-2 text-sm font-medium text-foreground">
            <MapPin aria-hidden="true" className="size-4 text-primary" />
            Local events. Real community impact.
          </div>

          <h1 className="max-w-2xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Bring your neighborhood together for good.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Find a cause close to home, join a volunteer drive, or organize an
            event of your own. Small acts of care can make a lasting difference
            across Dhaka.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/upcoming-events"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Find a local event
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "gap-2",
              )}
            >
              <HeartHandshake aria-hidden="true" className="size-4 text-primary" />
              Start an event
            </Link>
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            From winter clothing drives to neighborhood cleanups, there’s a way
            to help nearby.
          </p>
        </div>

        <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-border bg-muted shadow-lg sm:min-h-[480px]">
          <Image
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&h=1200&fit=crop"
            alt="Community volunteers working together at a local service event"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <div className="rounded-xl border border-white/20 bg-black/35 p-4 text-white shadow-sm backdrop-blur-md sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                Make a difference close to home
              </p>
              <p className="mt-2 font-heading text-xl font-semibold sm:text-2xl">
                Winter Clothes Distribution
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-white/85">
                <MapPin aria-hidden="true" className="size-4" />
                Mirpur 10, Dhaka
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
