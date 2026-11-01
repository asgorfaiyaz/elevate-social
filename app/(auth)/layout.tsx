import { HeartHandshake, MapPin } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 items-center justify-center bg-muted/35 px-4 py-10 sm:py-14">
      <div className="container mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <aside className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden rounded-3xl bg-primary p-10 text-primary-foreground lg:flex xl:p-12">
          <div>
            <div className="mb-10 flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <HeartHandshake aria-hidden="true" className="size-6" />
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground/75">
              Elevate Social · Dhaka
            </p>
            <h1 className="max-w-lg font-heading text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Show up for the place you call home.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-primary-foreground/80">
              Find neighbors who care, join local service events, or bring your
              own community idea to life.
            </p>
          </div>

          <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/70">
              A little care goes a long way
            </p>
            <p className="mt-2 font-heading text-xl font-semibold">
              Winter Clothes Distribution
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/80">
              <MapPin aria-hidden="true" className="size-4" />
              Mirpur 10, Dhaka
            </p>
          </div>
        </aside>

        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}
