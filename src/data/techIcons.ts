// Mapea una etiqueta de tecnología a un icono de Iconify (set simple-icons)
// y su color de marca oficial. Solo slugs verificados como presentes.
// Devuelve null si no hay icono apropiado (se renderiza un chip plano).

export interface TechIcon {
  icon: string;
  color: string;
}

interface Rule {
  test: (s: string) => boolean;
  icon: string;
  color: string;
}

const has = (s: string, ...keys: string[]) => keys.some((k) => s.includes(k));

const rules: Rule[] = [
  { test: (s) => s === 'r' || has(s, 'plumber'), icon: 'simple-icons:r', color: '#276DC3' },
  { test: (s) => has(s, 'pyspark', 'spark'), icon: 'simple-icons:apachespark', color: '#E25A1C' },
  { test: (s) => has(s, 'airflow'), icon: 'simple-icons:apacheairflow', color: '#017CEE' },
  { test: (s) => has(s, 'kafka'), icon: 'simple-icons:apachekafka', color: '#231F20' },
  { test: (s) => has(s, 'parquet'), icon: 'simple-icons:apacheparquet', color: '#50ABF1' },
  { test: (s) => has(s, 'hadoop'), icon: 'simple-icons:apachehadoop', color: '#66CCFF' },
  { test: (s) => has(s, 'python'), icon: 'simple-icons:python', color: '#3776AB' },
  { test: (s) => has(s, 'podman'), icon: 'simple-icons:podman', color: '#892CA0' },
  { test: (s) => has(s, 'docker', 'compose'), icon: 'simple-icons:docker', color: '#2496ED' },
  { test: (s) => has(s, 'kubernetes', 'kind ', 'k8s'), icon: 'simple-icons:kubernetes', color: '#326CE5' },
  { test: (s) => has(s, 'helm'), icon: 'simple-icons:helm', color: '#0F1689' },
  { test: (s) => has(s, 'postgres'), icon: 'simple-icons:postgresql', color: '#4169E1' },
  { test: (s) => has(s, 'redis'), icon: 'simple-icons:redis', color: '#FF4438' },
  { test: (s) => has(s, 'solr'), icon: 'simple-icons:apachesolr', color: '#D9411E' },
  { test: (s) => has(s, 'minio'), icon: 'simple-icons:minio', color: '#C72E49' },
  { test: (s) => has(s, 'databricks'), icon: 'simple-icons:databricks', color: '#FF3621' },
  { test: (s) => has(s, 'mlflow'), icon: 'simple-icons:mlflow', color: '#0194E2' },
  {
    test: (s) =>
      has(s, 'aws', 'amazon', 'dynamodb', 'lambda', 'api gateway', 'iot core', ' s3', 'sns', 'cloudwatch', ' ssm'),
    icon: 'simple-icons:amazonwebservices',
    color: '#FF9900',
  },
  { test: (s) => has(s, 'terraform'), icon: 'simple-icons:terraform', color: '#844FBA' },
  { test: (s) => has(s, 'nginx'), icon: 'simple-icons:nginx', color: '#009639' },
  { test: (s) => has(s, 'linux', 'ssh'), icon: 'simple-icons:linux', color: '#E9A100' },
  { test: (s) => has(s, 'gitlab'), icon: 'simple-icons:gitlab', color: '#FC6D26' },
  { test: (s) => has(s, 'github'), icon: 'simple-icons:github', color: '#181717' },
  { test: (s) => s === 'git' || has(s, 'git /'), icon: 'simple-icons:git', color: '#F05032' },
  { test: (s) => has(s, 'angular'), icon: 'simple-icons:angular', color: '#DD0031' },
  { test: (s) => has(s, 'typescript'), icon: 'simple-icons:typescript', color: '#3178C6' },
  { test: (s) => has(s, 'rxjs', 'reactivex'), icon: 'simple-icons:reactivex', color: '#B7178C' },
  { test: (s) => has(s, 'streamlit'), icon: 'simple-icons:streamlit', color: '#FF4B4B' },
  { test: (s) => has(s, 'next'), icon: 'simple-icons:nextdotjs', color: '#0B0B0B' },
  { test: (s) => has(s, 'jinja'), icon: 'simple-icons:jinja', color: '#B41717' },
  { test: (s) => has(s, 'oracle'), icon: 'simple-icons:oracle', color: '#C74634' },
  { test: (s) => has(s, 'sharepoint'), icon: 'simple-icons:microsoftsharepoint', color: '#0078D4' },
];

export function getTech(label: string): TechIcon | null {
  const s = label.toLowerCase().trim();
  for (const r of rules) {
    if (r.test(s)) return { icon: r.icon, color: r.color };
  }
  return null;
}
