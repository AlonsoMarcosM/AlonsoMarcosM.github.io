# Portfolio — Alonso Marcos Muñoz

> **Despliegue público:** [Abrir portfolio](https://alonsomarcosm.github.io)

Personal portfolio of Alonso Marcos Muñoz, Data Engineer focused on data
governance, interoperability and metadata pipelines.

🌐 **https://alonsomarcosm.github.io**

Bilingual (ES/EN with browser-language auto-detection), built with
[Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com),
deployed automatically to GitHub Pages via GitHub Actions.

## Tech

- Astro 5 (static output, native i18n routing `/es` · `/en`)
- Tailwind CSS 4 (`@tailwindcss/vite`)
- TypeScript content model in `src/data` (bilingual)
- Light/dark theme, SEO (hreflang, JSON-LD, sitemap, OpenGraph)

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site -> ./dist
npm run preview    # serve the build locally
```

## Content

All content lives as typed, bilingual data in `src/data/`:

| File | Section |
| --- | --- |
| `site.ts` | profile, role, contact, social links |
| `experience.ts` | work experience |
| `projects.ts` | project case studies |
| `skills.ts` | tech stack |
| `education.ts` | education & certifications |

UI strings are in `src/i18n/ui.ts`.

## Assets

- `scripts/generate-og.mjs` — regenerates the social preview card
  (`public/img/og-default.png`). Run with `node scripts/generate-og.mjs`.
- CVs in `public/cv/`, photo in `public/img/alonso.jpg`.

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `./dist` to GitHub Pages. No manual steps required.
