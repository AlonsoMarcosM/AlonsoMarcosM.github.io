// Pruebas reproducibles del portfolio con Chromium headless.
// Requiere el server de preview en http://localhost:4321 (`npm run preview`).
// Uso: node scripts/visual-test.mjs [baseURL] [shotDir]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] || 'http://localhost:4321';
const shotDir = process.argv[3] || './_pwshots';
mkdirSync(shotDir, { recursive: true });

const slugs = [
  'tfm-openmetadata-dcat-ap-es',
  'smart-parking-albacete',
  'telco-churn-mlops-databricks',
  'big-data-catalog-batch-streaming',
  'gobierno-calidad-dato-openmetadata',
  'honeypot-aws-terraform',
  'tfg-remote-r-scripts',
];

const pages = [
  { name: 'home-es', path: '/es/' },
  { name: 'home-en', path: '/en/' },
  { name: 'projects-es', path: '/es/projects/' },
  ...slugs.map((s) => ({ name: `project-${s}`, path: `/es/projects/${s}/` })),
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let totalIssues = 0;

for (const p of pages) {
  const page = await ctx.newPage();
  const issues = [];
  page.on('console', (m) => {
    const ty = m.type();
    if (ty === 'error' || ty === 'warning') issues.push(`[${ty}] ${m.text()}`);
  });
  page.on('pageerror', (e) => issues.push(`[pageerror] ${e.message}`));
  page.on('requestfailed', (r) => issues.push(`[reqfail] ${r.url()} ${r.failure()?.errorText || ''}`));

  const resp = await page.goto(base + p.path, { waitUntil: 'networkidle', timeout: 30000 });
  // Scroll progresivo para disparar las animaciones de revelado (IntersectionObserver).
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.7);
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible'));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${shotDir}/${p.name}.png`, fullPage: true });

  const status = resp ? resp.status() : 'no-response';
  // Sanity: ¿hay CSS aplicado? color de fondo del body no debe ser transparente/blanco por defecto.
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  const filtered = issues.filter((i) => !i.includes('favicon'));
  totalIssues += filtered.length;
  console.log(`\n=== ${p.name} (${status}) bg=${bg} ===`);
  if (filtered.length) filtered.forEach((i) => console.log('  ' + i));
  else console.log('  OK (sin errores de consola)');
  await page.close();
}

await browser.close();
console.log(`\n==== TOTAL ISSUES: ${totalIssues} ====`);
