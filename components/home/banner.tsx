import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";

import { BannerVideo } from "@/components/home/banner-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Banner() {
  return (
    <section className="relative isolate min-h-155 overflow-hidden border-b border-border/60 bg-slate-950">
      <BannerVideo />
      <div className="absolute inset-0 -z-10 bg-[url('/images/banner-01.jpg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />

      <div className="container relative mx-auto flex min-h-155 items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl rounded-2xl border border-white/15 bg-slate-950/25 p-6 text-white shadow-2xl backdrop-blur-sm sm:p-9">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Bring your neighborhood together for good.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
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
                "gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white",
              )}
            >
              <HeartHandshake aria-hidden="true" className="size-4" />
              Start an event
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/70">
            From winter clothing drives to neighborhood cleanups, there&apos;s a
            way to help nearby.
          </p>
        </div>
      </div>
    </section>
  );
}
