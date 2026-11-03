import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { EventForm } from "@/components/events/event-form";
import { auth } from "@/lib/auth";
import type { EventFormValues } from "@/lib/validations/event";
import { getEventById } from "@/lib/events";

export const instant = false;

export const metadata: Metadata = {
  title: "Update an Event — Elevate Social",
  description: "Update the details of your community service event.",
};

export default async function UpdateEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/sign-in");

  const event = await getEventById(eventId);
  if (!event) notFound();
  if (event.createdByEmail !== session.user.email) redirect("/upcoming-events");

  const initialValues: EventFormValues = {
    ...event,
    eventDate: event.eventDate.slice(0, 10),
  };

  return (
    <EventForm
      userEmail={session.user.email}
      apiEndpoint={`${process.env.SERVER_URI}/events`}
      mode="update"
      eventId={eventId}
      initialValues={initialValues}
    />
  );
}
