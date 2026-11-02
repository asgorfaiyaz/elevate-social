import type { EventFormValues } from "@/lib/validations/event";
import { cacheLife, cacheTag } from "next/cache";

export type CommunityEvent = EventFormValues & {
  _id: string;
  createdByEmail: string;
};

const events_url = `${process.env.SERVER_URI}/events`;
export async function getEvents(): Promise<CommunityEvent[]> {
  "use cache";
  cacheTag("events");
  cacheLife("hours");

  const response = await fetch(events_url);
  if (!response.ok) throw new Error("Could not load events");

  const result = await response.json();
  console.log(result);
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
