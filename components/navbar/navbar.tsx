import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "../theme/theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { NavLogo } from "./nav-logo";
import { cn } from "@/lib/utils";

const navLinks = [{ label: "Upcoming Events", href: "/events" }];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <nav className="relative container mx-auto flex h-16 items-center justify-between px-4">
        <NavLogo />

        <ul className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/sign-in"
            className={cn(buttonVariants(), "hidden md:inline-flex")}
          >
            Login
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
