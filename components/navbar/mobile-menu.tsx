"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { AuthButton } from "./auth-button";
import { navLinks } from "./nav-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const visibleLinks = navLinks.filter(
    (link) => link.label !== "Host a Drive" || (!isPending && !session?.user),
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </Button>

      {/* Mobile dropdown */}
      {open && (
        <div
          className={cn(
            "absolute left-0 top-full w-full",
            "border-b border-border/40 bg-background/95 backdrop-blur-md",
            "flex flex-col gap-1 px-4 py-4 md:hidden",
          )}
        >
          {visibleLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-2 border-t border-border/40 pt-3">
            <AuthButton className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
