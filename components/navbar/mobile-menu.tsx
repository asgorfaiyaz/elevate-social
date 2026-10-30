"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [{ label: "Upcoming Events", href: "/events" }];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-border/40 pt-3">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants(), "w-full")}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
