import { build } from 'esbuild';
import sharp from 'sharp';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifests = [
  ['telco-churn-mlops-databricks', 'databricks'],
  ['smart-parking-albacete', 'smart-parking'],
  ['big-data-catalog-batch-streaming', 'spark'],
];

for (const [slug, assetFolder] of manifests) {
  const path = resolve(root, 'src/data/manifests', `${slug}.json`);
  const manifest = JSON.parse(await readFile(path, 'utf8'));
  const required = ['problem', 'architecture', 'dataFlow', 'team', 'ownership', 'verifiedMetrics', 'evidence', 'limitations', 'links'];
  if (manifest.schema_version !== 2 || manifest.slug !== slug) throw new Error(`Invalid manifest ${slug}`);
  for (const key of required) {
    if (!manifest[key] || manifest[key].length === 0) throw new Error(`Missing ${key} in ${slug}`);
  }
  for (const evidence of manifest.evidence) {
    const filename = evidence.path.split('/').at(-1);
    await access(resolve(root, 'public/img/projects', assetFolder, filename));
  }
  const types = new Set(manifest.links.map((link) => link.type));
  if (!types.has('github') || !types.has('case_study')) throw new Error(`Missing canonical links in ${slug}`);
}

// Every project needs a cover with bilingual alt text; raster covers need their AVIF/WebP derivatives
// and diagram covers keep their SVG source next to the PNG fallback.
const bundle = await build({
  entryPoints: [resolve(root, 'src/data/projects.ts')],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  logLevel: 'silent',
});
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const diagramCovers = new Set(['big-data-catalog-batch-streaming', 'honeypot-aws-terraform']);
const publicPath = (path) => resolve(root, 'public', path.replace(/^\//, ''));

if (projects.length !== 7) throw new Error(`Expected 7 projects, found ${projects.length}`);
for (const project of projects) {
  const { slug, heroImage, heroAlt } = project;
  if (!heroImage?.startsWith('/img/projects/')) throw new Error(`Missing heroImage in ${slug}`);
  for (const lang of ['es', 'en']) {
    if (!heroAlt?.[lang] || heroAlt[lang].trim().length < 30) throw new Error(`Missing descriptive heroAlt.${lang} in ${slug}`);
  }
  if (heroAlt.es === heroAlt.en) throw new Error(`heroAlt is not translated in ${slug}`);
  if (!/\.png$/i.test(heroImage)) throw new Error(`heroImage must be a PNG fallback in ${slug}`);
  await access(publicPath(heroImage));
  for (const format of ['avif', 'webp']) await access(publicPath(heroImage.replace(/\.png$/i, `.${format}`)));
  if (diagramCovers.has(slug)) await access(publicPath(heroImage.replace(/\.png$/i, '.svg')));
  const { width, height } = await sharp(publicPath(heroImage)).metadata();
  if (Math.abs(width / height - 16 / 9) > 0.01) throw new Error(`heroImage in ${slug} is not 16:9 (${width}x${height})`);
}
console.log('Portfolio content contracts passed');

