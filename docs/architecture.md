# Application Architecture

Elevate Social is a community event platform for discovering, joining, and organizing local social service events. The current implementation provides the public landing page and account authentication; event listings and event management are not yet implemented as application routes.

## Application Structure

- `app/` uses the Next.js App Router. `app/page.tsx` composes the home page; `app/(auth)/` contains sign-in and sign-up pages with a shared layout.
- `lib/` contains authentication setup, the browser auth client, shared utilities, and Zod form schemas.
- `public/` stores static assets. `docs/` contains repository documentation.

## Auth

Authentication uses Better Auth with MongoDB and Google OAuth. The browser client sends authentication requests to the API route, while `proxy.ts` redirects authenticated visitors away from sign-up.

## Configuration and Commands

Authentication expects `MONGODB_URI`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, and `GOOGLE_CLIENT_SECRET` in the environment. Do not commit populated environment files or credentials.

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint.
- `npm run build` creates a production build.
- `npm start` serves the production build.
