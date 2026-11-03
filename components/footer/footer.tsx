import Link from "next/link";
import { ArrowRight, HeartHandshake, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

const footerLinkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-heading text-xl font-bold text-foreground"
            >
              <HeartHandshake aria-hidden="true" className="size-6 text-primary" />
              Elevate Social
            </Link>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              A community-driven place to create, join, and follow social
              service events happening around you.
            </p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              Built for neighbors across Dhaka
            </p>
            <div className="flex items-center gap-2 pt-2" aria-label="Social links">
              <a
                href="https://www.facebook.com/asgorfaiyaz"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaFacebookF aria-hidden="true" className="size-4" />
              </a>
              <a
                href="https://x.com/asgorfaiyaz"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaXTwitter aria-hidden="true" className="size-4" />
              </a>
              <a
                href="https://www.youtube.com/@asgorfaiyaz"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaYoutube aria-hidden="true" className="size-4" />
              </a>
              <a
                href="https://github.com/asgorfaiyaz"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaGithub aria-hidden="true" className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/asgorfaiyaz"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FaLinkedinIn aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Explore">
            <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
              Explore
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/" className={footerLinkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events" className={footerLinkClass}>
                  Explore events
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className={footerLinkClass}>
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Get involved">
            <h2 className="mb-4 font-heading text-base font-semibold text-foreground">
              Get involved
            </h2>
            <ul className="space-y-3">
              <li>
                <Link href="/sign-up" className={footerLinkClass}>
                  Host a community drive
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className={`${footerLinkClass} inline-flex items-center gap-1.5`}
                >
                  Find a way to help
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Elevate Social</p>
          <p>Neighbors make stronger communities.</p>
        </div>
      </div>
    </footer>
  );
}
