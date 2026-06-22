// Genera public/img/og-default.png (1200x630) para previsualización en redes.
// Se ejecuta a mano: `node scripts/generate-og.mjs`.
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const photoB64 = readFileSync(resolve(root, 'public/img/alonso.jpg')).toString('base64');

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#0e7490"/>
    </linearGradient>
    <clipPath id="circle"><circle cx="980" cy="315" r="150"/></clipPath>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#1e293b" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#020617"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.5"/>
  <rect x="0" y="0" width="14" height="${H}" fill="#06b6d4"/>

  <text x="90" y="250" font-family="DejaVu Sans, Arial, sans-serif" font-size="34" fill="#22d3ee" font-weight="700">DATA ENGINEER</text>
  <text x="90" y="330" font-family="DejaVu Sans, Arial, sans-serif" font-size="68" fill="#f8fafc" font-weight="700">Alonso Marcos</text>
  <text x="90" y="402" font-family="DejaVu Sans, Arial, sans-serif" font-size="68" fill="#f8fafc" font-weight="700">Muñoz</text>
  <text x="92" y="470" font-family="DejaVu Sans, Arial, sans-serif" font-size="28" fill="#94a3b8">Data Governance · Interoperability · Cloud</text>

  <circle cx="980" cy="315" r="158" fill="none" stroke="url(#ring)" stroke-width="8"/>
  <image x="830" y="165" width="300" height="300" clip-path="url(#circle)"
    href="data:image/jpeg;base64,${photoB64}" preserveAspectRatio="xMidYMin slice"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(resolve(root, 'public/img/og-default.png'));
console.log('og-default.png generated');
