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
    es: 'Data Engineer · Pipelines, modelado y plataformas',
    en: 'Data Engineer · Pipelines, data modelling & platforms',
  },
  tagline: {
    es: 'Construyo pipelines, modelos y plataformas de datos con Python y SQL. Aporto experiencia profesional en metadatos públicos y proyectos aplicados con Databricks, Spark, Airflow, Kafka y AWS.',
    en: 'I build data pipelines, models and platforms with Python and SQL. I bring professional public-metadata experience and applied projects with Databricks, Spark, Airflow, Kafka and AWS.',
  },
  about: [
    {
      es: 'Data Engineer centrado en construir pipelines fiables, modelos mantenibles y soluciones operables. Trabajo en Tragsatec dentro de ImpulsaDATA para la Dirección General del Dato, una iniciativa con 5.771 datasets publicados y federados, 22 ministerios y organismos y 13 servicios comunes según su balance público.',
      en: 'Data Engineer focused on reliable pipelines, maintainable models and operable solutions. I work at Tragsatec within ImpulsaDATA for the Spanish Data Directorate, an initiative publicly reporting 5,771 published and federated datasets, 22 ministries and public bodies and 13 shared services.',
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
    es: '/cv/CV_Alonso_Marcos_Muñoz_ES.pdf',
    en: '/cv/CV_Alonso_Marcos_Muñoz_EN.pdf',
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
