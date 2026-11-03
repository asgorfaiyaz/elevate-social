"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type JoinEventButtonProps = {
  apiEndpoint?: string;
};

export function JoinEventButton({ apiEndpoint }: JoinEventButtonProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  async function joinEvent() {
    if (!apiEndpoint) {
      toast.error("Event API is not configured", {
        description: "Set SERVER_URI in your environment and try again.",
      });
      return;
    }

    setIsJoining(true);

    try {
      const { data, error } = await authClient.token();
      if (error || !data?.token) {
        toast.error("Sign in to join this event", {
          description: "Your account is required to join a community event.",
        });
        return;
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (!response.ok) {
        const { message } = await response.json();

        toast.error("Could not join event", {
          description:
            message || `Request failed (${response.status}). Please try again.`,
        });
        return;
      }

      setHasJoined(true);
      toast.success("You joined this event", {
        description: "Thanks for supporting your local community.",
      });
    } catch {
      toast.error("Could not join event", {
        description: "Something went wrong.",
      });
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <Button
      type="button"
      className="h-10 w-full sm:w-auto"
      disabled={isJoining || hasJoined}
      onClick={joinEvent}
    >
      {isJoining && (
        <Loader2 aria-hidden="true" className="size-4 animate-spin" />
      )}
      {isJoining ? "Joining..." : hasJoined ? "Joined" : "Join Event"}
    </Button>
  );
}
