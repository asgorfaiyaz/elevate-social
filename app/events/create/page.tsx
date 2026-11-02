import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { EventForm } from "@/components/events/event-form";
import { auth } from "@/lib/auth";

// to prevent next.js istant vavigation warning
export const instant = false;

export const metadata: Metadata = {
  title: "Create an Event — Elevate Social",
  description: "Create a local social service event for your community.",
};

export default async function CreateEventPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <EventForm
      userEmail={session.user.email}
      apiEndpoint={`${process.env.SERVER_URI}/events`}
    />
  );
}
