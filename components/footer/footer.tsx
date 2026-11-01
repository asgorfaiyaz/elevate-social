import Link from "next/link";
import { HeartHandshake, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-6 w-6 text-primary" />
              <span className="font-heading text-xl font-bold">
                Social Event
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bringing communities together through meaningful social events,
              volunteer drives, and impactful initiatives.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/upcoming-events"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-in"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  info@socialevent.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Community St, City, State 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 Social Event. All rights reserved.</p>
          <p>Made with heart for stronger communities</p>
        </div>
      </div>
    </footer>
  );
}
