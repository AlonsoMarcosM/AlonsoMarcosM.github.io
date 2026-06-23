import type { I18nText, I18nList } from '../i18n/utils';

export interface Experience {
  company: string;
  /** Logo/escudo de la empresa (ruta en /public). */
  logo?: string;
  role: I18nText;
  /** Periodo legible; usa null en "to" para indicar "actualidad". */
  period: { from: string; to: string | null };
  location: I18nText;
  summary: I18nText;
  highlights: I18nList;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Tragsatec',
    logo: '/img/companies/tragsatec.jpg',
    role: {
      es: 'Analista Programador de Datos · ImpulsaDATA (Dirección General del Dato, AGE)',
      en: 'Data Analyst–Programmer · ImpulsaDATA (Spanish Data Directorate)',
    },
    period: { from: '2025-06', to: null },
    location: { es: 'Sector público · España', en: 'Public sector · Spain' },
    summary: {
      es: 'Ingeniería de datos y gobernanza del dato en un contexto real de la Administración General del Estado, con alcance sobre 22 organismos y más de 10.000 datasets federados en datos.gob.es a través de catálogos CKAN comunes.',
      en: 'Data engineering and data governance in a real central-government setting, spanning 22 public bodies and 10,000+ datasets federated to datos.gob.es through shared CKAN catalogues.',
    },
    highlights: {
      es: [
        'Diseño y evolución de un conversor ETL de metadatos de extremo a extremo: extracción desde herramientas de gobierno, normalización, mapeo a un modelo común y publicación en CKAN.',
        'Alineación de metadatos con DCAT-AP-ES y generación de salidas RDF y JSON-LD con validación semántica SHACL previa y posterior a la carga.',
        'Desarrollo y evolución de extensiones y plugins de CKAN (DCAT, scheming, harvest, spatial) y de un plugin propio común a todos los organismos.',
        'Configuración de stacks contenedorizados (Docker/Podman) y administración de entornos test, desarrollo, preproducción y producción del equipo.',
        'Modelado de datos en SQL sobre el modelo de metadatos (transformaciones, agregaciones, vistas y optimización) en PostgreSQL.',
        'Documentación operativa y tutorización de perfiles junior, con criterio de calidad, mantenibilidad y baja deuda técnica.',
      ],
      en: [
        'Designed and evolved an end-to-end metadata ETL converter: extraction from governance tooling, normalisation, mapping to a common model and publishing into CKAN.',
        'Aligned metadata with DCAT-AP-ES and produced RDF and JSON-LD outputs with SHACL semantic validation before and after catalogue ingestion.',
        'Built and evolved CKAN extensions and plugins (DCAT, scheming, harvest, spatial) plus a custom plugin shared across all public bodies.',
        'Configured containerised stacks (Docker/Podman) and administered the team’s test, development, pre-production and production environments.',
        'Modelled data in SQL over the metadata model (transformations, aggregations, views and optimisation) on PostgreSQL.',
        'Wrote operational documentation and mentored junior profiles, with a focus on quality, maintainability and low technical debt.',
      ],
    },
    tags: ['Python', 'CKAN', 'DCAT-AP-ES', 'RDF/JSON-LD', 'SHACL', 'PostgreSQL', 'Docker/Podman', 'ETL'],
  },
  {
    company: 'La Fábrica del Tiempo',
    logo: '/img/companies/lafabrica.png',
    role: {
      es: 'Consultor de Automatización de Procesos y Productividad',
      en: 'Process Automation & Productivity Consultant',
    },
    period: { from: '2024-02', to: '2024-08' },
    location: { es: 'Almansa, España', en: 'Almansa, Spain' },
    summary: {
      es: 'Automatización de procesos y productividad con Power Platform sobre Microsoft 365, con formación a clientes y generación de contenido técnico.',
      en: 'Process automation and productivity with Power Platform on Microsoft 365, including client training and technical content creation.',
    },
    highlights: {
      es: [
        'App interna y flujos sin código con Power Apps + Power Automate para gestión de leads en un CRM.',
        'Sincronización SharePoint–CRM y notificaciones/aprobaciones automáticas.',
        'Más del 25 % de mejora de eficiencia operativa sobre la metodología ADOCC.',
      ],
      en: [
        'Internal app and no-code flows with Power Apps + Power Automate for CRM lead management.',
        'SharePoint–CRM synchronisation and automated notifications/approvals.',
        'Over 25% improvement in operational efficiency on top of the ADOCC methodology.',
      ],
    },
    tags: ['Power Apps', 'Power Automate', 'Microsoft 365', 'SharePoint'],
  },
  {
    company: 'Ayuntamiento de Alcázar de San Juan',
    logo: '/img/companies/alcazar.svg',
    role: {
      es: 'Técnico informático',
      en: 'IT Technician',
    },
    period: { from: '2019-03', to: '2019-06' },
    location: { es: 'Administración local · España', en: 'Local government · Spain' },
    summary: {
      es: 'Soporte IT y administración básica de sistemas y redes en entorno municipal.',
      en: 'IT support and basic systems & network administration in a municipal setting.',
    },
    highlights: {
      es: [
        'Resolución de incidencias y soporte a usuarios.',
        'Mantenimiento de sistemas y tareas básicas de infraestructura.',
        'Documentación técnica en un contexto de administración pública.',
      ],
      en: [
        'Incident resolution and end-user support.',
        'Systems maintenance and basic infrastructure tasks.',
        'Technical documentation within a public administration context.',
      ],
    },
    tags: ['Soporte IT', 'Sistemas', 'Redes'],
  },
];
