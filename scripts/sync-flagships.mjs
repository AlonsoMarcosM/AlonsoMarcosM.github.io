import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, 'src/data/manifests');
const check = process.argv.includes('--check');
await mkdir(destination, { recursive: true });

const sources = [
  { slug: 'telco-churn-mlops-databricks', url: 'https://api.github.com/repos/AlonsoMarcosM/databricks-telco-churn-lakehouse/contents/portfolio.json?ref=main' },
  { slug: 'smart-parking-albacete', url: 'https://api.github.com/repos/AlonsoMarcosM/smart-parking-albacete/contents/portfolio.json?ref=main' },
  { slug: 'big-data-catalog-batch-streaming', url: 'https://api.github.com/repos/AlonsoMarcosM/spark-kafka-airflow-data-platform/contents/portfolio.json?ref=main' },
];

let stale = false;
for (const source of sources) {
  const url = `${source.url}&cacheBust=${Date.now()}`;
  const headers = {
    accept: 'application/vnd.github.raw+json',
    'user-agent': 'portfolio-manifest-sync',
    'cache-control': 'no-cache',
  };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(url, {
    cache: 'no-store',
    headers,
  });
  if (!response.ok) throw new Error(`Cannot fetch ${source.url}: ${response.status}`);
  const remote = JSON.parse(await response.text());
  if (remote.schema_version !== 2 || remote.slug !== source.slug) throw new Error(`Invalid v2 manifest for ${source.slug}`);
  const formatted = JSON.stringify(remote, null, 2) + '\n';
  const path = resolve(destination, `${source.slug}.json`);
  if (check) {
    const local = await readFile(path, 'utf8');
    if (local !== formatted) {
      stale = true;
      console.error(`Stale flagship manifest: ${source.slug}`);
    }
  } else {
    await writeFile(path, formatted, 'utf8');
    console.log(`Synced ${source.slug}`);
  }
}
if (stale) process.exitCode = 1;
