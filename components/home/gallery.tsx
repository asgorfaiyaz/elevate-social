import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    alt: "Tree planting initiative",
    title: "Go Green Drive",
    description: "Reforesting our local parks",
    count: "150+ Volunteers",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
    alt: "Food donation drive",
    title: "Food For All",
    description: "Feeding families in need",
    count: "300+ Families Served",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
    alt: "Beach clean-up",
    title: "Clean Coast",
    description: "Protecting our oceans",
    count: "80+ Cleanups",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
    alt: "Community celebration",
    title: "Unity Fest",
    description: "Bringing cultures together",
    count: "500+ Attendees",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    alt: "Care package assembly",
    title: "Care Kits",
    description: "Helping those in need",
    count: "1000+ Kits Distributed",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    alt: "Networking event",
    title: "Youth Connect",
    description: "Empowering young leaders",
    count: "200+ Youth Engaged",
  },
];

export function Gallery() {
  return (
    <section className="py-20 md:py-10 bg-linear-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Community Impact
          </h2>
          <p className="text-lg text-muted-foreground">
            Real stories from the events that brought our community together
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{image.count}</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="font-heading text-lg font-semibold mb-1">
                  {image.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {image.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
