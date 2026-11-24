# STI Creative Events (interface only)

The interface for the event page and registration form, built from the mock design in `design/`.

- Stack: Next.js (App Router), TypeScript, Tailwind CSS.
- One page: event details and the registration form (two columns on desktop, one column on mobile).
- Colors, type, spacing, radius and field states come from `design/design-spec.md`, set up as tokens in `tailwind.config.ts`.
- No backend yet. The Register button saves nothing and says so.

## Run it
```
npm install
npm run dev
```
Open http://localhost:3000.
