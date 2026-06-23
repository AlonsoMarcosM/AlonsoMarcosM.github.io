// Mapea una etiqueta de tecnología a un icono de Iconify (set simple-icons).
// Solo slugs verificados como presentes en @iconify-json/simple-icons.
// Devuelve null si no hay icono apropiado (se renderiza un chip plano).

interface Rule {
  test: (s: string) => boolean;
  icon: string;
}

const has = (s: string, ...keys: string[]) => keys.some((k) => s.includes(k));

const rules: Rule[] = [
  { test: (s) => s === 'r' || has(s, 'plumber'), icon: 'simple-icons:r' },
  { test: (s) => has(s, 'pyspark', 'spark'), icon: 'simple-icons:apachespark' },
  { test: (s) => has(s, 'airflow'), icon: 'simple-icons:apacheairflow' },
  { test: (s) => has(s, 'kafka'), icon: 'simple-icons:apachekafka' },
  { test: (s) => has(s, 'parquet'), icon: 'simple-icons:apacheparquet' },
  { test: (s) => has(s, 'hadoop'), icon: 'simple-icons:apachehadoop' },
  { test: (s) => has(s, 'python'), icon: 'simple-icons:python' },
  { test: (s) => has(s, 'podman'), icon: 'simple-icons:podman' },
  { test: (s) => has(s, 'docker', 'compose'), icon: 'simple-icons:docker' },
  { test: (s) => has(s, 'kubernetes', 'kind ', 'k8s'), icon: 'simple-icons:kubernetes' },
  { test: (s) => has(s, 'helm'), icon: 'simple-icons:helm' },
  { test: (s) => has(s, 'postgres'), icon: 'simple-icons:postgresql' },
  { test: (s) => has(s, 'redis'), icon: 'simple-icons:redis' },
  { test: (s) => has(s, 'solr'), icon: 'simple-icons:apachesolr' },
  { test: (s) => has(s, 'minio'), icon: 'simple-icons:minio' },
  { test: (s) => has(s, 'databricks'), icon: 'simple-icons:databricks' },
  { test: (s) => has(s, 'mlflow'), icon: 'simple-icons:mlflow' },
  {
    test: (s) =>
      has(s, 'aws', 'amazon', 'dynamodb', 'lambda', 'api gateway', 'iot core', ' s3', 'sns', 'cloudwatch', ' ssm'),
    icon: 'simple-icons:amazonwebservices',
  },
  { test: (s) => has(s, 'terraform'), icon: 'simple-icons:terraform' },
  { test: (s) => has(s, 'nginx'), icon: 'simple-icons:nginx' },
  { test: (s) => has(s, 'linux', 'ssh'), icon: 'simple-icons:linux' },
  { test: (s) => has(s, 'gitlab'), icon: 'simple-icons:gitlab' },
  { test: (s) => has(s, 'github'), icon: 'simple-icons:github' },
  { test: (s) => s === 'git' || has(s, 'git /'), icon: 'simple-icons:git' },
  { test: (s) => has(s, 'angular'), icon: 'simple-icons:angular' },
  { test: (s) => has(s, 'typescript'), icon: 'simple-icons:typescript' },
  { test: (s) => has(s, 'rxjs', 'reactivex'), icon: 'simple-icons:reactivex' },
  { test: (s) => has(s, 'streamlit'), icon: 'simple-icons:streamlit' },
  { test: (s) => has(s, 'next'), icon: 'simple-icons:nextdotjs' },
  { test: (s) => has(s, 'jinja'), icon: 'simple-icons:jinja' },
  { test: (s) => has(s, 'oracle'), icon: 'simple-icons:oracle' },
  { test: (s) => has(s, 'sharepoint'), icon: 'simple-icons:microsoftsharepoint' },
];

export function getTechIcon(label: string): string | null {
  const s = label.toLowerCase().trim();
  for (const r of rules) {
    if (r.test(s)) return r.icon;
  }
  return null;
}
