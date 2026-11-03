import { EventCard } from "@/components/events/event-card";
import { getRecentUpcomingEvents } from "@/lib/events";

export async function RecentUpcomingEvents() {
  const events = await getRecentUpcomingEvents();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-8 max-w-2xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
          Get involved nearby
        </p>
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Upcoming community events
        </h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Find a local service event and join your neighbors in making a
          difference.
        </p>
      </header>

      {events.length === 0 ? (
        <p className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">
          No upcoming events yet. Check back soon or create one for your
          community.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}

export function RecentUpcomingEventsFallback() {
  return (
    <section
      aria-busy="true"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <p role="status" className="text-center text-muted-foreground">
        Loading upcoming events...
      </p>
    </section>
  );
}
