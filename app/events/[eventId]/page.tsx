import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { JoinEventButton } from "@/components/events/join-event-button";
import { getEventById } from "@/lib/events";

export const instant = false;

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await getEventById(eventId);
  if (!event) notFound();

  return (
    <main className="flex-1">
      <article className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All upcoming events
        </Link>

        {/* Event images may be hosted on any domain supplied by organizers. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnailImageUrl}
          alt={event.title}
          className="aspect-16/10 w-full object-cover"
        />
        <div className="mt-7">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {event.eventType}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            {event.title}
          </h1>
          <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            <p className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              {event.location}
            </p>
            <p className="flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="size-4 text-primary"
              />
              {event.eventDate}
            </p>
          </div>
          <p className="mt-7 whitespace-pre-line leading-7 text-foreground/85">
            {event.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <JoinEventButton
              key={event._id}
              eventId={event._id}
              apiEndpoint={
                process.env.SERVER_URI
                  ? `${process.env.SERVER_URI}/events/${encodeURIComponent(event._id)}/join`
                  : undefined
              }
              statusEndpoint={
                process.env.SERVER_URI
                  ? `${process.env.SERVER_URI}/events/${encodeURIComponent(event._id)}/join-status`
                  : undefined
              }
            />
            <Link
              href="/upcoming-events"
              className={buttonVariants({
                variant: "outline",
                className: "h-10 w-full sm:w-auto",
              })}
            >
              Browse more events
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
