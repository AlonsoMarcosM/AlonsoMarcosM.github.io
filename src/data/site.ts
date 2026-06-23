import type { I18nText } from '../i18n/utils';

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email';
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
    es: 'Ingeniero de Datos · Gobernanza del dato e interoperabilidad',
    en: 'Data Engineer · Data Governance & Interoperability',
  },
  tagline: {
    es: 'Diseño e industrializo pipelines de metadatos e interoperabilidad para el sector público, con estándares abiertos, validación semántica y plataformas de datos operables.',
    en: 'I design and industrialise metadata & interoperability pipelines for the public sector, built on open standards, semantic validation and operable data platforms.',
  },
  about: [
    {
      es: 'Ingeniero de Datos centrado en gobernanza del dato, interoperabilidad y automatización de procesos de metadatos. Actualmente en Tragsatec, dentro del proyecto ImpulsaDATA para la Dirección General del Dato (Administración General del Estado), trabajando en publicación, validación y federación de datos en catálogos institucionales.',
      en: 'Data Engineer focused on data governance, interoperability and metadata process automation. Currently at Tragsatec, within the ImpulsaDATA programme for the Spanish Data Directorate (central government), working on publishing, validating and federating data across institutional catalogues.',
    },
    {
      es: 'Mi trabajo combina desarrollo en Python, ETL de metadatos, CKAN y estándares como DCAT-AP-ES, RDF, JSON-LD y SHACL, con contenedorización, administración de entornos y documentación operativa. Me interesa construir soluciones mantenibles, trazables y preparadas para operarse en contextos reales y regulados.',
      en: 'My work combines Python development, metadata ETL, CKAN and standards such as DCAT-AP-ES, RDF, JSON-LD and SHACL, together with containerisation, environment administration and operational documentation. I care about building maintainable, traceable solutions ready to run in real, regulated settings.',
    },
    {
      es: 'Lo complemento con un Máster en Big Data y Computación en la Nube, la certificación CAPM y proyectos en OpenMetadata, Kubernetes, Airflow, Spark, Kafka, Databricks y AWS, además de automatización aplicada para acelerar análisis, desarrollo y documentación.',
      en: 'I complement this with a Master’s in Big Data & Cloud Computing, the CAPM certification and projects across OpenMetadata, Kubernetes, Airflow, Spark, Kafka, Databricks and AWS, plus applied automation to speed up analysis, development and documentation.',
    },
  ],
  location: { es: 'Albacete, España', en: 'Albacete, Spain' },
  email: 'alonsomarcosm99@gmail.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AlonsoMarcosM', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alonsomarcosm99/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:alonsomarcosm99@gmail.com', icon: 'email' },
  ],
  cv: {
    es: '/cv/CV_Alonso_Marcos_Munoz_ES.pdf',
    en: '/cv/CV_Alonso_Marcos_Munoz_EN.pdf',
  },
};

/** Secciones navegables del home (ancla -> etiqueta i18n). */
export const navSections = [
  { id: 'about', key: 'nav.about' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'education', key: 'nav.education' },
  { id: 'contact', key: 'nav.contact' },
] as const;
