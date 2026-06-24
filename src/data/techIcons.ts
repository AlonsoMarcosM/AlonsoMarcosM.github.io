// Mapea una etiqueta de tecnología a un icono de Iconify (set simple-icons)
// y su color de marca oficial. Solo slugs verificados como presentes.
// El orden importa: la primera regla que casa, gana.
// Devuelve null si no hay icono apropiado (se renderiza un chip plano).

export interface TechIcon {
  /** Slug de icono de marca; ausente para tecnologías sin logo oficial. */
  icon?: string;
  color?: string;
  /** Icono lucide de respaldo (cuando no hay logo de marca). */
  lucide?: string;
  /** Documentación oficial (opcional). */
  doc?: string;
}

// Documentación oficial por slug de icono.
const DOCS: Record<string, string> = {
  'simple-icons:claude': 'https://docs.anthropic.com',
  'simple-icons:githubcopilot': 'https://docs.github.com/copilot',
  'simple-icons:openai': 'https://platform.openai.com/docs',
  'simple-icons:powerautomate': 'https://learn.microsoft.com/power-automate/',
  'simple-icons:powerapps': 'https://learn.microsoft.com/power-apps/',
  'simple-icons:microsoftsqlserver': 'https://learn.microsoft.com/sql/',
  'simple-icons:microsoftoffice': 'https://learn.microsoft.com/microsoft-365/',
  'simple-icons:microsoftsharepoint': 'https://learn.microsoft.com/sharepoint/',
  'simple-icons:awslambda': 'https://docs.aws.amazon.com/lambda/',
  'simple-icons:amazondynamodb': 'https://docs.aws.amazon.com/dynamodb/',
  'simple-icons:amazonapigateway': 'https://docs.aws.amazon.com/apigateway/',
  'simple-icons:amazoncloudwatch': 'https://docs.aws.amazon.com/cloudwatch/',
  'simple-icons:amazonec2': 'https://docs.aws.amazon.com/ec2/',
  'simple-icons:amazons3': 'https://docs.aws.amazon.com/s3/',
  'simple-icons:awssecretsmanager': 'https://docs.aws.amazon.com/secretsmanager/',
  'simple-icons:amazonwebservices': 'https://docs.aws.amazon.com/',
  'simple-icons:mqtt': 'https://mqtt.org/',
  'simple-icons:openapiinitiative': 'https://spec.openapis.org/',
  'simple-icons:apachespark': 'https://spark.apache.org/docs/latest/',
  'simple-icons:apacheairflow': 'https://airflow.apache.org/docs/',
  'simple-icons:apachekafka': 'https://kafka.apache.org/documentation/',
  'simple-icons:apacheparquet': 'https://parquet.apache.org/docs/',
  'simple-icons:apachehadoop': 'https://hadoop.apache.org/docs/stable/',
  'simple-icons:python': 'https://docs.python.org/3/',
  'simple-icons:podman': 'https://docs.podman.io/',
  'simple-icons:docker': 'https://docs.docker.com/',
  'simple-icons:kubernetes': 'https://kubernetes.io/docs/',
  'simple-icons:helm': 'https://helm.sh/docs/',
  'simple-icons:postgresql': 'https://www.postgresql.org/docs/',
  'simple-icons:redis': 'https://redis.io/docs/latest/',
  'simple-icons:apachesolr': 'https://solr.apache.org/guide/',
  'simple-icons:minio': 'https://min.io/docs/minio/linux/index.html',
  'simple-icons:databricks': 'https://docs.databricks.com/',
  'simple-icons:mlflow': 'https://mlflow.org/docs/latest/',
  'simple-icons:terraform': 'https://developer.hashicorp.com/terraform/docs',
  'simple-icons:nginx': 'https://nginx.org/en/docs/',
  'simple-icons:linux': 'https://www.kernel.org/doc/html/latest/',
  'simple-icons:gitlab': 'https://docs.gitlab.com/',
  'simple-icons:github': 'https://docs.github.com/',
  'simple-icons:git': 'https://git-scm.com/doc',
  'simple-icons:angular': 'https://angular.dev/overview',
  'simple-icons:typescript': 'https://www.typescriptlang.org/docs/',
  'simple-icons:reactivex': 'https://rxjs.dev/guide/overview',
  'simple-icons:streamlit': 'https://docs.streamlit.io/',
  'simple-icons:nextdotjs': 'https://nextjs.org/docs',
  'simple-icons:jinja': 'https://jinja.palletsprojects.com/',
  'simple-icons:oracle': 'https://docs.oracle.com/en/database/',
  'simple-icons:r': 'https://cran.r-project.org/manuals.html',
};

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

// Documentación oficial para tecnologías SIN logo de marca (chips de texto).
const textDocs: { test: (s: string) => boolean; doc: string }[] = [
  { test: (s) => has(s, 'dcat-ap-es', 'dcat ap es'), doc: 'https://datosgobes.github.io/DCAT-AP-ES/' },
  { test: (s) => has(s, 'dcat-ap', 'dcat'), doc: 'https://semiceu.github.io/DCAT-AP/releases/' },
  { test: (s) => has(s, 'json-ld', 'jsonld'), doc: 'https://json-ld.org/' },
  { test: (s) => has(s, 'shacl'), doc: 'https://www.w3.org/TR/shacl/' },
  { test: (s) => has(s, 'rdf'), doc: 'https://www.w3.org/RDF/' },
  { test: (s) => has(s, 'ckan'), doc: 'https://docs.ckan.org/' },
  { test: (s) => has(s, 'openmetadata'), doc: 'https://docs.open-metadata.org/' },
  { test: (s) => has(s, 'unity catalog'), doc: 'https://docs.databricks.com/data-governance/unity-catalog/' },
  { test: (s) => has(s, 'delta lake', 'delta'), doc: 'https://docs.delta.io/latest/index.html' },
  { test: (s) => has(s, 'auto loader', 'cloudfiles'), doc: 'https://docs.databricks.com/ingestion/cloud-object-storage/auto-loader/' },
  { test: (s) => has(s, 'medallion'), doc: 'https://www.databricks.com/glossary/medallion-architecture' },
  { test: (s) => has(s, 'asset bundle'), doc: 'https://docs.databricks.com/dev-tools/bundles/' },
  { test: (s) => has(s, 'lakehouse monitoring'), doc: 'https://docs.databricks.com/lakehouse-monitoring/index.html' },
  { test: (s) => has(s, 'mllib'), doc: 'https://spark.apache.org/docs/latest/ml-guide.html' },
  { test: (s) => has(s, 'geojson'), doc: 'https://geojson.org/' },
  { test: (s) => has(s, 'boto3'), doc: 'https://boto3.amazonaws.com/v1/documentation/api/latest/index.html' },
  { test: (s) => has(s, 'rest api', 'apis rest', 'action api'), doc: 'https://restfulapi.net/' },
  { test: (s) => has(s, 'une 0077', 'une 0078', 'une 0079', 'une 0080', 'une 0081', 'une '), doc: 'https://www.une.org/' },
  { test: (s) => has(s, 'pyshacl'), doc: 'https://github.com/RDFLib/pySHACL' },
];

// Icono lucide de respaldo por categoría, para chips sin logo de marca.
const fallbacks: { test: (s: string) => boolean; lucide: string }[] = [
  { test: (s) => has(s, 'dcat', 'rdf', 'json-ld', 'jsonld', 'shacl', 'semantic', 'linked data', 'interoper'), lucide: 'lucide:share-2' },
  { test: (s) => has(s, 'lineage', 'linaje', 'trazabilidad', 'traceab', 'scd', 'cdc'), lucide: 'lucide:git-compare' },
  { test: (s) => has(s, 'openmetadata', 'unity catalog', 'metadata', 'catalog', 'catálogo', 'glossary', 'glosario'), lucide: 'lucide:book-marked' },
  { test: (s) => has(s, 'governance', 'gobernanza', 'gobierno del dato'), lucide: 'lucide:shield-check' },
  { test: (s) => has(s, 'quality', 'calidad'), lucide: 'lucide:badge-check' },
  { test: (s) => has(s, 'une '), lucide: 'lucide:scale' },
  { test: (s) => has(s, 'delta lake', 'delta', 'medallion', 'lakehouse', 'bronze', 'silver', 'gold'), lucide: 'lucide:layers' },
  { test: (s) => has(s, 'auto loader', 'loader', 'ingesta', 'ingestion'), lucide: 'lucide:download' },
  { test: (s) => has(s, 'asset bundle', 'bundle'), lucide: 'lucide:blocks' },
  { test: (s) => has(s, 'monitoring', 'monitoriz', 'drift', 'observab'), lucide: 'lucide:gauge' },
  { test: (s) => has(s, 'etl', 'elt', 'pipeline', 'orquestac', 'orchestr', 'workflow', 'automat', 'adocc'), lucide: 'lucide:workflow' },
  { test: (s) => has(s, 'rest api', 'apis', 'api ', 'openapi', 'webhook') || s === 'api', lucide: 'lucide:webhook' },
  { test: (s) => has(s, 'ckan', 'sql', 'datastore', 'data store', 'database', 'datos'), lucide: 'lucide:database' },
  { test: (s) => has(s, 'geojson', 'geo', 'spatial', 'inspire', 'gis', 'mapa'), lucide: 'lucide:map' },
  { test: (s) => has(s, 'boto3', 'powershell', 'bash', 'cli', 'consola', 'terminal'), lucide: 'lucide:terminal' },
  { test: (s) => has(s, 'harness', 'agent', 'context engineering', 'agentic', ' ia', 'a.i', ' ai'), lucide: 'lucide:bot' },
  { test: (s) => has(s, 'end-to-end', 'e2e', 'prueba', 'test'), lucide: 'lucide:flask-conical' },
  { test: (s) => has(s, 'revisión', 'review', 'code', 'código'), lucide: 'lucide:git-pull-request' },
  { test: (s) => has(s, 'documenta', 'markdown', 'commonmark', 'latex'), lucide: 'lucide:file-text' },
  { test: (s) => has(s, 'pmi', 'capm', 'scrum', 'psm', 'project'), lucide: 'lucide:award' },
  { test: (s) => has(s, 'kanban'), lucide: 'lucide:square-kanban' },
  { test: (s) => has(s, 'español', 'inglés', 'ingles', 'english', 'idioma', 'language'), lucide: 'lucide:languages' },
  { test: (s) => has(s, 'soporte', 'support', 'sistemas', 'systems', 'helpdesk'), lucide: 'lucide:server-cog' },
  { test: (s) => has(s, 'red', 'network', 'dns', 'nginx'), lucide: 'lucide:network' },
];

function fallbackLucide(s: string): string {
  for (const f of fallbacks) {
    if (f.test(s)) return f.lucide;
  }
  return 'lucide:sparkles';
}

export function getTech(label: string): TechIcon | null {
  const s = label.toLowerCase().trim();
  for (const r of rules) {
    if (r.test(s)) return { icon: r.icon, color: r.color, doc: DOCS[r.icon] };
  }
  let doc: string | undefined;
  for (const t of textDocs) {
    if (t.test(s)) { doc = t.doc; break; }
  }
  return { lucide: fallbackLucide(s), doc };
}
