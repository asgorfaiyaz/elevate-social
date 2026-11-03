import Link from "next/link";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarPlus } from "lucide-react";

import { ManageEventCard } from "@/components/events/manage-event-card";
import { buttonVariants } from "@/components/ui/button";
import { getMyEvents } from "@/lib/events";
import { auth } from "@/lib/auth";

async function ManagedEventsList() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session?.user) redirect("/sign-in");

  const { token } = await auth.api.getToken({ headers: requestHeaders });
  const userEvents = await getMyEvents(token);

  if (userEvents.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">
        You haven&apos;t created an event yet. Start a local service event and
        invite your neighbors to help.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {userEvents.map((event) => (
        <ManageEventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

function ManageEventsFallback() {
  return (
    <p
      role="status"
      className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground"
    >
      Loading your events...
    </p>
  );
}

export default function ManageEventsPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary">
              Your events
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Manage events
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Update event details or remove an event you organized.
            </p>
          </div>
          <Link
            href="/events/create"
            className={buttonVariants({
              className: "h-10 gap-2 self-start sm:self-auto",
            })}
          >
            <CalendarPlus aria-hidden="true" className="size-4" />
            Create event
          </Link>
        </header>

        <Suspense fallback={<ManageEventsFallback />}>
          <ManagedEventsList />
        </Suspense>
      </section>
    </main>
  );
}
