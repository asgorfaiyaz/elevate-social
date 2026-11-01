import { CalendarPlus, Users, Ticket, Bell, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: CalendarPlus,
    title: "Create & Manage Events",
    description:
      "Easily create social events, set details, and manage attendees all in one place.",
  },
  {
    icon: Ticket,
    title: "Easy Registration",
    description:
      "Let people RSVP to your events with simple sign-up and instant confirmation.",
  },
  {
    icon: Users,
    title: "Connect With Others",
    description:
      "Bring people together and build connections through shared experiences.",
  },
  {
    icon: MapPin,
    title: "Find Local Events",
    description:
      "Discover social events happening near you and never miss out on fun activities.",
  },
  {
    icon: Bell,
    title: "Event Reminders",
    description:
      "Get timely reminders so attendees stay updated about upcoming events.",
  },
  {
    icon: Clock,
    title: "Stay Organized",
    description:
      "Track upcoming, ongoing, and past events with a clean, simple dashboard.",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-28">

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything for Social Events
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple tools to plan, share, and enjoy social events together
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
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
