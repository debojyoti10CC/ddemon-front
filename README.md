# Deadline Demon marketing app

A separate React + Vite landing page. It shares no runtime, database, API keys or settings with the iMessage agent. The layout uses original typography, colors and interactive message examples; Dibs was a visual reference, not a copied template.

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

## Change the content and graphics

- `src/App.jsx`: copy, sections, FAQ and illustrative message sequences.
- `src/styles.css`: colors, typography, responsive layouts and motion.
- `src/site.config.js`: product name, real CTA destinations and optional hero image.
- `public/images/`: your future graphics. Set `heroImage` to their public URL path and `heroImageAlt` to its description to add an image band below the hero. The interactive conversation stays in place.
- `public/favicon.svg`: the temporary original brand mark; replace it when final branding is ready.

The message demo runs locally in the browser. It never sends an iMessage, calls OpenAI/GitHub, deletes real tasks, or records visitor data. Get started links to the agent's real setup instructions. There is no fake signup form, waitlist success, or public-onboarding claim. Connect a real onboarding flow before changing the CTA to promise public access.

The `.openai/hosting.json` manifest belongs to this marketing site only. Hosting credentials are not stored in the source tree.
