// Mapea una etiqueta de tecnología a un icono de Iconify (set simple-icons)
// y su color de marca oficial. Solo slugs verificados como presentes.
// El orden importa: la primera regla que casa, gana.
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
  // IA / asistentes (copilot debe ir antes que github).
  { test: (s) => has(s, 'claude', 'anthropic'), icon: 'simple-icons:claude', color: '#D97757' },
  { test: (s) => has(s, 'copilot'), icon: 'simple-icons:githubcopilot', color: '#0B0B0B' },
  { test: (s) => has(s, 'codex') || s === 'openai', icon: 'simple-icons:openai', color: '#412991' },

  // Microsoft / Power Platform.
  { test: (s) => has(s, 'power automate'), icon: 'simple-icons:powerautomate', color: '#0066FF' },
  { test: (s) => has(s, 'power apps', 'powerapps'), icon: 'simple-icons:powerapps', color: '#742774' },
  { test: (s) => has(s, 'sql server'), icon: 'simple-icons:microsoftsqlserver', color: '#CC2927' },
  { test: (s) => has(s, 'microsoft 365', 'office 365', 'm365'), icon: 'simple-icons:microsoftoffice', color: '#D83B01' },
  { test: (s) => has(s, 'sharepoint'), icon: 'simple-icons:microsoftsharepoint', color: '#0078D4' },

  // AWS: iconos por servicio (antes que python/openapi y que el AWS genérico).
  { test: (s) => has(s, 'lambda'), icon: 'simple-icons:awslambda', color: '#FF9900' },
  { test: (s) => has(s, 'dynamodb'), icon: 'simple-icons:amazondynamodb', color: '#4053D6' },
  { test: (s) => has(s, 'api gateway'), icon: 'simple-icons:amazonapigateway', color: '#A166FF' },
  { test: (s) => has(s, 'cloudwatch'), icon: 'simple-icons:amazoncloudwatch', color: '#FF4F8B' },
  { test: (s) => has(s, ' ec2', 'ec2 ') || s === 'ec2', icon: 'simple-icons:amazonec2', color: '#FF9900' },
  { test: (s) => has(s, ' s3', 's3 ') || s === 's3' || s.endsWith('s3'), icon: 'simple-icons:amazons3', color: '#569A31' },
  { test: (s) => has(s, 'secrets manager'), icon: 'simple-icons:awssecretsmanager', color: '#DD344C' },
  // AWS genérico (IoT Core, SNS, SSM, etc.).
  { test: (s) => has(s, 'aws', 'amazon', 'iot core'), icon: 'simple-icons:amazonwebservices', color: '#FF9900' },

  // Protocolos / specs.
  { test: (s) => has(s, 'mqtt', 'paho'), icon: 'simple-icons:mqtt', color: '#660066' },
  { test: (s) => has(s, 'openapi'), icon: 'simple-icons:openapiinitiative', color: '#6BA539' },

  // Big Data.
  { test: (s) => has(s, 'pyspark', 'spark'), icon: 'simple-icons:apachespark', color: '#E25A1C' },
  { test: (s) => has(s, 'airflow'), icon: 'simple-icons:apacheairflow', color: '#017CEE' },
  { test: (s) => has(s, 'kafka'), icon: 'simple-icons:apachekafka', color: '#231F20' },
  { test: (s) => has(s, 'parquet'), icon: 'simple-icons:apacheparquet', color: '#50ABF1' },
  { test: (s) => has(s, 'hadoop'), icon: 'simple-icons:apachehadoop', color: '#66CCFF' },

  // Data engineering / lenguajes / infra.
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
  { test: (s) => has(s, 'terraform'), icon: 'simple-icons:terraform', color: '#844FBA' },
  { test: (s) => has(s, 'nginx'), icon: 'simple-icons:nginx', color: '#009639' },
  { test: (s) => has(s, 'linux', 'ssh'), icon: 'simple-icons:linux', color: '#E9A100' },
  { test: (s) => has(s, 'gitlab'), icon: 'simple-icons:gitlab', color: '#FC6D26' },
  { test: (s) => has(s, 'github'), icon: 'simple-icons:github', color: '#181717' },
  { test: (s) => s === 'git' || has(s, 'git /'), icon: 'simple-icons:git', color: '#F05032' },

  // Frontend / otros.
  { test: (s) => has(s, 'angular'), icon: 'simple-icons:angular', color: '#DD0031' },
  { test: (s) => has(s, 'typescript'), icon: 'simple-icons:typescript', color: '#3178C6' },
  { test: (s) => has(s, 'rxjs', 'reactivex'), icon: 'simple-icons:reactivex', color: '#B7178C' },
  { test: (s) => has(s, 'streamlit'), icon: 'simple-icons:streamlit', color: '#FF4B4B' },
  { test: (s) => has(s, 'next'), icon: 'simple-icons:nextdotjs', color: '#0B0B0B' },
  { test: (s) => has(s, 'jinja'), icon: 'simple-icons:jinja', color: '#B41717' },
  { test: (s) => has(s, 'oracle'), icon: 'simple-icons:oracle', color: '#F80000' },
  { test: (s) => s === 'r' || has(s, 'plumber'), icon: 'simple-icons:r', color: '#276DC3' },
];

export function getTech(label: string): TechIcon | null {
  const s = label.toLowerCase().trim();
  for (const r of rules) {
    if (r.test(s)) return { icon: r.icon, color: r.color };
  }
  return null;
}
