# Atharva Agrawal — Portfolio

A responsive React + TypeScript portfolio focused on applied AI, backend systems, and product engineering.

## Run locally

```sh
npm install
npm run dev
```

Vite serves the site at `http://localhost:8080` by default.

```sh
npm run build
npm test
npx tsc --noEmit -p tsconfig.app.json
```

## Update content

- Professional experience, projects, and skills: `src/lib/portfolio.ts`.
- Page sections and interactive components: `src/pages/Index.tsx`.
- Design and responsive layouts: `src/portfolio.css`.
- Downloadable résumé: `public/resume.pdf`.
- Search and social metadata: `index.html`; share artwork: `public/og-image.svg` and `public/og-image.png`.

The November 2026 résumé supplies the current professional content. Project interface concepts are labeled as concepts; the Kubernetes and EEG cards use existing application screenshots.

The contact form uses the existing `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` environment variables. Failed delivery shows a direct email link. Local verification mocks delivery and does not send email.

Interactions include a keyboard-accessible system explorer, project filters and detail dialogs, expandable experience, mobile navigation, email copying, and quick navigation with Ctrl/Cmd+K. Motion respects the system's reduced-motion preference and can be paused on the system explorer.
