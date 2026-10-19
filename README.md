# Deadline Demon marketing app

A separate React + Vite landing page with one focused screen: a message illustration, headline and setup link. It shares no runtime, database, API keys or settings with the iMessage agent. Dibs informed the restraint and composition; the design and content are original.

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

The static conversation is an illustrative example. The page never sends an iMessage, calls OpenAI/GitHub APIs, changes real tasks or records visitor data. Get started links to the agent's setup instructions. The small note beneath it makes the self-hosted setup explicit. Desktop fits one viewport at common screen sizes; small screens can scroll naturally without clipping content.

The `.openai/hosting.json` manifest belongs to this marketing site only. Hosting credentials are not stored in the source tree.
