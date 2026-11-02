"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EventFiltersProps = {
  eventTypes: readonly string[];
  initialEventType: string;
  initialTitle: string;
};

export function EventFilters({
  eventTypes,
  initialEventType,
  initialTitle,
}: EventFiltersProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [eventType, setEventType] = useState(initialEventType);
  const [title, setTitle] = useState(initialTitle);

  function updateFilters(nextEventType: string, nextTitle: string) {
    const params = new URLSearchParams();
    if (nextEventType) params.set("eventType", nextEventType);
    if (nextTitle.trim()) params.set("title", nextTitle);

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex min-w-56 flex-col gap-2">
        <Label htmlFor="event-title-filter">Search by title</Label>
        <Input
          id="event-title-filter"
          name="title"
          type="search"
          value={title}
          onChange={(event) => {
            const nextTitle = event.currentTarget.value;
            setTitle(nextTitle);
            updateFilters(eventType, nextTitle);
          }}
          placeholder="Search community events"
          className="h-10"
        />
      </div>
      <div className="flex min-w-56 flex-col gap-2">
        <Label htmlFor="event-type-filter">Filter by event type</Label>
        <Select
          value={eventType || "all"}
          onValueChange={(value) => {
            const nextEventType =
              value === "all" || value === null ? "" : value;
            setEventType(nextEventType);
            updateFilters(nextEventType, title);
          }}
        >
          <SelectTrigger id="event-type-filter" className="h-10 w-full">
            <SelectValue placeholder="All event types" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">All event types</SelectItem>
            {eventTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
