import { z } from "zod";

export const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Food Distribution",
  "Clothing Distribution",
  "Education",
  "Other",
] as const;

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getMinimumEventDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getLocalDateKey(tomorrow);
}

export const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Enter an event title.")
    .max(100, "Event titles must be 100 characters or fewer."),
  description: z
    .string()
    .trim()
    .min(1, "Enter an event description.")
    .max(2000, "Descriptions must be 2,000 characters or fewer."),
  eventType: z.enum(EVENT_TYPES, {
    error: "Choose an event type.",
  }),
  thumbnailImageUrl: z
    .string()
    .trim()
    .url("Enter a valid image URL.")
    .refine((url) => /^https?:\/\//i.test(url), {
      message: "Image URLs must use HTTP or HTTPS.",
    }),
  location: z
    .string()
    .trim()
    .min(1, "Enter an event location.")
    .max(160, "Location must be 160 characters or fewer."),
  eventDate: z
    .string()
    .min(1, "Choose an event date.")
    .refine((date) => !date || date > getLocalDateKey(new Date()), {
      message: "Choose a date in the future.",
    }),
});

export const createEventSchema = eventSchema;

export type EventFormValues = z.infer<typeof eventSchema>;
export type CreateEventValues = EventFormValues;
