import Link from "next/link";

// Custom event-management SVG logo mark (calendar with a ticket/star motif)
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Calendar body */}
      <rect
        x="3"
        y="7"
        width="26"
        height="22"
        rx="3"
        className="fill-primary"
      />
      {/* Calendar top bar */}
      <rect x="3" y="7" width="26" height="8" rx="3" className="fill-primary" />
      {/* Calendar header (darker) */}
      <rect
        x="3"
        y="7"
        width="26"
        height="8"
        rx="2"
        className="fill-primary/80"
      />
      {/* Hanger pegs */}
      <rect
        x="10"
        y="3"
        width="3"
        height="7"
        rx="1.5"
        className="fill-primary/60"
      />
      <rect
        x="19"
        y="3"
        width="3"
        height="7"
        rx="1.5"
        className="fill-primary/60"
      />
      {/* Star / ticket shape in the calendar body */}
      <path
        d="M16 13.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L16 21.27l-3.09 1.624.59-3.44-2.5-2.437 3.455-.502L16 13.5z"
        className="fill-primary-foreground"
      />
    </svg>
  );
}

export function NavLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight"
    >
      <LogoMark className="size-7" />
      <span>SocialEvent</span>
    </Link>
  );
}
