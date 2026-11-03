"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type JoinEventButtonProps = {
  eventId: string;
  apiEndpoint?: string;
  statusEndpoint?: string;
};

async function getToken() {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Sign in to join this event.");
  return data.token;
}

export function JoinEventButton({
  eventId,
  apiEndpoint,
  statusEndpoint,
}: JoinEventButtonProps) {
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id;
  const [isJoined, setIsJoined] = useState<boolean | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (isPending || !userId || !statusEndpoint) return;

    const endpoint = statusEndpoint;
    let cancelled = false;
    async function loadStatus() {
      try {
        const token = await getToken();
        const response = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        const result: { data?: { isJoined?: boolean } } = await response.json();
        if (!cancelled) setIsJoined(response.ok && result.data?.isJoined === true);
      } catch {
        if (!cancelled) setIsJoined(false);
      }
    }

    void loadStatus();
    return () => {
      cancelled = true;
    };
  }, [eventId, isPending, statusEndpoint, userId]);

  if (isPending) {
    return <Button disabled>Checking account...</Button>;
  }

  if (!userId) {
    return (
      <Link href="/sign-in" className={buttonVariants({ className: "h-10" })}>
        Sign in to join
      </Link>
    );
  }

  if (statusEndpoint && isJoined === null) {
    return (
      <Button disabled>
        <Loader2 aria-hidden="true" className="size-4 animate-spin" />
        Checking status...
      </Button>
    );
  }

  async function joinEvent() {
    if (!apiEndpoint) return toast.error("Event API is not configured.");

    setIsJoining(true);
    try {
      const token = await getToken();
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: { message?: string } = await response.json().catch(() => ({}));

      if (!response.ok) throw new Error(result.message || "Could not join event.");

      setIsJoined(true);
      toast.success("You joined this event.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not join event.");
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <Button disabled={isJoining || isJoined === true} onClick={joinEvent}>
      {isJoining && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
      {isJoining ? "Joining..." : isJoined ? "Joined" : "Join Event"}
    </Button>
  );
}
