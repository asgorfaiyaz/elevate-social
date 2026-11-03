import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EventCard } from "@/components/events/event-card";
import { buttonVariants } from "@/components/ui/button";
import { getJoinedEvents, type CommunityEvent } from "@/lib/events";
import { auth } from "@/lib/auth";

async function JoinedEventsList() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session?.user) redirect("/sign-in");

  const { token } = await auth.api.getToken({ headers: requestHeaders });
  const events: CommunityEvent[] = await getJoinedEvents(token);
  const sortedEvents = [...events].sort((first, second) => {
    const firstDate = Date.parse(first.eventDate); // miliseconds from 1970
    const secondDate = Date.parse(second.eventDate);

    // The Fallback Safety Guard (Number.isNaN)
    // if firstDate or secondDate results into NaN, in that case localeCompare is going to hanle this case as fallback
    if (Number.isNaN(firstDate) || Number.isNaN(secondDate)) {
      return first.eventDate.localeCompare(second.eventDate);
    }

    return firstDate - secondDate;
  });

  if (sortedEvents.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">
        You haven&apos;t joined an event yet. Browse local events and find a way
        to help your community.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedEvents.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

function JoinedEventsFallback() {
  return (
    <p
      role="status"
      className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground"
    >
      Loading your joined events...
    </p>
  );
}

export default function JoinedEventsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Your community commitments
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Joined events
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Keep track of the local service events you&apos;ve joined.
            </p>
          </div>
          <Link
            href="/upcoming-events"
            className={buttonVariants({
              className: "h-10 self-start sm:self-auto",
            })}
          >
            Browse events
          </Link>
        </header>

        <Suspense fallback={<JoinedEventsFallback />}>
          <JoinedEventsList />
        </Suspense>
      </section>
    </main>
  );
}
