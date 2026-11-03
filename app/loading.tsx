import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <p role="status" className="flex items-center gap-3 text-muted-foreground">
        <LoaderCircle aria-hidden="true" className="size-5 animate-spin" />
        Loading community events...
      </p>
    </main>
  );
}
