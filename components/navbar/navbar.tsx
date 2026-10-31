import { ThemeToggle } from "../theme/theme-toggle";
import { MobileMenu } from "./mobile-menu";
import { NavLogo } from "./nav-logo";
import { AuthButton } from "./auth-button";
import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 dark:bg-slate-950 backdrop-blur-md">
      <nav className="relative container mx-auto flex h-16 items-center justify-between px-4">
        <NavLogo />
        <NavLinks />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AuthButton className="hidden md:inline-flex" />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
