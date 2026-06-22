export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'es';
export const locales: Lang[] = ['es', 'en'];

/** Diccionario de cadenas de interfaz (no contenido). */
export const ui = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Perfil',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.skills': 'Stack',
    'nav.education': 'Formación',
    'nav.contact': 'Contacto',

    'hero.available': 'Disponible para nuevos proyectos',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.contact': 'Contacto',
    'hero.cta.cv': 'Descargar CV',

    'section.about': 'Perfil',
    'section.experience': 'Experiencia',
    'section.projects': 'Proyectos',
    'section.projects.subtitle': 'Casos prácticos de ingeniería de datos, cloud y gobernanza',
    'section.skills': 'Stack técnico',
    'section.education': 'Formación y certificaciones',
    'section.contact': 'Hablemos',
    'section.contact.subtitle': 'Abierto a oportunidades en ingeniería de datos, gobernanza del dato y plataformas de datos.',

    'projects.all': 'Todos los proyectos',
    'projects.featured': 'Destacados',
    'projects.viewAll': 'Ver todos los proyectos',
    'projects.viewCase': 'Ver caso',
    'projects.backToProjects': 'Volver a proyectos',
    'projects.repo': 'Repositorio',
    'projects.demo': 'Demo en vivo',
    'projects.context': 'Contexto',
    'projects.highlights': 'Qué hice',
    'projects.results': 'Resultados',
    'projects.stack': 'Stack',

    'experience.present': 'Actualidad',
    'experience.responsibilities': 'Responsabilidades',

    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.cta': 'Enviar email',

    'footer.builtWith': 'Hecho con Astro y Tailwind. Desplegado en GitHub Pages.',
    'footer.source': 'Código fuente',

    'theme.toggle': 'Cambiar tema',
    'lang.switch': 'Cambiar idioma',
    'skiplink': 'Saltar al contenido',

    'notfound.title': 'Página no encontrada',
    'notfound.text': 'La página que buscas no existe o se ha movido.',
    'notfound.home': 'Volver al inicio',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Stack',
    'nav.education': 'Education',
    'nav.contact': 'Contact',

    'hero.available': 'Available for new projects',
    'hero.cta.projects': 'View projects',
    'hero.cta.contact': 'Contact',
    'hero.cta.cv': 'Download CV',

    'section.about': 'About',
    'section.experience': 'Experience',
    'section.projects': 'Projects',
    'section.projects.subtitle': 'Hands-on case studies in data engineering, cloud and governance',
    'section.skills': 'Tech stack',
    'section.education': 'Education & certifications',
    'section.contact': "Let's talk",
    'section.contact.subtitle': 'Open to opportunities in data engineering, data governance and data platforms.',

    'projects.all': 'All projects',
    'projects.featured': 'Featured',
    'projects.viewAll': 'View all projects',
    'projects.viewCase': 'View case study',
    'projects.backToProjects': 'Back to projects',
    'projects.repo': 'Repository',
    'projects.demo': 'Live demo',
    'projects.context': 'Context',
    'projects.highlights': 'What I did',
    'projects.results': 'Results',
    'projects.stack': 'Stack',

    'experience.present': 'Present',
    'experience.responsibilities': 'Responsibilities',

    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
    'contact.cta': 'Send email',

    'footer.builtWith': 'Built with Astro and Tailwind. Deployed on GitHub Pages.',
    'footer.source': 'Source code',

    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Switch language',
    'skiplink': 'Skip to content',

    'notfound.title': 'Page not found',
    'notfound.text': 'The page you are looking for does not exist or has moved.',
    'notfound.home': 'Back to home',
  },
} as const;

export type UIKey = keyof (typeof ui)['es'];
