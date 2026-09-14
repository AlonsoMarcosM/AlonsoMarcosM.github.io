import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/$/, '');
const shotDir = process.argv[3] || './_pwshots';
mkdirSync(shotDir, { recursive: true });

const pages = [
  { name: 'home-es', path: '/es/' },
  { name: 'home-en', path: '/en/' },
  { name: 'databricks-es', path: '/es/projects/telco-churn-mlops-databricks/' },
  { name: 'parking-es', path: '/es/projects/smart-parking-albacete/' },
  { name: 'spark-es', path: '/es/projects/big-data-catalog-batch-streaming/' },
  { name: 'legacy-databricks', path: '/Trabajo-DESARROLLO-Y-DESPLIEGUE-DE-SOLUCIONES-BIG-DATA/', redirected: 'telco-churn-mlops-databricks' },
  { name: 'legacy-spark', path: '/Proyecto_Big_Data_PMD_ASBD/', redirected: 'big-data-catalog-batch-streaming' },
];

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 1000 },
];

const browser = await chromium.launch();
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: 'reduce',
  });

  for (const route of pages) {
    const page = await context.newPage();
    const issues = [];
    page.on('console', (message) => {
      if (message.type() === 'error') issues.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => issues.push(`pageerror: ${error.message}`));
    page.on('requestfailed', (request) => {
      if (request.url().startsWith(base)) issues.push(`requestfailed: ${request.url()}`);
    });

    const response = await page.goto(base + route.path, { waitUntil: 'networkidle', timeout: 45_000 });
    if (!response || response.status() >= 400) issues.push(`HTTP status ${response?.status() ?? 'none'}`);

    if (route.redirected) {
      if (!page.url().includes(route.redirected)) issues.push(`legacy redirect did not reach ${route.redirected}`);
    } else {
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible')));
      const h1Count = await page.locator('h1').count();
      if (h1Count !== 1) issues.push(`expected one h1, found ${h1Count}`);
      if ((await page.locator('main').count()) !== 1) issues.push('missing main landmark');
      if (await page.locator('pre code.language-mermaid').count()) issues.push('unrendered Mermaid source is visible');

      await page.keyboard.press('Tab');
      const focusTag = await page.evaluate(() => document.activeElement?.tagName);
      if (!focusTag || focusTag === 'BODY') issues.push('keyboard focus did not move');

      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      for (const violation of accessibility.violations) {
        issues.push(`axe ${violation.id}: ${violation.help}`);
      }

      const internalLinks = await page.locator('a[href^="/"]').evaluateAll((anchors) =>
        [...new Set(anchors.map((anchor) => anchor.getAttribute('href')).filter(Boolean))],
      );
      for (const href of internalLinks) {
        const linkResponse = await page.request.get(base + href);
        if (linkResponse.status() >= 400) issues.push(`broken internal link ${href}: ${linkResponse.status()}`);
      }

      await page.screenshot({
        path: `${shotDir}/${route.name}-${viewport.name}.png`,
        fullPage: true,
      });
    }

    if (issues.length) failures.push(...issues.map((issue) => `${route.name}/${viewport.name}: ${issue}`));
    await page.close();
  }
  await context.close();
}

await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Visual, responsive and accessibility checks passed for ${pages.length * viewports.length} scenarios`);
}
