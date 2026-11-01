import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const communityEvents = [
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=900&fit=crop",
    alt: "Volunteers sorting warm clothes for a winter donation drive",
    title: "Winter Clothes Distribution",
    location: "Mirpur 10, Dhaka",
    category: "Winter support",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&h=1100&fit=crop",
    alt: "Community members gathered to support neighbors in need",
    title: "Blanket Distribution for the Needy",
    location: "Mohammadpur, Dhaka",
    category: "Community care",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&h=1100&fit=crop",
    alt: "Volunteers working together to prepare food donations",
    title: "Meals Shared, Neighbors Connected",
    location: "Dhanmondi, Dhaka",
    category: "Food support",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop",
    alt: "Local volunteers cleaning a neighborhood green space",
    title: "A Cleaner Neighborhood Together",
    location: "Hatirjheel, Dhaka",
    category: "Neighborhood cleanup",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&h=1100&fit=crop",
    alt: "Volunteers helping children with learning activities",
    title: "Learning Kits for Young Students",
    location: "Uttara, Dhaka",
    category: "Education support",
  },
  {
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=900&fit=crop",
    alt: "Volunteers planting trees in a local green space",
    title: "Greener Streets, Stronger Community",
    location: "Bashundhara, Dhaka",
    category: "Tree planting",
  },
];

export function Gallery() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Neighbors making a difference
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Good things happen close to home
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-right">
            From warm clothes in Mirpur to community care in Mohammadpur, every
            local event starts with people showing up for one another.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {communityEvents.map((event, index) => (
            <Card
              key={event.title}
              className={`group relative isolate min-h-85 overflow-hidden border-0 bg-muted p-0 shadow-sm ${
                index === 0 || index === 3 ? "sm:col-span-2" : ""
              }`}
            >
              <Image
                src={event.src}
                alt={event.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <div className="flex h-full min-h-85 flex-col justify-between p-5 sm:p-6">
                <span className="w-fit rounded-full border border-white/25 bg-black/25 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {event.category}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-white/85">
                    <MapPin aria-hidden="true" className="size-4 shrink-0" />
                    {event.location}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
