// The event content, taken from the design. Later this can come from the data layer.
export const EVENT = {
  title: "Design Meets Code Night",
  tagline: "Bring a Figma file. Leave with a working app.",
  dateLabel: "Friday, December 12, 2026 · 2:00 PM",
  venue: "Room 301, sample venue",
  about:
    "A hands-on evening for multimedia arts students. Meet working builders, see a design become a real application, and plan your own first build.",
  agenda: [
    { time: "2:00", item: "Welcome and lightning demos" },
    { time: "2:30", item: "Live build: Figma to working app" },
    { time: "3:15", item: "Hands-on clinic with mentors" },
    { time: "4:00", item: "Show and tell" },
  ],
} as const;
