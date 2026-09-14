import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { extname, join, parse, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const inputs = [resolve(root, 'public/img/alonso.jpg')];
const sparkArchitecture = resolve(root, 'public/img/projects/spark/arquitectura-ejecutiva.svg');
const sparkArchitecturePng = resolve(root, 'public/img/projects/spark/arquitectura-ejecutiva.png');
await sharp(sparkArchitecture).resize({ width: 1200 }).png().toFile(sparkArchitecturePng);

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase())) inputs.push(path);
  }
}

await collect(resolve(root, 'public/img/projects'));

for (const input of inputs) {
  const info = parse(input);
  const width = input.endsWith('alonso.jpg') ? 480 : 1200;
  const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
  await pipeline.clone().avif({ quality: 58, effort: 5 }).toFile(join(info.dir, `${info.name}.avif`));
  await pipeline.clone().webp({ quality: 78, effort: 5 }).toFile(join(info.dir, `${info.name}.webp`));
}

console.log(`Optimized ${inputs.length} raster assets to AVIF and WebP`);
