import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, '..');
const outputDir = resolve(root, 'public/img/og');
await mkdir(outputDir, { recursive: true });

const cards = [
  {
    slug: 'home',
    image: 'public/img/alonso.jpg',
    portrait: true,
    es: { eyebrow: 'DATA ENGINEER', title: 'Alonso Marcos Muñoz', subtitle: 'Python · SQL · Databricks · Spark · Airflow · AWS' },
    en: { eyebrow: 'DATA ENGINEER', title: 'Alonso Marcos Muñoz', subtitle: 'Python · SQL · Databricks · Spark · Airflow · AWS' },
  },
  {
    slug: 'telco-churn-mlops-databricks',
    image: 'public/img/projects/databricks/cover-lakehouse-monitor.png',
    es: { eyebrow: 'CASO DE ESTUDIO · DATABRICKS', title: 'Lakehouse y MLOps de churn telco', subtitle: 'Medallion · Delta Lake · MLflow · Unity Catalog' },
    en: { eyebrow: 'CASE STUDY · DATABRICKS', title: 'Telco churn Lakehouse and MLOps', subtitle: 'Medallion · Delta Lake · MLflow · Unity Catalog' },
  },
  {
    slug: 'smart-parking-albacete',
    image: 'public/img/projects/smart-parking/cover-dashboard-streamlit.png',
    es: { eyebrow: 'CASO DE ESTUDIO · AWS IOT', title: 'Smart Parking Albacete', subtitle: 'MQTT · Lambda · DynamoDB · API Gateway · Streamlit' },
    en: { eyebrow: 'CASE STUDY · AWS IOT', title: 'Smart Parking Albacete', subtitle: 'MQTT · Lambda · DynamoDB · API Gateway · Streamlit' },
  },
  {
    slug: 'big-data-catalog-batch-streaming',
    image: 'public/img/projects/spark/arquitectura-ejecutiva.png',
    es: { eyebrow: 'CASO DE ESTUDIO · DATA PLATFORM', title: 'Spark, Kafka y Airflow', subtitle: 'Batch · Streaming · Delta Lake · MinIO' },
    en: { eyebrow: 'CASE STUDY · DATA PLATFORM', title: 'Spark, Kafka and Airflow', subtitle: 'Batch · Streaming · Delta Lake · MinIO' },
  },
];

function escapeXml(value) {
  const replacements = { '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' };
  return value.replace(/[<>&'"]/g, (character) => replacements[character]);
}

// Greedy wrap that keeps the title inside the left column, clear of the visual on the right.
function titleLines(title, maxChars = 17) {
  const lines = [''];
  for (const word of title.split(' ')) {
    const current = lines.at(-1);
    const candidate = (current + ' ' + word).trim();
    if (current && candidate.length > maxChars) lines.push(word);
    else lines[lines.length - 1] = candidate;
  }
  return lines;
}

for (const card of cards) {
  const imagePath = resolve(root, card.image);
  const source = await readFile(imagePath);
  const visual = await sharp(source)
    .resize(card.portrait ? 320 : 960, card.portrait ? 320 : 540, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();
  const visualB64 = visual.toString('base64');

  for (const lang of ['es', 'en']) {
    const copy = card[lang];
    const lines = titleLines(copy.title, card.portrait ? 24 : 17);
    const lineMarkup = lines
      .map((line, index) => `<text x="72" y="${(lines.length > 2 ? 262 : 290) + index * 64}" class="title">${escapeXml(line)}</text>`)
      .join('');
    const clip = card.portrait
      ? '<clipPath id="visual"><circle cx="1010" cy="315" r="158"/></clipPath>'
      : '<clipPath id="visual"><rect x="650" y="180" width="480" height="270" rx="20"/></clipPath>';
    const image = card.portrait
      ? `<image x="852" y="157" width="316" height="316" href="data:image/png;base64,${visualB64}" clip-path="url(#visual)" preserveAspectRatio="xMidYMid slice"/><circle cx="1010" cy="315" r="164" fill="none" stroke="#22d3ee" stroke-width="7"/>`
      : `<image x="650" y="180" width="480" height="270" href="data:image/png;base64,${visualB64}" clip-path="url(#visual)" preserveAspectRatio="xMidYMid slice"/><rect x="650" y="180" width="480" height="270" rx="20" fill="none" stroke="#334155" stroke-width="2"/>`;

    const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#1e293b" stroke-width="1"/></pattern>
        ${clip}
        <style>
          .eyebrow { font: 700 25px DejaVu Sans, Arial, sans-serif; fill: #22d3ee; letter-spacing: 2px; }
          .title { font: 700 50px DejaVu Sans, Arial, sans-serif; fill: #f8fafc; }
          .subtitle { font: 400 23px DejaVu Sans, Arial, sans-serif; fill: #94a3b8; }
          .owner { font: 600 20px DejaVu Sans, Arial, sans-serif; fill: #cbd5e1; }
        </style>
      </defs>
      <rect width="1200" height="630" fill="#020617"/>
      <rect width="1200" height="630" fill="url(#grid)" opacity="0.55"/>
      <rect x="0" width="14" height="630" fill="#06b6d4"/>
      <circle cx="720" cy="-40" r="280" fill="#4f46e5" opacity="0.10"/>
      <text x="72" y="190" class="eyebrow">${escapeXml(copy.eyebrow)}</text>
      ${lineMarkup}
      <text x="74" y="505" class="subtitle">${escapeXml(copy.subtitle)}</text>
      <text x="74" y="565" class="owner">Alonso Marcos Muñoz · alonsomarcosm.github.io</text>
      ${image}
    </svg>`;

    await sharp(Buffer.from(svg)).png().toFile(resolve(outputDir, `${card.slug}-${lang}.png`));
  }
}

await sharp(resolve(outputDir, 'home-es.png')).toFile(resolve(root, 'public/img/og-default.png'));
console.log(`Generated ${cards.length * 2} OpenGraph cards`);
