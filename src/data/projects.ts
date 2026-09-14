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
  heroImage?: string;
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
      es: 'Lakehouse Medallion y ciclo MLOps reproducible sobre Databricks con evidencia de ejecución.',
      en: 'Reproducible Databricks Medallion Lakehouse and MLOps lifecycle with execution evidence.',
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
    heroImage: '/img/projects/databricks/hito2_pipeline_medallion_dag.png',
    ogImage: '/img/og/telco-churn-mlops-databricks-es.png',
    assetBase: '/img/projects/databricks',
  }),
  fromManifest(parking, {
    tagline: {
      es: 'Plataforma IoT serverless probada en AWS Academy, desde telemetría MQTT hasta API y dashboard.',
      en: 'Serverless IoT platform tested in AWS Academy, from MQTT telemetry to API and dashboard.',
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
    heroImage: '/img/projects/smart-parking/diagrama_arquitectura.png',
    ogImage: '/img/og/smart-parking-albacete-es.png',
    assetBase: '/img/projects/smart-parking',
  }),
  fromManifest(spark, {
    tagline: {
      es: 'Plataforma local reproducible con batch, streaming, arquitectura Medallion y orquestación.',
      en: 'Reproducible local platform with batch, streaming, Medallion architecture and orchestration.',
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
    heroImage: '/img/projects/spark/arquitectura-ejecutiva.png',
    ogImage: '/img/og/big-data-catalog-batch-streaming-es.png',
    assetBase: '/img/projects/spark',
  }),
  {
    slug: 'tfm-openmetadata-dcat-ap-es',
    badge: { es: 'TFM · 9,2/10 confirmado por Alonso', en: "Master's thesis · 9.2/10 confirmed by Alonso" },
    title: { es: 'OpenMetadata + DCAT-AP-ES', en: 'OpenMetadata + DCAT-AP-ES' },
    tagline: {
      es: 'Modelo de metadatos gobernado con exportación RDF/JSON-LD y validación SHACL.',
      en: 'Governed metadata model with RDF/JSON-LD export and SHACL validation.',
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
  },
  {
    slug: 'gobierno-calidad-dato-openmetadata',
    title: { es: 'Gobierno y Calidad del Dato · UNE', en: 'Data Governance & Quality · UNE' },
    tagline: {
      es: 'Aplicación de la familia UNE 0077-0081 materializada en OpenMetadata.',
      en: 'Applying the UNE 0077-0081 family through real OpenMetadata entities.',
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
  },
  {
    slug: 'tfg-remote-r-scripts',
    badge: { es: 'TFG · Trabajo Fin de Grado', en: "Bachelor's thesis" },
    title: { es: 'Ejecución remota de scripts en R', en: 'Remote execution of R scripts' },
    tagline: {
      es: 'Aplicación full stack para ejecutar scripts R mediante API REST, contenedores y JWT.',
      en: 'Full-stack application for running R scripts through a REST API, containers and JWT.',
    },
    category: { es: 'Full stack', en: 'Full stack' },
    icon: { icon: 'simple-icons:r', color: '#276DC3' },
    year: '2025',
    featured: false,
    order: 7,
    tags: ['Angular', 'R / Plumber', 'Docker', 'JWT'],
    stack: ['Angular', 'TypeScript', 'RxJS', 'R', 'Plumber', 'Docker Compose', 'JWT', 'OpenAPI'],
    links: [
      { type: 'technical_docs', url: 'https://alonsomarcosm.github.io/TFG_AlonsoMarcosMu-oz/' },
      { type: 'github', url: 'https://github.com/AlonsoMarcosM/TFG_AlonsoMarcosMu-oz' },
    ],
    context: {
      es: 'Trabajo Fin de Grado que separa frontend y backend y expone ejecución remota mediante APIs documentadas.',
      en: "Bachelor's thesis separating frontend and backend and exposing remote execution through documented APIs.",
    },
    highlights: {
      es: ['Frontend Angular y backend R/Plumber', 'APIs documentadas con OpenAPI', 'Despliegue con Docker Compose y autenticación JWT'],
      en: ['Angular frontend and R/Plumber backend', 'OpenAPI-documented APIs', 'Docker Compose deployment and JWT authentication'],
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
