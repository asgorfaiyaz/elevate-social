"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function DeleteEventButton({
  apiEndpoint,
  eventTitle,
  className,
}: {
  apiEndpoint?: string;
  eventTitle: string;
  className?: string;
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteEvent() {
    if (!window.confirm(`Delete “${eventTitle}”? This cannot be undone.`)) {
      return;
    }

    if (!apiEndpoint) {
      toast.error("Event API is not configured", {
        description: "Set SERVER_URI in your environment and try again.",
      });
      return;
    }

    setIsDeleting(true);

    try {
      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("Sign in to delete this event", {
          description: "Your account is required to manage an event.",
        });
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!response.ok) {
        const { message } = await response.json();

        toast.error("Could not delete event", {
          description:
            message || `Request failed (${response.status}). Please try again.`,
        });
        return;
      }

      toast.success("Event deleted");
      router.refresh();
    } catch {
      toast.error("Could not delete event", {
        description: "Something went wrong.",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Button
      type="button"
      variant="destructive"
      className={className}
      disabled={isDeleting}
      onClick={deleteEvent}
    >
      {isDeleting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
