# Deadline Demon marketing app

A separate React + Vite landing page with one focused screen: an editorial layout, a self-reported progress dial, deadline alerts and a direct Messages link. It shares no runtime, database, API keys or settings with the iMessage agent.

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

- `src/App.jsx`: headline, links and illustrative conversation.
- `src/styles.css`: colors, typography, responsive layouts and motion.
- `src/site.config.js`: product name, real CTA destinations and optional hero image.
- `public/images/`: your future graphics. Set `heroImage` to their public URL path and `heroImageAlt` to its description to replace the central message illustration without changing the layout. A transparent image works best.
- `public/favicon.svg`: the temporary original brand mark; replace it when final branding is ready.

The progress example is illustrative. The main link opens a message to the service number; the site never sends text automatically, calls OpenAI/GitHub APIs, changes tasks or records visitor data. Copy number is available when Messages is unavailable. The TASKS command displays the sender's board. Desktop uses one composition; small screens scroll without clipping.

The `.openai/hosting.json` manifest belongs to this marketing site only. Hosting credentials are not stored in the source tree.
