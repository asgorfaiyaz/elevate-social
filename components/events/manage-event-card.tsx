import Link from "next/link";
import { CalendarDays, Eye, MapPin, Pencil } from "lucide-react";

import { DeleteEventButton } from "@/components/events/delete-event-button";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CommunityEvent } from "@/lib/events";

export function ManageEventCard({ event }: { event: CommunityEvent }) {
  return (
    <Card className="group h-full border-border/70 p-0 transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        {/* Event images may come from organizer-provided URLs. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnailImageUrl}
          alt={event.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
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

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/70 pt-4">
          <Link
            href={`/events/${encodeURIComponent(event._id)}`}
            aria-label={`View ${event.title}`}
            className={buttonVariants({
              variant: "outline",
              className: "h-9 min-w-0 gap-1 px-2",
            })}
          >
            <Eye aria-hidden="true" className="size-4" />
            View
          </Link>
          <Link
            href={`/events/${encodeURIComponent(event._id)}/edit`}
            aria-label={`Edit ${event.title}`}
            className={buttonVariants({
              variant: "outline",
              className: "h-9 min-w-0 gap-1 px-2",
            })}
          >
            <Pencil aria-hidden="true" className="size-4" />
            Edit
          </Link>
          <DeleteEventButton
            eventTitle={event.title}
            apiEndpoint={
              process.env.SERVER_URI
                ? `${process.env.SERVER_URI}/events/${encodeURIComponent(event._id)}`
                : undefined
            }
            className="h-9 min-w-0 gap-1 px-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
