# STI Creative Events (interface only)

The interface for the event page and registration form, built from the mock design in `design/`.

Stack: Next.js (App Router), TypeScript, Tailwind CSS. No backend yet: the Register button saves nothing and says so.

## Folders
Three layers that depend one way only: UI -> business -> data. `npm run lint` fails if a file imports against that direction.

| Folder | What it is for |
|---|---|
| `src/app` | Pages only, kept thin. They place features on the screen. |
| `src/ui/components` | One reusable component per design element: Button, TextField, SelectField, TextAreaField, Card, Badge. |
| `src/ui/features` | Screen parts built from those components: EventDetails, RegistrationForm, SiteFrame. |
| `src/business` | The rules and the event content: what is valid, the list of programs. |
| `src/data` | Database access. Not added yet; it comes in the next step. |
| `design` | The mock design and its spec. Colors, type, radius and shadows are tokens in `tailwind.config.ts`. |

## Run it
```
npm install
npm run dev
```
Open http://localhost:3000. Check with `npm run lint` and `npm run typecheck`.
