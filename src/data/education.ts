import type { I18nText } from '../i18n/utils';

export interface EducationItem {
  institution: string;
  /** Logo de la institución (ruta en /public); si falta, se usa icono. */
  logo?: string;
  title: I18nText;
  period: I18nText;
  note?: I18nText;
}

export interface Certification {
  name: string;
  issuer: string;
  logo?: string;
  note: I18nText;
}

export const education: EducationItem[] = [
  {
    institution: 'UCLM',
    logo: '/img/edu/uclm.jpg',
    title: {
      es: 'Máster Universitario en Big Data y Computación en la Nube',
      en: "Master's Degree in Big Data & Cloud Computing",
    },
    period: { es: 'Sept. 2025 – Jun. 2026', en: 'Sep 2025 – Jun 2026' },
    note: { es: 'En curso', en: 'In progress' },
  },
  {
    institution: 'UCLM',
    logo: '/img/edu/uclm.jpg',
    title: {
      es: 'Grado en Ingeniería Informática · Especialización en Tecnologías de la Información',
      en: 'BSc in Computer Engineering · Information Technologies specialisation',
    },
    period: { es: 'Sept. 2019 – Jun. 2025', en: 'Sep 2019 – Jun 2025' },
  },
  {
    institution: 'IES Juan Bosco',
    title: {
      es: 'C.F.G.S. en Administración de Sistemas Informáticos en Red',
      en: 'Higher Vocational Diploma in Network Systems Administration',
    },
    period: { es: 'Sept. 2017 – Jun. 2019', en: 'Sep 2017 – Jun 2019' },
  },
];

export const certifications: Certification[] = [
  {
    name: 'CAPM',
    issuer: 'Project Management Institute',
    logo: '/img/edu/pmi.png',
    note: {
      es: 'Fundamentos certificados de dirección de proyectos PMI.',
      en: 'Certified foundations of PMI project management.',
    },
  },
  {
    name: 'First Certificate in English (B2)',
    issuer: 'Cambridge English',
    logo: '/img/edu/cambridge.png',
    note: {
      es: 'Competencia profesional acreditada en inglés.',
      en: 'Accredited professional English proficiency.',
    },
  },
];
