import { Suspense } from "react";

import { Banner } from "@/components/home/banner";
import { Features } from "@/components/home/features";
import { Gallery } from "@/components/home/gallery";
import { Newsletter } from "@/components/home/newsletter";
import {
  RecentUpcomingEvents,
  RecentUpcomingEventsFallback,
} from "@/components/home/recent-upcoming-events";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Banner />
      <Suspense fallback={<RecentUpcomingEventsFallback />}>
        <RecentUpcomingEvents />
      </Suspense>
      <Features />
      <Gallery />
      <Newsletter />
    </main>
  );
}
