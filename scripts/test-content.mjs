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
console.log('Portfolio content contracts passed');

