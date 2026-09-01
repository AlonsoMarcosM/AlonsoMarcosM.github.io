import type { I18nText } from '../i18n/utils';

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email' | 'external';
}

export interface SiteProfile {
  name: string;
  /** Titular profesional corto, mostrado bajo el nombre. */
  role: I18nText;
  /** Una frase de posicionamiento (hero). */
  tagline: I18nText;
  /** Párrafo(s) de perfil para la sección "Sobre mí". */
  about: I18nText[];
  location: I18nText;
  email: string;
  socials: SocialLink[];
  /** CV por idioma (rutas dentro de /public). */
  cv: { es: string; en: string };
}

export const profile: SiteProfile = {
  name: 'Alonso Marcos Muñoz',
  role: {
    es: 'Ingeniero de Datos · Pipelines, modelado y plataformas',
    en: 'Data Engineer · Pipelines, data modelling & platforms',
  },
  tagline: {
    es: 'Diseño e industrializo pipelines y modelos de datos con Python, SQL, calidad y operación multi-entorno; mi portfolio demuestra además Databricks, Spark, Airflow, Kafka, Delta Lake y AWS en soluciones end-to-end.',
    en: 'I design and industrialise data pipelines and models with Python, SQL, quality controls and multi-environment operations; my portfolio also demonstrates Databricks, Spark, Airflow, Kafka, Delta Lake and AWS in end-to-end solutions.',
  },
  about: [
    {
      es: 'Ingeniero de Datos y Plataformas centrado en construir pipelines fiables, modelos de datos mantenibles y soluciones operables. Actualmente trabajo en Tragsatec, dentro de ImpulsaDATA para la Dirección General del Dato, en una plataforma cuyo alcance incluye 22 organismos de la AGE y más de 10.000 datasets federados en datos.gob.es.',
      en: 'Data Engineer and Platform Engineer focused on reliable pipelines, maintainable data models and operable solutions. I currently work at Tragsatec within ImpulsaDATA for the Spanish Data Directorate, on a platform spanning 22 central-government bodies and more than 10,000 datasets federated to datos.gob.es.',
    },
    {
      es: 'Mi trabajo combina Python, SQL y modelado sobre PostgreSQL/Oracle con ETL de metadatos, CKAN, DCAT-AP-ES, RDF/JSON-LD y SHACL. Abarca transformaciones, agregaciones, vistas y optimización, junto con contenedorización, seguridad, administración de entornos test/desa/pre/pro y documentación operativa.',
      en: 'My work combines Python, SQL and data modelling on PostgreSQL/Oracle with metadata ETL, CKAN, DCAT-AP-ES, RDF/JSON-LD and SHACL. It covers transformations, aggregations, views and optimisation alongside containerisation, security, test/dev/pre-production/production environments and operational documentation.',
    },
    {
      es: 'Lo complemento con un Máster en Big Data y Computación en la Nube, la certificación CAPM y proyectos en OpenMetadata, Kubernetes, Airflow, Spark, Kafka, Databricks y AWS, además de IA generativa aplicada y AI harness engineering para acelerar análisis, desarrollo y documentación.',
      en: 'I complement this with a Master’s in Big Data & Cloud Computing, the CAPM certification and projects across OpenMetadata, Kubernetes, Airflow, Spark, Kafka, Databricks and AWS, plus applied generative AI and AI harness engineering to speed up analysis, development and documentation.',
    },
  ],
  location: { es: 'Albacete, España', en: 'Albacete, Spain' },
  email: 'alonsomarcosm99@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AlonsoMarcosM', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alonsomarcosm99/', icon: 'linkedin' },
    { label: 'Timeline CV · Manfred', href: 'https://www.getmanfred.com/perfil/735337eb-0689-4fa6-8776-0dc0784bfb27', icon: 'external' },
    { label: 'Perfil profesional · Tecnoempleo', href: 'https://www.tecnoempleo.com/alonso-marcos-munoz.mpt', icon: 'external' },
    { label: 'Email', href: 'mailto:alonsomarcosm99@gmail.com', icon: 'email' },
  ],
  cv: {
    es: '/cv/CV_Alonso_Marcos_Munoz_ES.pdf',
    en: '/cv/CV_Alonso_Marcos_Munoz_EN.pdf',
  },
};

/** Secciones navegables del home (ancla -> etiqueta i18n). */
export const navSections = [
  { id: 'about', key: 'nav.about', icon: 'lucide:user-round' },
  { id: 'experience', key: 'nav.experience', icon: 'lucide:briefcase' },
  { id: 'projects', key: 'nav.projects', icon: 'lucide:layers' },
  { id: 'skills', key: 'nav.skills', icon: 'lucide:code-xml' },
  { id: 'education', key: 'nav.education', icon: 'lucide:graduation-cap' },
  { id: 'contact', key: 'nav.contact', icon: 'lucide:mail' },
] as const;
