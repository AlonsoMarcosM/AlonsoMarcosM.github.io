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
      es: 'Soy Ingeniero de Datos en Tragsatec, dentro del proyecto ImpulsaDATA para la Dirección General del Dato. Construyo y opero pipelines ETL con Python y SQL que integran, validan y publican la información de los catálogos de datos de 22 ministerios y organismos públicos.',
      en: 'I am a Data Engineer at Tragsatec, working on the ImpulsaDATA project for the Spanish Data Directorate. I build and run Python and SQL ETL pipelines that integrate, validate and publish the data catalogue information of 22 Spanish ministries and public bodies.',
    },
    {
      es: 'Cubro el ciclo completo: modelar y transformar datos en PostgreSQL y Oracle, automatizar controles de calidad y desplegar en desarrollo, pruebas y producción. Dentro del proyecto AgoraData lidero el desarrollo de la interfaz web que sirve de front-end a todo el backend y a los procesos Python de ImpulsaDATA, con Java, Spring Boot, Vaadin y PostgreSQL.',
      en: 'I cover the full cycle: modelling and transforming data in PostgreSQL and Oracle, automating quality checks and deploying to development, test and production. Within the AgoraData project, I lead the development of the web interface that serves as the front end for all of ImpulsaDATA\'s backend and Python processes, using Java, Spring Boot, Vaadin and PostgreSQL.',
    },
    {
      es: 'El Máster en Big Data y Computación en la Nube me ha dado práctica con Databricks, Spark, Kafka, Airflow y AWS, y la certificación CAPM, método para planificar alcance, riesgos y entregas. En el día a día uso flujos de trabajo agénticos con IA para acelerar el desarrollo, las pruebas y la revisión de código sin perder trazabilidad.',
      en: 'My MSc in Big Data and Cloud Computing gave me hands-on practice with Databricks, Spark, Kafka, Airflow and AWS, and the CAPM certification a structured method to plan scope, risks and deliveries. Day to day I use agentic AI workflows to speed up development, testing and code review while keeping the work traceable.',
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
