import type { I18nList, I18nText } from '../i18n/utils';
import databricksManifest from './manifests/telco-churn-mlops-databricks.json';
import parkingManifest from './manifests/smart-parking-albacete.json';
import sparkManifest from './manifests/big-data-catalog-batch-streaming.json';

export type ProjectLinkType =
  | 'live_demo'
  | 'case_study'
  | 'architecture'
  | 'technical_docs'
  | 'github';

export interface ProjectIcon {
  icon?: string;
  img?: string;
  color?: string;
}

export interface ProjectLink {
  type: ProjectLinkType;
  url: string;
}

export interface ProjectMetric {
  label: I18nText;
  value: string;
  detail?: I18nText;
  evidence: string;
  source_type: string;
}

export interface ProjectEvidence {
  type: string;
  path: string;
  label: I18nText;
}

/** Badge al estilo shields.io; mismo contenido que el README del repositorio. */
export interface ProjectShield {
  label: string;
  value: string;
  color: string;
  icon?: string;
}

export interface ProjectMember {
  name: string;
  role: I18nText;
}

export interface ProjectManifestV2 {
  schema_version: 2;
  repository: string;
  repository_url: string;
  slug: string;
  title: I18nText;
  lifecycle: string;
  classification: string;
  problem: I18nText;
  architecture: I18nText;
  dataFlow: I18nText;
  stack: string[];
  team: ProjectMember[];
  ownership: I18nList;
  verifiedMetrics: ProjectMetric[];
  evidence: ProjectEvidence[];
  assets: string[];
  limitations: I18nList;
  links: ProjectLink[];
}

export interface Project {
  slug: string;
  title: I18nText;
  tagline: I18nText;
  category: I18nText;
  badge?: I18nText;
  icon: ProjectIcon;
  year: string;
  featured: boolean;
  order: number;
  tags: string[];
  stack: string[];
  context: I18nText;
  highlights: I18nList;
  links: ProjectLink[];
  lifecycle?: string;
  classification?: string;
  problem?: I18nText;
  architecture?: I18nText;
  dataFlow?: I18nText;
  team?: ProjectMember[];
  ownership?: I18nList;
  verifiedMetrics?: ProjectMetric[];
  evidence?: ProjectEvidence[];
  limitations?: I18nList;
  heroImage: string;
  heroAlt: I18nText;
  shields: ProjectShield[];
  ogImage?: string;
  assetBase?: string;
}

const databricks = databricksManifest as ProjectManifestV2;
const parking = parkingManifest as ProjectManifestV2;
const spark = sparkManifest as ProjectManifestV2;

function fromManifest(
  manifest: ProjectManifestV2,
  presentation: Omit<Project, keyof ProjectManifestV2 | 'links' | 'stack'>,
): Project {
  return {
    ...presentation,
    slug: manifest.slug,
    title: manifest.title,
    stack: manifest.stack,
    links: manifest.links,
    lifecycle: manifest.lifecycle,
    classification: manifest.classification,
    problem: manifest.problem,
    architecture: manifest.architecture,
    dataFlow: manifest.dataFlow,
    team: manifest.team,
    ownership: manifest.ownership,
    verifiedMetrics: manifest.verifiedMetrics,
    evidence: manifest.evidence,
    limitations: manifest.limitations,
  };
}

export const projects: Project[] = [
  fromManifest(databricks, {
    tagline: {
      es: 'Plataforma de datos de principio a fin, desarrollada en coautoría, que predice la baja de clientes de una operadora con datos sintéticos usando PySpark, Delta Lake, Unity Catalog y MLflow.',
      en: 'Co-developed end-to-end data platform that predicts customer churn for a telecom operator on synthetic data using PySpark, Delta Lake, Unity Catalog and MLflow.',
    },
    category: { es: 'Big Data · MLOps', en: 'Big Data · MLOps' },
    badge: { es: 'Proyecto académico aplicado', en: 'Applied academic project' },
    icon: { icon: 'simple-icons:databricks', color: '#FF3621' },
    year: '2026',
    featured: true,
    order: 1,
    tags: ['Databricks', 'Delta Lake', 'MLflow', 'Unity Catalog'],
    context: databricks.problem,
    highlights: databricks.ownership,
    shields: [
      { label: 'Databricks', value: 'Lakehouse', color: '#FF3621', icon: 'simple-icons:databricks' },
      { label: 'Asset Bundles', value: 'databricks.yml', color: '#FF3621', icon: 'simple-icons:databricks' },
      { label: 'Pipelines', value: 'Medallion serverless', color: '#FF3621', icon: 'simple-icons:databricks' },
      { label: 'Delta Lake', value: 'Bronze · Silver · Gold', color: '#00ADD4' },
      { label: 'Spark', value: 'MLlib', color: '#E25A1C', icon: 'simple-icons:apachespark' },
      { label: 'MLflow', value: 'Tracking + Registry', color: '#0194E2', icon: 'simple-icons:mlflow' },
      { label: 'Unity Catalog', value: 'Models + Tables', color: '#FF3621', icon: 'simple-icons:databricks' },
      { label: 'License', value: 'MIT', color: '#3DA639' },
    ],
    heroImage: '/img/projects/databricks/cover-lakehouse-monitor.png',
    heroAlt: {
      es: 'Dashboard de Databricks con tasa de churn, precisión del modelo, calibración y rendimiento por segmento',
      en: 'Databricks dashboard showing churn rate, model accuracy, calibration and performance by segment',
    },
    ogImage: '/img/og/telco-churn-mlops-databricks-es.png',
    assetBase: '/img/projects/databricks',
  }),
  fromManifest(parking, {
    tagline: {
      es: 'Plataforma IoT en la nube que recoge en tiempo real los datos de 40 sensores de aparcamiento simulados y los publica en un panel web, con AWS Lambda, DynamoDB y MQTT.',
      en: 'Cloud IoT platform that collects real-time data from 40 simulated parking sensors and serves it in a web dashboard, using AWS Lambda, DynamoDB and MQTT.',
    },
    category: { es: 'Cloud · IoT', en: 'Cloud · IoT' },
    badge: { es: 'Proyecto académico aplicado', en: 'Applied academic project' },
    icon: { icon: 'lucide:circle-parking', color: '#0EA5E9' },
    year: '2026',
    featured: true,
    order: 2,
    tags: ['AWS IoT', 'Lambda', 'DynamoDB', 'Streamlit'],
    context: parking.problem,
    highlights: parking.ownership,
    shields: [
      { label: 'Python', value: '3.13', color: '#3776AB', icon: 'simple-icons:python' },
      { label: 'AWS', value: 'IoT Core · Lambda · DynamoDB · API Gateway', color: '#FF9900', icon: 'simple-icons:amazonwebservices' },
      { label: 'MQTT', value: 'mTLS', color: '#660066', icon: 'simple-icons:mqtt' },
      { label: 'Streamlit', value: 'Dashboard', color: '#FF4B4B', icon: 'simple-icons:streamlit' },
      { label: 'OpenAPI', value: '3.0', color: '#6BA539', icon: 'simple-icons:openapiinitiative' },
      { label: 'License', value: 'Academic', color: '#007EC6' },
    ],
    heroImage: '/img/projects/smart-parking/cover-dashboard-streamlit.png',
    heroAlt: {
      es: 'Dashboard Streamlit con KPIs de ocupación, mapa de plazas en tiempo real y estado por sub-zona',
      en: 'Streamlit dashboard with occupancy KPIs, a real-time parking map and status by sub-zone',
    },
    ogImage: '/img/og/smart-parking-albacete-es.png',
    assetBase: '/img/projects/smart-parking',
  }),
  fromManifest(spark, {
    tagline: {
      es: 'Procesa datos por lotes y en tiempo real con Spark, Kafka y Airflow y los organiza en capas de calidad creciente (arquitectura Medallion) sobre Delta Lake.',
      en: 'Processes batch and real-time data with Spark, Kafka and Airflow and organises it into layers of increasing quality (Medallion architecture) on Delta Lake.',
    },
    category: { es: 'Data Engineering', en: 'Data Engineering' },
    badge: { es: 'Proyecto académico aplicado', en: 'Applied academic project' },
    icon: { icon: 'simple-icons:apachespark', color: '#E25A1C' },
    year: '2026',
    featured: true,
    order: 3,
    tags: ['Spark', 'Airflow', 'Kafka', 'Delta Lake'],
    context: spark.problem,
    highlights: spark.ownership,
    shields: [
      { label: 'Apache Spark', value: '4.0.1', color: '#E25A1C', icon: 'simple-icons:apachespark' },
      { label: 'Delta Lake', value: '4.0.0', color: '#00ADD4' },
      { label: 'Apache Kafka', value: '4.1.1', color: '#231F20', icon: 'simple-icons:apachekafka' },
      { label: 'Apache Airflow', value: '3.0.6', color: '#017CEE', icon: 'simple-icons:apacheairflow' },
      { label: 'MinIO', value: 'S3 local', color: '#C72E49', icon: 'simple-icons:minio' },
      { label: 'SQL Server', value: '2022', color: '#CC2927', icon: 'simple-icons:microsoftsqlserver' },
      { label: 'Docker', value: 'Compose', color: '#2496ED', icon: 'simple-icons:docker' },
      { label: 'License', value: 'MIT', color: '#3DA639' },
    ],
    heroImage: '/img/projects/spark/arquitectura-ejecutiva.png',
    heroAlt: {
      es: 'Diagrama: SQL Server, CSV y Kafka alimentan Spark, orquestado por Airflow, que escribe capas Bronze, Silver y Gold de Delta Lake sobre MinIO',
      en: 'Diagram: SQL Server, CSV and Kafka feed Spark, orchestrated by Airflow, which writes Bronze, Silver and Gold Delta Lake layers on MinIO',
    },
    ogImage: '/img/og/big-data-catalog-batch-streaming-es.png',
    assetBase: '/img/projects/spark',
  }),
  {
    slug: 'tfm-openmetadata-dcat-ap-es',
    badge: { es: 'TFM · 9,2/10 confirmado por Alonso', en: "Master's thesis · 9.2/10 confirmed by Alonso" },
    title: { es: 'OpenMetadata + DCAT-AP-ES', en: 'OpenMetadata + DCAT-AP-ES' },
    tagline: {
      es: 'Catálogo de metadatos en OpenMetadata sobre Kubernetes que descubre datos de PostgreSQL, los sincroniza y los exporta validados al estándar DCAT-AP-ES.',
      en: 'OpenMetadata metadata catalogue on Kubernetes that discovers PostgreSQL data, keeps it in sync and exports it validated against the DCAT-AP-ES standard.',
    },
    category: { es: 'Gobierno del dato', en: 'Data governance' },
    icon: { img: '/img/tech/openmetadata.png' },
    year: '2026',
    featured: false,
    order: 4,
    tags: ['OpenMetadata', 'DCAT-AP-ES', 'Kubernetes', 'Python'],
    stack: ['Python', 'OpenMetadata', 'Kubernetes', 'Helm', 'PostgreSQL', 'SHACL', 'JSON-LD', 'Next.js'],
    links: [
      { type: 'live_demo', url: 'https://tfm-plataforma-gobierno-dato.vercel.app' },
      { type: 'github', url: 'https://github.com/AlonsoMarcosM/TFM_Alonso_Marcos_Mu-oz' },
    ],
    context: {
      es: 'Trabajo Fin de Máster centrado en interoperabilidad, calidad y operación reproducible de metadatos.',
      en: "Master's thesis focused on metadata interoperability, quality and reproducible operations.",
    },
    highlights: {
      es: ['Despliegue reproducible con Kubernetes y Helm', 'Sincronización controlada mediante dry-run y apply', 'Exportación DCAT-AP-ES y validación SHACL'],
      en: ['Reproducible Kubernetes and Helm deployment', 'Controlled synchronisation through dry-run and apply', 'DCAT-AP-ES export and SHACL validation'],
    },
    shields: [
      { label: 'Python', value: '3.11+', color: '#3776AB', icon: 'simple-icons:python' },
      { label: 'Kubernetes', value: 'Kind + Helm', color: '#326CE5', icon: 'simple-icons:kubernetes' },
      { label: 'OpenMetadata', value: '1.11', color: '#3361FF' },
      { label: 'DCAT-AP-ES', value: '1.0.0', color: '#005A9C' },
      { label: 'SHACL', value: 'HVD', color: '#660066' },
      { label: 'Next.js', value: '16', color: '#000000', icon: 'simple-icons:nextdotjs' },
      { label: 'pnpm', value: 'canonical', color: '#F69220', icon: 'simple-icons:pnpm' },
      { label: 'License', value: 'Academic', color: '#007EC6' },
    ],
    heroImage: '/img/projects/tfm-openmetadata/cover-consola-validacion.png',
    heroAlt: {
      es: 'Consola operativa del TFM con la suite de validación y la validación DCAT live completadas, exportación JSON-LD y resultados SHACL',
      en: 'Thesis operations console showing the completed validation suite and live DCAT validation, JSON-LD export and SHACL results',
    },
  },
  {
    slug: 'gobierno-calidad-dato-openmetadata',
    title: { es: 'Gobierno y Calidad del Dato · UNE', en: 'Data Governance & Quality · UNE' },
    tagline: {
      es: 'Caso práctico de gobierno del dato con OpenMetadata y Python que aplica las normas UNE 0077-0081 a la catalogación, la calidad y la trazabilidad.',
      en: 'Data governance case study with OpenMetadata and Python that applies the UNE 0077-0081 standards to cataloguing, quality and traceability.',
    },
    category: { es: 'Gobierno del dato', en: 'Data governance' },
    icon: { icon: 'lucide:scale', color: '#16A34A' },
    year: '2026',
    featured: false,
    order: 5,
    tags: ['OpenMetadata', 'UNE 0077-0081', 'Kubernetes'],
    stack: ['OpenMetadata', 'Kubernetes', 'Helm', 'Python', 'PowerShell'],
    links: [
      { type: 'technical_docs', url: 'https://alonsomarcosm.github.io/TrabajoGobiernoCalidadDatos/' },
      { type: 'github', url: 'https://github.com/AlonsoMarcosM/TrabajoGobiernoCalidadDatos' },
    ],
    context: {
      es: 'Caso ficticio de EnergiTech usado para convertir procesos UNE en catálogo, glosario, linaje y propiedades navegables.',
      en: 'A fictional EnergiTech case used to turn UNE processes into a navigable catalogue, glossary, lineage and properties.',
    },
    highlights: {
      es: ['Catálogo, glosario y linaje como entidades reales', 'Trazabilidad UNE a entregable', 'Scripts idempotentes de carga y borrado'],
      en: ['Catalogue, glossary and lineage as real entities', 'UNE-to-deliverable traceability', 'Idempotent load and delete scripts'],
    },
    shields: [
      { label: 'Markdown', value: 'CommonMark', color: '#000000', icon: 'simple-icons:markdown' },
      { label: 'OpenMetadata', value: '1.12', color: '#3361FF' },
      { label: 'Python', value: '3.10+', color: '#3776AB', icon: 'simple-icons:python' },
      { label: 'PowerShell', value: '7', color: '#5391FE', icon: 'simple-icons:powershell' },
      { label: 'UNE', value: '0077–0081', color: '#005A9C' },
      { label: 'License', value: 'Academic', color: '#007EC6' },
    ],
    heroImage: '/img/projects/gobierno-calidad/cover-linaje-energitech.png',
    heroAlt: {
      es: 'Linaje en OpenMetadata del caso EnergiTech, desde punto de suministro y contrato hasta lecturas silver, curva gold y previsión de demanda',
      en: 'OpenMetadata lineage for the EnergiTech case, from supply point and contract to silver readings, gold load curve and demand forecast',
    },
  },
  {
    slug: 'honeypot-aws-terraform',
    title: { es: 'Honeypot en AWS con Terraform', en: 'AWS Honeypot with Terraform' },
    tagline: {
      es: 'Honeypot SSH con análisis serverless de logs e infraestructura como código.',
      en: 'SSH honeypot with serverless log analysis and infrastructure as code.',
    },
    category: { es: 'Cloud · Seguridad', en: 'Cloud · Security' },
    icon: { icon: 'simple-icons:terraform', color: '#844FBA' },
    year: '2026',
    featured: false,
    order: 6,
    tags: ['Terraform', 'AWS', 'Lambda', 'IaC'],
    stack: ['Terraform', 'AWS EC2', 'Amazon S3', 'AWS Lambda', 'SNS', 'CloudWatch', 'SSM'],
    links: [
      { type: 'technical_docs', url: 'https://alonsomarcosm.github.io/DAMN-TEAMSSN/' },
      { type: 'github', url: 'https://github.com/AlonsoMarcosM/DAMN-TEAMSSN' },
    ],
    context: {
      es: 'Proyecto cloud en equipo para desplegar Cowrie, centralizar logs y activar análisis y alertas serverless.',
      en: 'Team cloud project deploying Cowrie, centralising logs and enabling serverless analysis and alerts.',
    },
    highlights: {
      es: ['Terraform modular', 'Despliegue y destrucción automatizados', 'IAM mínimo, cifrado y acceso mediante SSM'],
      en: ['Modular Terraform', 'Automated deployment and teardown', 'Least-privilege IAM, encryption and SSM access'],
    },
    shields: [
      { label: 'Terraform', value: '≥ 1.5', color: '#844FBA', icon: 'simple-icons:terraform' },
      { label: 'AWS provider', value: '~> 5.0', color: '#FF9900', icon: 'simple-icons:amazonwebservices' },
      { label: 'AWS', value: 'EC2 · S3 · Lambda · SNS · CloudWatch · SSM', color: '#FF9900', icon: 'simple-icons:amazonwebservices' },
      { label: 'Cowrie', value: 'SSH honeypot', color: '#2F4F4F' },
      { label: 'Lambda', value: 'Python 3.11', color: '#3776AB', icon: 'simple-icons:python' },
      { label: 'PowerShell', value: 'up / down', color: '#5391FE', icon: 'simple-icons:powershell' },
      { label: 'License', value: 'MIT', color: '#3DA639' },
    ],
    heroImage: '/img/projects/honeypot/arquitectura-honeypot.png',
    heroAlt: {
      es: 'Diagrama: tráfico SSH de Internet llega a Cowrie en EC2, los logs pasan a S3 y activan Lambda, con alertas SNS, CloudWatch y administración por SSM, todo desplegado con Terraform',
      en: 'Diagram: Internet SSH traffic reaches Cowrie on EC2, logs flow to S3 and trigger Lambda, with SNS alerts, CloudWatch and SSM administration, all deployed with Terraform',
    },
  },
  {
    slug: 'tfg-remote-r-scripts',
    badge: { es: 'TFG · Trabajo Fin de Grado', en: "Bachelor's thesis" },
    title: { es: 'Ejecución remota de scripts en R', en: 'Remote execution of R scripts' },
    tagline: {
      es: 'Aplicación full stack para ejecutar scripts R mediante una API REST con una instancia dedicada por usuario.',
      en: 'Full-stack application for running R scripts through a REST API with a dedicated instance per user.',
    },
    category: { es: 'Full stack', en: 'Full stack' },
    icon: { icon: 'simple-icons:r', color: '#276DC3' },
    year: '2025',
    featured: false,
    order: 7,
    tags: ['Angular', 'R / Plumber', 'Docker', 'OpenAPI'],
    stack: ['Angular', 'TypeScript', 'RxJS', 'R', 'Plumber', 'Docker Compose', 'OpenAPI'],
    links: [
      { type: 'technical_docs', url: 'https://alonsomarcosm.github.io/TFG_AlonsoMarcosMu-oz/' },
      { type: 'github', url: 'https://github.com/AlonsoMarcosM/TFG_AlonsoMarcosMu-oz' },
    ],
    context: {
      es: 'Trabajo Fin de Grado que separa frontend y backend y expone ejecución remota mediante APIs documentadas.',
      en: "Bachelor's thesis separating frontend and backend and exposing remote execution through documented APIs.",
    },
    highlights: {
      es: ['Frontend Angular y backend R/Plumber', 'APIs documentadas con OpenAPI', 'Una API Plumber por usuario, con roles y sesiones'],
      en: ['Angular frontend and R/Plumber backend', 'OpenAPI-documented APIs', 'One Plumber API per user, with roles and sessions'],
    },
    shields: [
      { label: 'Angular', value: '19', color: '#DD0031', icon: 'simple-icons:angular' },
      { label: 'Angular Material', value: '19', color: '#3F51B5', icon: 'simple-icons:angular' },
      { label: 'TypeScript', value: '5.7', color: '#3178C6', icon: 'simple-icons:typescript' },
      { label: 'RxJS', value: '7.8', color: '#B7178C', icon: 'simple-icons:reactivex' },
      { label: 'R', value: 'Plumber', color: '#276DC3', icon: 'simple-icons:r' },
      { label: 'OpenAPI', value: '3.0', color: '#6BA539', icon: 'simple-icons:openapiinitiative' },
      { label: 'Docker', value: 'Compose', color: '#2496ED', icon: 'simple-icons:docker' },
      { label: 'Node.js', value: '20', color: '#5FA04E', icon: 'simple-icons:nodedotjs' },
      { label: 'License', value: 'MIT', color: '#3DA639' },
    ],
    heroImage: '/img/projects/tfg-r/cover-ejecucion-r.png',
    heroAlt: {
      es: 'Aplicación Angular ejecutando un script R de estadísticas descriptivas, con parámetros, metadatos y resultado calculado',
      en: 'Angular application running a descriptive statistics R script, showing parameters, metadata and the computed result',
    },
  },
];

export const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectLink(project: Project, type: ProjectLinkType): ProjectLink | undefined {
  return project.links.find((link) => link.type === type);
}
