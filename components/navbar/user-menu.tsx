"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarPlus, LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

const links = [
  { label: "Profile", href: "/my-profile", icon: User },
  { label: "Create event", href: "/events/create", icon: CalendarPlus },
];

export function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="size-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!session?.user) return null;

  const { user } = session;

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out", {
            description: "You've been signed out successfully.",
          });
          router.push("/sign-in");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error("Sign out failed", {
            description: ctx.error.message ?? "Please try again.",
          });
        },
      },
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer rounded-full outline-none ring-ring ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-label="Open user menu"
      >
        <Avatar size="default">
          <AvatarImage
            src={user.image ?? undefined}
            alt={user.name ?? "User"}
          />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        {/* User identity header — plain div avoids the GroupLabel/MenuGroupContext requirement */}
        <div className="flex flex-col gap-0.5 px-2 py-1.5">
          <span className="text-sm font-medium text-foreground leading-tight truncate">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground leading-tight truncate">
            {user.email}
          </span>
        </div>

        <DropdownMenuSeparator />

        {links.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem key={href} render={<Link href={href} />}>
            <Icon />
            {label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
