# AGENTS.md

## State
- Astro 7 + Tailwind v4 scaffold (verified 2026-09-15 via `npm run build`): `src/pages/index.astro` is homepage; stubs for about/expertise/people/knowledge/join-us/contact exist so nav never 404s.
- Sanity optional: `src/lib/sanity.ts` falls back to `src/data/content.ts` mocks when `PUBLIC_SANITY_PROJECT_ID` is unset. See `.env.example`.
- Only content is `inspo/` (hand sketches + reference screenshots) plus scaffold. No test/lint/CI, no domain yet; staging first.

## Project intent — verified 2026-09-15
- Firm: SBA LEGAL CONSULT, est. 2025, Kumasi, Ghana — 2nd Floor, JP Station Building, Off J.K. Acheampong Ave, Ahinsan Estate. Phones: 0543557244; 0322291474. Email TBC.
- Positioning: "A full-service law firm serving individuals and businesses across Ghana." Values: Integrity, excellence, client-first. Goal: credibility first, then leads + recruitment.
- Reference model is https://bentsienchill.com/; hand sketches (`inspo/page1.jpeg`, `page2.jpeg`) win on structure over screenshots.
- Planned IA: Home, About Us, Expertise, People, Knowledge, Join Us, Contact + Practice-detail and Bio-detail templates.
- Practice areas (8, descriptions TBC): Corporate and Commercial Law; Oil and Gas; Mining; Insolvency and Restructuring; Foreign Direct Investment; Property Law; Medical Law; Immigration and Nationality.
- Homepage blocks: full-bleed slideshow with one static heading; About teaser; Practice Areas image cards (featured 4: Corporate-Commercial, Oil-Gas, Property, Immigration); Knowledge Centre (Insights + News); People grid (placeholders for now).
- Conversions: Calendly embed + WhatsApp chat button + contact form + Google Map. Socials (URLs TBC): LinkedIn, Facebook, X.

## Commands (verified)
- `npm run dev` — local dev server; `npm run build` — static build to `dist/`; `npm run preview` — serve built site. No tests/lint configured.

## Rules for agents
- Read `inspo/page1.jpeg` + `page2.jpeg` before scaffolding or changing IA; use screenshots only as style reference, sketches win on structure.
- Do not invent commands: verify via manifest/config once a stack is chosen, then document exact `dev / build / test / lint` commands here.
- Keep binaries out: `inspo/*.jpeg|png` are already large (~7MB total); do not commit new images/binaries without optimizing.
- When a stack is chosen, update this file with: entrypoints, package boundaries, and single-test/focused-check commands.
