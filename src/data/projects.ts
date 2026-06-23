import type { I18nText, I18nList } from '../i18n/utils';

export interface Project {
  slug: string;
  title: I18nText;
  /** Frase corta para la tarjeta. */
  tagline: I18nText;
  category: I18nText;
  /** Distintivo académico opcional (p.ej. TFM/TFG). */
  badge?: I18nText;
  year: string;
  featured: boolean;
  /** Orden de aparición (menor = antes). */
  order: number;
  /** Etiquetas cortas para la tarjeta. */
  tags: string[];
  /** Stack completo para la página de detalle. */
  stack: string[];
  github: string;
  /** Demo en vivo (si existe). */
  demo?: string;
  context: I18nText;
  highlights: I18nList;
  results?: I18nList;
}

export const projects: Project[] = [
  {
    slug: 'tfm-openmetadata-dcat-ap-es',
    badge: { es: 'TFM · Trabajo Fin de Máster', en: "TFM · Master's Thesis" },
    title: {
      es: 'OpenMetadata + DCAT-AP-ES',
      en: 'OpenMetadata + DCAT-AP-ES',
    },
    tagline: {
      es: 'Modelo de metadatos gobernado, conforme a DCAT-AP, con exportación RDF/JSON-LD y validación SHACL.',
      en: 'A governed metadata model, DCAT-AP compliant, with RDF/JSON-LD export and SHACL validation.',
    },
    category: { es: 'Gobernanza del dato', en: 'Data governance' },
    year: '2026',
    featured: true,
    order: 1,
    tags: ['OpenMetadata', 'DCAT-AP-ES', 'Kubernetes', 'Python'],
    stack: ['Python', 'OpenMetadata 1.x', 'Kubernetes', 'Helm', 'Kind', 'PostgreSQL', 'SHACL / pySHACL', 'JSON-LD / RDF', 'Next.js'],
    github: 'https://github.com/AlonsoMarcosM/TFM_Alonso_Marcos_Mu-oz',
    demo: 'https://tfm-plataforma-gobierno-dato.vercel.app',
    context: {
      es: 'Trabajo Fin de Máster: diseño y configuración de un modelo de metadatos en OpenMetadata conforme al estándar DCAT-AP para la interoperabilidad de catálogos de datos. El perfil activo combina DCAT-AP 2.1.1, DCAT-AP HVD 2.2.0 y especificaciones adicionales.',
      en: "Master's thesis: designing and configuring a metadata model in OpenMetadata compliant with the DCAT-AP standard for data catalogue interoperability. The active profile combines DCAT-AP 2.1.1, DCAT-AP HVD 2.2.0 and additional specifications.",
    },
    highlights: {
      es: [
        'Despliegue reproducible de OpenMetadata sobre Kubernetes con Helm y Kind.',
        'Modelado y enriquecimiento de metadatos gobernados: displayName, descripciones, tags temáticos y custom properties (publisher, categoría HVD, access URL).',
        'Workflow reproducible om_dcat_sync con planes dry-run y aplicación controlada.',
        'Exportación DCAT-AP-ES en JSON-LD y RDF, con shapes SHACL oficiales vendorizadas para reproducibilidad exacta.',
        'Consola web operativa en Next.js para lanzar scripts versionados, gestionar ejecuciones, artefactos e historial.',
        'Empaquetado Python con CLI, tests y configuración declarativa.',
      ],
      en: [
        'Reproducible OpenMetadata deployment on Kubernetes with Helm and Kind.',
        'Modelling and enrichment of governed metadata: displayName, descriptions, thematic tags and custom properties (publisher, HVD category, access URL).',
        'Reproducible om_dcat_sync workflow with dry-run plans and controlled apply.',
        'DCAT-AP-ES export in JSON-LD and RDF, with official SHACL shapes vendored for exact reproducibility.',
        'Operational Next.js web console to run versioned scripts and manage executions, artifacts and history.',
        'Python packaging with CLI, tests and declarative configuration.',
      ],
    },
  },
  {
    slug: 'smart-parking-albacete',
    title: {
      es: 'Smart Parking Albacete',
      en: 'Smart Parking Albacete',
    },
    tagline: {
      es: 'Plataforma IoT serverless de aparcamiento inteligente sobre AWS real, de sensor a dashboard en tiempo real.',
      en: 'Serverless IoT smart-parking platform on real AWS, from sensor to real-time dashboard.',
    },
    category: { es: 'Cloud · IoT', en: 'Cloud · IoT' },
    year: '2026',
    featured: true,
    order: 2,
    tags: ['AWS IoT', 'Serverless', 'Lambda', 'DynamoDB'],
    stack: ['AWS IoT Core (MQTT + mTLS)', 'AWS Lambda (Python 3.12)', 'DynamoDB', 'API Gateway + OpenAPI 3.0', 'GeoJSON', 'Streamlit', 'boto3', 'paho-mqtt'],
    github: 'https://github.com/AlonsoMarcosM/smart-parking-albacete',
    demo: 'https://smart-parking-albacete.streamlit.app/',
    context: {
      es: 'Plataforma IoT serverless end-to-end de aparcamiento inteligente para el entorno universitario de Albacete, sobre infraestructura AWS real (no simulada). 40 sensores simulados publican por MQTT con mTLS contra AWS IoT Core, con procesado serverless y un dashboard en vivo.',
      en: 'End-to-end serverless IoT smart-parking platform for the university area of Albacete, on real (non-mocked) AWS infrastructure. 40 simulated sensors publish over MQTT with mTLS to AWS IoT Core, with serverless processing and a live dashboard.',
    },
    highlights: {
      es: [
        'Arquitectura IoT serverless end-to-end con trade-offs justificados (NB-IoT vs Sigfox, sensor magnético AMR vs ANPR).',
        'Seguridad por defecto: mTLS X.509 por dispositivo e IoT Policy restringida por topic.',
        'Despliegue y teardown reproducibles e idempotentes mediante scripts boto3.',
        'API pública documentada (OpenAPI 3.0 + GeoJSON) y dashboard Streamlit autoconfigurado sobre mapa OSM.',
      ],
      en: [
        'End-to-end serverless IoT architecture with justified trade-offs (NB-IoT vs Sigfox, AMR magnetic sensor vs ANPR).',
        'Security by default: per-device X.509 mTLS and a topic-restricted IoT Policy.',
        'Reproducible, idempotent deploy and teardown via boto3 scripts.',
        'Documented public API (OpenAPI 3.0 + GeoJSON) and a self-configuring Streamlit dashboard over an OSM map.',
      ],
    },
    results: {
      es: [
        'Latencia end-to-end sensor → DynamoDB → API: < 2 s.',
        '40 sensores · ~4 eventos/min sostenidos sin throttling.',
        'Despliegue completo en ~3 minutos; coste del piloto < 5 USD/mes.',
      ],
      en: [
        'End-to-end latency sensor → DynamoDB → API: < 2 s.',
        '40 sensors · ~4 events/min sustained without throttling.',
        'Full deployment in ~3 minutes; pilot cost < 5 USD/month.',
      ],
    },
  },
  {
    slug: 'telco-churn-mlops-databricks',
    title: {
      es: 'Telco Churn · Big Data & MLOps',
      en: 'Telco Churn · Big Data & MLOps',
    },
    tagline: {
      es: 'Plataforma MLOps end-to-end sobre Databricks Lakehouse para predecir fuga de clientes, con gobierno de modelos y monitorización.',
      en: 'End-to-end MLOps platform on Databricks Lakehouse to predict customer churn, with model governance and monitoring.',
    },
    category: { es: 'Big Data · MLOps', en: 'Big Data · MLOps' },
    year: '2026',
    featured: false,
    order: 3,
    tags: ['Databricks', 'Delta Lake', 'MLflow', 'Unity Catalog'],
    stack: ['Databricks', 'Unity Catalog', 'PySpark', 'Delta Lake', 'Auto Loader', 'Databricks Asset Bundles', 'Spark MLlib', 'MLflow', 'Lakehouse Monitoring'],
    github: 'https://github.com/AlonsoMarcosM/Trabajo-DESARROLLO-Y-DESPLIEGUE-DE-SOLUCIONES-BIG-DATA',
    demo: 'https://alonsomarcosm.github.io/Trabajo-DESARROLLO-Y-DESPLIEGUE-DE-SOLUCIONES-BIG-DATA/',
    context: {
      es: 'Plataforma de Big Data y MLOps sobre Databricks Lakehouse para predecir la fuga de clientes (churn) en una operadora. Cubre todo el ciclo: generación de datos, ingesta incremental, arquitectura Medallion, calidad, histórico SCD2/CDC, feature engineering temporal, entrenamiento, trazabilidad y monitorización.',
      en: 'A Big Data and MLOps platform on Databricks Lakehouse to predict customer churn at a telecom operator. It covers the full lifecycle: data generation, incremental ingestion, Medallion architecture, quality, SCD2/CDC history, temporal feature engineering, training, traceability and monitoring.',
    },
    highlights: {
      es: [
        'Arquitectura Medallion (Bronze/Silver/Gold) con reglas de calidad y tablas de cuarentena.',
        'Ingesta incremental con Auto Loader e históricos SCD2 / AUTO CDC.',
        'Feature engineering temporal con prevención explícita de data leakage (point-in-time joins).',
        'Gobierno de modelos en Unity Catalog (champion / challenger) y trazabilidad con MLflow.',
        'Despliegue reproducible con Databricks Asset Bundles; inferencia batch y monitorización de drift con alertas.',
      ],
      en: [
        'Medallion architecture (Bronze/Silver/Gold) with quality rules and quarantine tables.',
        'Incremental ingestion with Auto Loader and SCD2 / AUTO CDC history.',
        'Temporal feature engineering with explicit data-leakage prevention (point-in-time joins).',
        'Model governance in Unity Catalog (champion / challenger) and traceability with MLflow.',
        'Reproducible deployment with Databricks Asset Bundles; batch inference and drift monitoring with alerts.',
      ],
    },
  },
  {
    slug: 'big-data-catalog-batch-streaming',
    title: {
      es: 'Catálogo Big Data · batch + streaming',
      en: 'Big Data catalogue · batch + streaming',
    },
    tagline: {
      es: 'Catálogo vivo de metadatos con ingesta batch y streaming sobre arquitectura Medallion y Delta Lake, orquestado con Airflow.',
      en: 'A living metadata catalogue with batch and streaming ingestion over a Medallion architecture and Delta Lake, orchestrated with Airflow.',
    },
    category: { es: 'Big Data', en: 'Big Data' },
    year: '2026',
    featured: false,
    order: 4,
    tags: ['Spark', 'Airflow', 'Kafka', 'Delta Lake'],
    stack: ['Python', 'Apache Spark', 'Apache Airflow', 'Apache Kafka', 'SQL Server', 'MinIO', 'Delta Lake', 'Docker Compose'],
    github: 'https://github.com/AlonsoMarcosM/Proyecto_Big_Data_PMD_ASBD',
    demo: 'https://alonsomarcosm.github.io/Proyecto_Big_Data_PMD_ASBD/',
    context: {
      es: 'Proyecto reproducible para mantener un catálogo vivo de metadatos de datasets mediante ingesta batch y streaming, combinando fuentes estructuradas (SQL Server), semiestructuradas (CSV con JSON embebido) y streaming real (Kafka).',
      en: 'A reproducible project to maintain a living metadata catalogue through batch and streaming ingestion, combining structured (SQL Server), semi-structured (CSV with embedded JSON) and real streaming (Kafka) sources.',
    },
    highlights: {
      es: [
        'Pipelines Bronze, Silver y Gold sobre Delta Lake.',
        'Batch estructurado incremental desde SQL Server y batch semiestructurado desde CSV con campos JSON.',
        'Streaming Kafka con join contra Silver y agregaciones por ventana.',
        'Orquestación con Airflow usando TaskFlow, sensores y conexión cross-DAG.',
        'Entorno local reproducible end-to-end con Docker Compose (Airflow, Spark, MinIO, Kafka, Jupyter).',
      ],
      en: [
        'Bronze, Silver and Gold pipelines over Delta Lake.',
        'Incremental structured batch from SQL Server and semi-structured batch from CSV with JSON fields.',
        'Kafka streaming with a join against Silver and windowed aggregations.',
        'Airflow orchestration using TaskFlow, sensors and cross-DAG triggering.',
        'Reproducible end-to-end local environment with Docker Compose (Airflow, Spark, MinIO, Kafka, Jupyter).',
      ],
    },
  },
  {
    slug: 'gobierno-calidad-dato-openmetadata',
    title: {
      es: 'Gobierno y Calidad del Dato · UNE',
      en: 'Data Governance & Quality · UNE',
    },
    tagline: {
      es: 'Aplicación de la familia UNE 0077–0081 sobre un caso completo, materializada como entidades reales en OpenMetadata.',
      en: 'Applying the UNE 0077–0081 family to a full case study, materialised as real entities in OpenMetadata.',
    },
    category: { es: 'Gobernanza del dato', en: 'Data governance' },
    year: '2026',
    featured: false,
    order: 5,
    tags: ['OpenMetadata', 'UNE 0077-0081', 'Kubernetes'],
    stack: ['OpenMetadata 1.12', 'Kubernetes', 'Helm', 'Kind', 'Python 3.10', 'PowerShell 7'],
    github: 'https://github.com/AlonsoMarcosM/TrabajoGobiernoCalidadDatos',
    demo: 'https://alonsomarcosm.github.io/TrabajoGobiernoCalidadDatos/',
    context: {
      es: 'Práctica transversal que aplica los procesos UNE 0077, 0078, 0079, 0080 y 0081 sobre el caso ficticio EnergiTech y materializa el modelo en una instancia real de OpenMetadata sobre Kubernetes. El entregable no se queda en papel: catálogo, glosario, linaje y custom properties existen como entidades navegables.',
      en: 'A cross-cutting case study applying the UNE 0077, 0078, 0079, 0080 and 0081 processes to the fictional EnergiTech case, materialising the model in a real OpenMetadata instance on Kubernetes. The deliverable is not just paper: catalogue, glossary, lineage and custom properties exist as navigable entities.',
    },
    highlights: {
      es: [
        'Modelo de catálogo + glosario (19 términos) + clasificaciones + custom properties + linaje.',
        'Trazabilidad explícita UNE → entregable mediante custom properties.',
        'Scripts idempotentes de carga y borrado, con aislamiento estricto del entorno previo.',
        'Reducción pragmática de alcance para evidenciar cada proceso UNE sin saturar.',
      ],
      en: [
        'Catalogue model + glossary (19 terms) + classifications + custom properties + lineage.',
        'Explicit UNE → deliverable traceability via custom properties.',
        'Idempotent load and delete scripts, with strict isolation from the previous environment.',
        'Pragmatic scope reduction to evidence each UNE process without overload.',
      ],
    },
  },
  {
    slug: 'honeypot-aws-terraform',
    title: {
      es: 'Honeypot en AWS con Terraform',
      en: 'AWS Honeypot with Terraform',
    },
    tagline: {
      es: 'Honeypot SSH en AWS con análisis serverless de logs y alertas, todo como infraestructura como código.',
      en: 'SSH honeypot on AWS with serverless log analysis and alerts, all as infrastructure as code.',
    },
    category: { es: 'Cloud · Seguridad', en: 'Cloud · Security' },
    year: '2026',
    featured: false,
    order: 6,
    tags: ['Terraform', 'AWS', 'Lambda', 'IaC'],
    stack: ['Terraform', 'AWS EC2 (Cowrie)', 'AWS S3', 'AWS Lambda', 'AWS SNS', 'AWS CloudWatch', 'AWS SSM', 'PowerShell'],
    github: 'https://github.com/AlonsoMarcosM/DAMN-TEAMSSN',
    demo: 'https://alonsomarcosm.github.io/DAMN-TEAMSSN/',
    context: {
      es: 'Proyecto cloud para desplegar un honeypot SSH (Cowrie) en AWS con recogida de logs en S3, análisis automatizado con Lambda y alertas por SNS, con infraestructura como código en Terraform. Trabajo en equipo con flujo de PRs revisados y aislamiento por persona.',
      en: 'A cloud project to deploy an SSH honeypot (Cowrie) on AWS with log collection in S3, automated analysis with Lambda and alerts via SNS, with infrastructure as code in Terraform. Teamwork with a reviewed-PR flow and per-person isolation.',
    },
    highlights: {
      es: [
        'Infraestructura como código modular y reproducible en Terraform.',
        'Despliegue y destrucción automatizados con scripts de operación.',
        'Análisis serverless de logs con Lambda disparada por eventos de S3 y alertas con SNS/CloudWatch.',
        'Buenas prácticas de seguridad: SSM en lugar de SSH abierto, cifrado en S3 e IAM mínima.',
      ],
      en: [
        'Modular, reproducible infrastructure as code in Terraform.',
        'Automated deploy and teardown with operation scripts.',
        'Serverless log analysis with an S3-event-triggered Lambda and SNS/CloudWatch alerts.',
        'Security best practices: SSM instead of open SSH, S3 encryption and least-privilege IAM.',
      ],
    },
  },
  {
    slug: 'tfg-remote-r-scripts',
    badge: { es: 'TFG · Trabajo Fin de Grado', en: 'TFG · Bachelor’s Thesis' },
    title: {
      es: 'Ejecución remota de scripts en R',
      en: 'Remote execution of R scripts',
    },
    tagline: {
      es: 'Aplicación web full stack para ejecutar scripts en R desde el navegador, con API REST, contenedores y JWT.',
      en: 'A full-stack web app to run R scripts from the browser, with a REST API, containers and JWT.',
    },
    category: { es: 'Full stack', en: 'Full stack' },
    year: '2025',
    featured: true,
    order: 7,
    tags: ['Angular', 'R / Plumber', 'Docker', 'JWT'],
    stack: ['Angular', 'TypeScript', 'RxJS', 'R', 'Plumber', 'Docker Compose', 'JWT', 'OpenAPI'],
    github: 'https://github.com/AlonsoMarcosM/TFG_AlonsoMarcosMu-oz',
    demo: 'https://alonsomarcosm.github.io/TFG_AlonsoMarcosMu-oz/',
    context: {
      es: 'Trabajo Fin de Grado: aplicación web interactiva capaz de ejecutar scripts en R desde el navegador. Separa frontend y backend, expone APIs REST con Plumber y despliega ambos componentes en contenedores Docker.',
      en: "Bachelor's thesis: an interactive web application that runs R scripts from the browser. It separates frontend and backend, exposes REST APIs with Plumber and deploys both components in Docker containers.",
    },
    highlights: {
      es: [
        'Desarrollo full stack con Angular y backend en R/Plumber.',
        'Diseño de APIs REST documentadas con OpenAPI.',
        'Contenedorización y despliegue portable con Docker Compose.',
        'Autenticación basada en JWT y gestión del proyecto con Kanban y prácticas PMI.',
      ],
      en: [
        'Full-stack development with Angular and an R/Plumber backend.',
        'REST API design documented with OpenAPI.',
        'Containerisation and portable deployment with Docker Compose.',
        'JWT-based authentication and project management with Kanban and PMI practices.',
      ],
    },
  },
];

/** Proyectos ordenados para listados. */
export const orderedProjects = [...projects].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
