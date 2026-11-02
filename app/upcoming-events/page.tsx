import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { EventCard } from "@/components/events/event-card";
import { EventFilters } from "@/components/events/event-filters";
import { buttonVariants } from "@/components/ui/button";
import { getEvents, type CommunityEvent } from "@/lib/events";
import { EVENT_TYPES } from "@/lib/validations/event";

type UpcomingEventsPageProps = {
  searchParams: Promise<{
    eventType?: string | string[];
    title?: string | string[];
  }>;
};

async function UpcomingEventsContent({
  searchParams,
}: UpcomingEventsPageProps) {
  const { title, eventType } = await searchParams;
  const selectedTitle = title as string;
  const selectedType = eventType as string;

  const events: CommunityEvent[] = await getEvents(
    selectedType || undefined,
    selectedTitle || undefined,
  );

  return (
    <>
      <EventFilters
        eventTypes={EVENT_TYPES}
        initialEventType={selectedType}
        initialTitle={selectedTitle}
      />

      {events.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">
          There are no upcoming events yet. Create one and bring your community
          together.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}

function EventsFallback() {
  return (
    <p
      role="status"
      className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground"
    >
      Loading community events...
    </p>
  );
}

export default function UpcomingEventsPage({
  searchParams,
}: UpcomingEventsPageProps) {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Make a difference nearby
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Upcoming community events
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Find local service events and join your neighbors in helping the
              community.
            </p>
          </div>
          <Link
            href="/events/create"
            className={buttonVariants({
              className: "h-10 gap-2 self-start sm:self-auto",
            })}
          >
            <Plus aria-hidden="true" />
            Create event
          </Link>
        </header>

        <Suspense fallback={<EventsFallback />}>
          <UpcomingEventsContent searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  );
}
