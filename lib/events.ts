import type { EventFormValues } from "@/lib/validations/event";
import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";

export type CommunityEvent = EventFormValues & {
  _id: string;
  createdByEmail: string;
};

const events_url = `${process.env.SERVER_URI}/events`;
export async function getEvents(
  eventType?: string,
  title?: string,
): Promise<CommunityEvent[]> {
  const url = new URL(events_url);
  if (eventType) url.searchParams.set("eventType", eventType);
  if (title) url.searchParams.set("title", title);

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load events");

  const result = await response.json();
  return Array.isArray(result.data?.events) ? result.data.events : [];
}

export async function getRecentUpcomingEvents(): Promise<CommunityEvent[]> {
  // In Next.js, connection() is a built-in utility used to explicitly force dynamic rendering.
  // It tells Next.js to wait for an incoming user request before rendering the component
  await connection();
  const events = await getEvents();
  const todayUtc = new Date().toISOString().slice(0, 10);

  return events
    .filter((event) => {
      const timestamp = Date.parse(event.eventDate);
      return (
        !Number.isNaN(timestamp) &&
        new Date(timestamp).toISOString().slice(0, 10) >= todayUtc
      );
    })
    .sort((first, second) => first.eventDate.localeCompare(second.eventDate))
    .slice(0, 6);
}

export async function getJoinedEvents(
  token: string,
): Promise<CommunityEvent[]> {
  const response = await fetch(`${process.env.SERVER_URI}/events/joined`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not load joined events");

  const result = await response.json();
  return result.data?.events || [];
}

export async function getMyEvents(token: string): Promise<CommunityEvent[]> {
  const response = await fetch(`${process.env.SERVER_URI}/events/my`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Could not load your events");

  const result = await response.json();
  return Array.isArray(result.data?.events) ? result.data.events : [];
}

export async function getEventById(
  eventId: string,
): Promise<CommunityEvent | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("events", `event-${eventId}`);

  const response = await fetch(`${process.env.SERVER_URI}/events/${eventId}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Could not load event");

  const result = await response.json();
  return result.data.event;
}
