# Figma design spec for STI Creative Events

No Figma file exists yet. Slide 12 shows an illustration of the design, and the demo app follows this spec. Build the real file from it (about 20 to 30 minutes) so that slide 12 can be shown live in Figma, or export a frame and paste it over the illustration.

## Styles
| Token | Value |
|---|---|
| Forest | `#264E43` (header, headings, primary button) |
| Sage | `#9DBFAF` |
| Cream | `#F7F4EC` (page background) |
| Charcoal | `#263238` (text) |
| Mist | `#E8ECE9` (agenda rows) |
| Gold | `#D9B76E` (badge, highlights) |
| Error | `#B91C1C` |
| Heading font | Georgia Bold: 48 / 30 / 24 |
| Body font | Inter (or system sans): 20 / 16 / 14 |
| Radius | 8 inputs and buttons, 12 small cards, 16 form card |

## Frames
1. **Desktop 1280:** header bar (forest, app name left, gold "Demo app · test data only" pill right); content max width 1024; two columns with 40 gap. Left: eyebrow "STUDENT EVENT", title, tagline, When/Where cards, about text, four agenda rows. Right: white form card.
2. **Mobile 390:** same content in one column, form below the event details.
3. **Confirmation:** form card replaced by "You are in / Registration confirmed / code".
4. **Organizer sign-in** and **Organizer list** (table: name, email, program, idea, registered).

## Components and states
- Button: default, hover, disabled ("Saving...").
- Input, select, textarea: default, focus, error (red message below).
- Form: empty, validation errors, duplicate email, server error, success.
- Name every layer and component. It helps people and AI read the file.

## What the design does not say (the logic you must specify in words)
Required fields; valid email; one registration per email; where data is stored; who may see the list; what happens when the server fails.
