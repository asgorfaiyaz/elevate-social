import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CommunityEvent } from "@/lib/events";

export function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <Card className="group h-full border-border/70 p-0 transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <Image
          src={event.thumbnailImageUrl}
          alt={`Volunteers at ${event.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
          {event.eventType}
        </span>
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <p className="mb-2 flex min-h-5 items-center gap-2 text-sm font-medium text-primary">
          <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
          <time className="line-clamp-1" dateTime={event.eventDate}>
            {event.eventDate}
          </time>
        </p>
        <h2 className="line-clamp-2 min-h-14 font-heading text-xl font-semibold leading-snug tracking-tight">
          {event.title}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-muted-foreground">
          {event.description}
        </p>
        <p className="mt-auto flex min-h-5 items-center gap-2 pt-4 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          <span className="line-clamp-1">{event.location}</span>
        </p>

        <Link
          href={`/events/${event._id}`}
          aria-label={`View ${event.title}`}
          className={buttonVariants({
            variant: "outline",
            className: "mt-5 w-full gap-2",
          })}
        >
          View event
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
