import type { I18nText } from '../i18n/utils';

export interface SkillGroup {
  title: I18nText;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: { es: 'Gobernanza y calidad del dato', en: 'Data governance & quality' },
    items: [
      'DCAT-AP-ES',
      'RDF',
      'JSON-LD',
      'SHACL / pySHACL',
      'OpenMetadata',
      'Metadata management',
      'Data lineage',
      'UNE 0077–0081',
    ],
  },
  {
    title: { es: 'Ingeniería de datos', en: 'Data engineering' },
    items: [
      'Python',
      'ETL / ELT',
      'CKAN + extensiones',
      'PostgreSQL',
      'Oracle',
      'Redis',
      'Solr',
      'SQL avanzado',
      'REST APIs',
      'Jinja2',
    ],
  },
  {
    title: { es: 'Big Data', en: 'Big Data' },
    items: [
      'Apache Spark',
      'Apache Airflow',
      'Apache Kafka',
      'Delta Lake',
      'MinIO',
      'Databricks',
      'MLflow',
      'Unity Catalog',
    ],
  },
  {
    title: { es: 'Cloud y DevOps', en: 'Cloud & DevOps' },
    items: [
      'AWS',
      'Terraform',
      'Docker / Compose',
      'Podman',
      'Kubernetes',
      'Helm',
      'nginx',
      'Linux / SSH',
      'Git / GitLab / GitHub',
    ],
  },
  {
    title: { es: 'Automatización y calidad', en: 'Automation & quality' },
    items: [
      'Automatización de flujos técnicos',
      'Diseño de contexto operativo',
      'Pruebas end-to-end',
      'Revisión técnica de código',
      'Documentación reproducible',
      'Trazabilidad de cambios',
    ],
  },
  {
    title: { es: 'Gestión e idiomas', en: 'Management & languages' },
    items: ['PMI / CAPM', 'Kanban', 'ADOCC', 'Español (nativo)', 'Inglés B2'],
  },
];
