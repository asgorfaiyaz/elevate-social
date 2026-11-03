import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Newsletter() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden border-border/70 bg-card text-card-foreground shadow-sm">
          <CardContent className="grid gap-8 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div className="max-w-2xl">
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <HeartHandshake aria-hidden="true" className="size-5" />
              </div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Your neighborhood needs you
              </p>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Make your next plan count.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                Find a local cause to join or bring your own community drive to
                life. Good things start when neighbors show up.
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="size-4 text-primary" />
                Explore opportunities around Dhaka
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link
                href="/upcoming-events"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2",
                )}
              >
                Explore local events
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "gap-2",
                )}
              >
                Start a community drive
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
