import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function Newsletter() {
  return (
    <section className="py-20 md:py-10">
      <div className="container mx-auto px-4">
        <Card className="border-border/50 bg-linear-to-br from-primary/5 to-background">
          <CardContent className="p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Stay Connected
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to our newsletter for updates on upcoming social
                events, community drives, and volunteer opportunities.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  disabled
                />
                <Button type="button" className="gap-2" disabled>
                  Subscribe
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
