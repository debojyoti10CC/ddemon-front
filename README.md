# Deadline Demon

A minimal React + Vite landing page: a landscape inside an ochre frame, an Einstein quote, and a direct iMessage link. The portrait links to [Debojyoti on X](https://x.com/debojyotidm).

## Run

```powershell
npm ci
npm run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:5174).

```powershell
npm run build
npm run preview
```

The production output is `dist/`. Node 22.12 or newer is required.

## Deploy to Vercel

Import this repository into Vercel. `vercel.json` configures the Vite framework, `npm ci` installation, `npm run build`, and the `dist` output directory. No environment variables are required.

## Content and design

- `src/App.jsx`: quote, attribution, portrait link, and Messages CTA.
- `src/styles.css`: frame, responsive layout, and opening animation.
- `src/site.config.js`: phone number, X profile, and image paths.
- `public/images/`: landscape and portrait assets.
- `DESIGN.md`: typography reference. Local Inter and JetBrains Mono fonts use its recommended substitutes.

The opening effect gently resolves the landscape from blur and reveals the text. It respects reduced-motion preferences. The CTA opens Messages; this frontend sends no messages or API requests itself. The iMessage bot is a separate application.
