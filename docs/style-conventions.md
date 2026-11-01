# Style Conventions

Use these conventions when adding or updating screens in Elevate Social.
Use shadcn/ui for components (Base-Ui)

## Visual Language

- Keep the interface calm, welcoming, and community-focused. Use one primary color and supporting neutrals; avoid one-off colors and decorative gradients.
- Use semantic Tailwind tokens from `app/globals.css`: for example, `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `border-border`, and `ring-ring`. Do not hard-code color values in components.
- The theme supports light and dark modes. Check text, controls, borders, and focus states in both modes; use foreground pairings such as `text-primary-foreground` on `bg-primary`.
- Use Fraunces through `font-heading` for headings and brand display text. Use Google Sans (`font-sans`) for body copy, labels, and controls.

## Layout and Content

- Keep copy short and useful. Use local social-service examples such as clothing distributions, food support, education drives, and neighborhood cleanups in Dhaka.
- Use Next.js `Image` for image content. Remote images must use a host allowed by `images.remotePatterns` in `next.config.ts`; provide descriptive alt text.

# watch out

- While working with buttons, you can use the buttonVariants helper to make a link look like a button. Do not use <Button render={<a />} nativeButton={false} /> for links.
- Don't use arbitary colors, go for semantic colors. colors should be consistent accross the ui, don't use too many colors or specially gradients.
