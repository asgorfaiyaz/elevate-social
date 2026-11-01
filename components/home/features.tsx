import {
  Bell,
  CalendarPlus,
  ClipboardCheck,
  HeartHandshake,
  MapPin,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: CalendarPlus,
    title: "Create a community event",
    description:
      "Set a purpose, choose a neighborhood, and bring your service idea to life.",
  },
  {
    icon: MapPin,
    title: "Find help close to home",
    description:
      "Discover local drives, from winter clothes distribution in Mirpur to food support in Dhanmondi.",
  },
  {
    icon: HeartHandshake,
    title: "Join a cause that matters",
    description:
      "Meet neighbors who care about the same things and make time together count.",
  },
  {
    icon: Users,
    title: "Bring volunteers together",
    description:
      "Share event details and help more people take part in meaningful local work.",
  },
  {
    icon: ClipboardCheck,
    title: "Keep every event organized",
    description:
      "Keep track of the events you create and the ones you plan to attend.",
  },
  {
    icon: Bell,
    title: "Stay in the loop",
    description:
      "Keep important event information handy as plans and participation take shape.",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            From idea to impact
          </p>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Make it easier to show up for your community
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Everything you need to find, join, and organize social service
            events in your neighborhood.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="h-full border-border/70 shadow-sm">
                <CardHeader className="gap-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
