"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden md:flex items-center gap-6 text-sm">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "transition-colors",
                isActive
                  ? "text-primary dark:text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
