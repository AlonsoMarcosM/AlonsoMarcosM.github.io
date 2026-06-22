// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Sitio servido en la raíz de GitHub Pages (repo de tipo user-page).
export default defineConfig({
  site: 'https://alonsomarcosm.github.io',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      // Ambos idiomas con prefijo (/es y /en); la raíz "/" la sirve un
      // index propio que redirige según el idioma del navegador.
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-ES', en: 'en-US' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
