"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      // accessibility improve korlam
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      suppressHydrationWarning
    >
      <Sun className="size-4 dark:hidden" suppressHydrationWarning />
      <Moon className="size-4 hidden dark:block" suppressHydrationWarning />
    </Button>
  );
}
