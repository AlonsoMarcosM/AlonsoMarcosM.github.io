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
  { name: 'projects-es', path: '/es/projects/', covers: 7 },
  { name: 'projects-en', path: '/en/projects/', covers: 7 },
  { name: 'tfm-es', path: '/es/projects/tfm-openmetadata-dcat-ap-es/' },
  { name: 'governance-es', path: '/es/projects/gobierno-calidad-dato-openmetadata/' },
  { name: 'honeypot-en', path: '/en/projects/honeypot-aws-terraform/' },
  { name: 'tfg-en', path: '/en/projects/tfg-remote-r-scripts/' },
  { name: 'legacy-databricks', path: '/Trabajo-DESARROLLO-Y-DESPLIEGUE-DE-SOLUCIONES-BIG-DATA/', redirected: 'telco-churn-mlops-databricks' },
  { name: 'legacy-spark', path: '/Proyecto_Big_Data_PMD_ASBD/', redirected: 'big-data-catalog-batch-streaming' },
];

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 1000 },
];

const themes = ['dark', 'light'];

const browser = await chromium.launch();
const failures = [];
const checkedLinks = new Map();
let scenarios = 0;

for (const viewport of viewports) {
  for (const theme of themes) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    reducedMotion: 'reduce',
  });
  await context.addInitScript((value) => localStorage.setItem('theme', value), theme);

  for (const route of pages) {
    if (route.redirected && theme !== 'dark') continue;
    scenarios += 1;
    const label = `${route.name}/${viewport.name}/${theme}`;
    const page = await context.newPage();
    const issues = [];
    page.on('console', (message) => {
      if (message.type() === 'error') issues.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => issues.push(`pageerror: ${error.message}`));
    page.on('requestfailed', (request) => {
      if (request.url().startsWith(base)) issues.push(`requestfailed: ${request.url()}`);
    });
    page.on('response', (response) => {
      if (response.url().startsWith(base) && response.status() >= 400) issues.push(`HTTP ${response.status()}: ${response.url()}`);
    });

    const response = await page.goto(base + route.path, { waitUntil: 'networkidle', timeout: 45_000 });
    if (!response || response.status() >= 400) issues.push(`HTTP status ${response?.status() ?? 'none'}`);

    if (route.redirected) {
      if (!page.url().includes(route.redirected)) issues.push(`legacy redirect did not reach ${route.redirected}`);
    } else {
      await page.evaluate(() => document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible')));
      const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
      if (isDark !== (theme === 'dark')) issues.push(`theme ${theme} was not applied`);

      // Load lazy images so broken covers surface, then require every image to decode with alt text.
      await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((image) => { image.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.images].every((image) => image.complete), null, { timeout: 20_000 });
      const images = await page.locator('img').evaluateAll((nodes) =>
        nodes.map((image) => ({ src: image.currentSrc || image.src, alt: image.getAttribute('alt'), width: image.naturalWidth })),
      );
      for (const image of images) {
        if (image.width === 0) issues.push(`image did not decode: ${image.src}`);
        if (image.alt === null) issues.push(`image without alt: ${image.src}`);
      }
      const coverImages = await page.locator('img[data-project-cover]').evaluateAll((nodes) =>
        nodes.map((image) => ({ alt: image.getAttribute('alt') ?? '', ratio: image.clientWidth / Math.max(image.clientHeight, 1) })),
      );
      if (route.covers && coverImages.length !== route.covers) issues.push(`expected ${route.covers} project covers, found ${coverImages.length}`);
      if (!route.covers && route.path.includes('/projects/') && coverImages.length !== 1) issues.push(`expected one detail cover, found ${coverImages.length}`);
      for (const cover of coverImages) {
        if (cover.alt.trim().length < 30) issues.push(`cover alt text is not descriptive: "${cover.alt}"`);
        if (Math.abs(cover.ratio - 16 / 9) > 0.03) issues.push(`cover is not rendered at 16:9 (${cover.ratio.toFixed(2)})`);
      }
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
        if (!checkedLinks.has(href)) checkedLinks.set(href, (await page.request.get(base + href)).status());
        const status = checkedLinks.get(href);
        if (status >= 400) issues.push(`broken internal link ${href}: ${status}`);
      }

      await page.screenshot({
        path: `${shotDir}/${route.name}-${viewport.name}-${theme}.png`,
        fullPage: true,
      });
    }

    if (issues.length) failures.push(...issues.map((issue) => `${label}: ${issue}`));
    await page.close();
  }
  await context.close();
  }
}

await browser.close();
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Visual, responsive and accessibility checks passed for ${scenarios} scenarios`);
}
