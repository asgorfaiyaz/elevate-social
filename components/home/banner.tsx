import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Banner() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 border-b border-border/40">
      <Image
        src="/images/banner-01.jpg"
        alt="Community and Social Development"
        fill // Woww, this attribute is new for me which I've learnt.
        priority // With priority, Next.js gives the image loading priority to help it appear sooner.
        sizes="100vw"
        className="object-cover object-center -z-20 bg-no-repeat"
      />

      {/* Contrast Overlay (supports both light and dark mode readability) */}
      <div className="absolute inset-0 bg-black/70 dark:bg-background/80 backdrop-blur-[1px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start space-y-6 lg:col-span-7">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-background dark:text-foreground sm:text-5xl lg:text-6xl">
              Unite for a cause.{" "}
              <span className="text-white dark:text-primary-foreground">
                Elevate your community.
              </span>
            </h1>

            <p className="max-w-2xl text-base text-white dark:text-gray-300 sm:text-lg">
              Join thousands of volunteers, changemakers, and local leaders
              organizing impactful events, charity drives, and grassroots
              initiatives to build a stronger, more equitable tomorrow.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/upcoming-events"
                className={cn(buttonVariants({ size: "lg" }), "gap-2")}
              >
                Explore Upcoming Drives
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "gap-2",
                )}
              >
                <HeartHandshake className="size-4 text-black dark:text-primary-foreground" />
                Become a Volunteer
              </Link>
            </div>

            {/* Social Impact Stats Bar (static data) */}
            <div className="grid grid-cols-3 gap-6 border-t border-border/50 pt-8 text-left">
              <div>
                <p className="font-heading text-2xl font-bold text-white dark:text-foreground">
                  25k+
                </p>
                <p className="text-xs text-white dark:text-muted-foreground">
                  Volunteers Mobilized
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-white dark:text-foreground">
                  480+
                </p>
                <p className="text-xs text-white dark:text-muted-foreground">
                  Community Drives
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-white dark:text-foreground">
                  100%
                </p>
                <p className="text-xs text-white dark:text-muted-foreground">
                  Free & Open
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
