"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CalendarPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  eventSchema,
  EVENT_TYPES,
  getMinimumEventDate,
  type EventFormValues,
} from "@/lib/validations/event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EventFormProps = {
  userEmail: string;
  apiEndpoint?: string;
  mode?: "create" | "update";
  eventId?: string;
  initialValues?: Partial<EventFormValues>;
};

export function EventForm({
  userEmail,
  apiEndpoint,
  mode = "create",
  eventId,
  initialValues,
}: EventFormProps) {
  const router = useRouter();
  const isUpdating = mode === "update";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnailImageUrl: "",
      location: "",
      eventDate: "",
      ...initialValues,
    },
  });
  async function onSubmit(values: EventFormValues) {
    if (!apiEndpoint) {
      toast.error("Event API is not configured", {
        description: "Set SERVER_URI in your environment and try again.",
      });
      return;
    }

    if (isUpdating && !eventId) {
      toast.error("Cannot update event", {
        description: "An event ID is required to save changes.",
      });
      return;
    }

    const event = {
      ...values,
      createdByEmail: userEmail,
    };
    const action = isUpdating ? "updated" : "created";
    const url = isUpdating
      ? `${apiEndpoint}/${eventId}`
      : apiEndpoint;

    try {
      const response = await fetch(url, {
        method: isUpdating ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error("Request failed");

      toast.success(`Event ${action} successfully`);
      router.push("/upcoming-events");
    } catch {
      toast.error(`Event could not be ${action}`, {
        description: "Please check your connection and try again.",
      });
    }
  }

  return (
    <section className="w-full py-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/upcoming-events"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to upcoming events
        </Link>

        <Card className="border-border/70 shadow-lg shadow-foreground/5">
          <CardHeader className="px-6 pt-7 sm:px-8 sm:pt-8">
            <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarPlus aria-hidden="true" className="size-5" />
            </div>
            <CardTitle className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              {isUpdating
                ? "Update community event"
                : "Create a community event"}
            </CardTitle>
            <CardDescription className="text-sm leading-6 sm:text-base">
              {isUpdating
                ? "Update the event details and keep your neighbors informed."
                : "Share a local service event and invite your neighbors to take part."}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-7 sm:px-8 sm:pb-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup>
                <Field data-invalid={!!errors.title}>
                  <FieldLabel htmlFor="event-title">Event title</FieldLabel>
                  <Input
                    id="event-title"
                    placeholder="Winter Clothes Distribution"
                    className="h-11"
                    {...register("title")}
                  />
                  <FieldError errors={[errors.title]} />
                </Field>

                <Field data-invalid={!!errors.description}>
                  <FieldLabel htmlFor="event-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    id="event-description"
                    placeholder="Tell people what the event is for and how they can help."
                    rows={5}
                    {...register("description")}
                  />
                  <FieldDescription>
                    Include the purpose of the event and what volunteers can
                    expect.
                  </FieldDescription>
                  <FieldError errors={[errors.description]} />
                </Field>

                <Field data-invalid={!!errors.eventType}>
                  <FieldLabel htmlFor="event-type">Event type</FieldLabel>
                  <select
                    id="event-type"
                    required
                    className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
                    {...register("eventType")}
                  >
                    <option value="">Choose an event type</option>
                    {EVENT_TYPES.map((eventType) => (
                      <option key={eventType} value={eventType}>
                        {eventType}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={[errors.eventType]} />
                </Field>

                <Field data-invalid={!!errors.thumbnailImageUrl}>
                  <FieldLabel htmlFor="thumbnail-image-url">
                    Thumbnail image URL
                  </FieldLabel>
                  <Input
                    id="thumbnail-image-url"
                    type="url"
                    placeholder="https://example.com/event-image.jpg"
                    className="h-11"
                    {...register("thumbnailImageUrl")}
                  />
                  <FieldDescription>
                    Add a publicly accessible image URL for the event thumbnail.
                  </FieldDescription>
                  <FieldError errors={[errors.thumbnailImageUrl]} />
                </Field>

                <Field data-invalid={!!errors.location}>
                  <FieldLabel htmlFor="event-location">Location</FieldLabel>
                  <Input
                    id="event-location"
                    placeholder="Mirpur 10, Dhaka"
                    className="h-11"
                    {...register("location")}
                  />
                  <FieldError errors={[errors.location]} />
                </Field>

                <Field data-invalid={!!errors.eventDate}>
                  <FieldLabel htmlFor="event-date">Event date</FieldLabel>
                  <Input
                    id="event-date"
                    type="date"
                    // min attribute expects = `year-month-day` for specifing a min date
                    min={getMinimumEventDate()}
                    className="h-11"
                    {...register("eventDate")}
                  />
                  <FieldDescription>
                    Choose a date after today.
                  </FieldDescription>
                  <FieldError errors={[errors.eventDate]} />
                </Field>
              </FieldGroup>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11"
                  onClick={() => router.push("/upcoming-events")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                  {isUpdating ? "Save changes" : "Create event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
