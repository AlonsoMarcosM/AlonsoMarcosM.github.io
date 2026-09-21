import { education, certifications } from '../data/education';
import { experiences } from '../data/experience';
import { getProjectLink, orderedProjects, type Project } from '../data/projects';
import { profile } from '../data/site';
import { skillGroups } from '../data/skills';
import { pick, type Lang } from '../i18n/utils';

const site = 'https://alonsomarcosm.github.io';

function clean(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function period(from: string, to: string | null, lang: Lang): string {
  return `${from} — ${to ?? (lang === 'es' ? 'actualidad' : 'present')}`;
}

function bullets(items: string[]): string {
  return items.map((item) => `- ${clean(item)}`).join('\n');
}

function projectMarkdownUrl(project: Project, lang: Lang): string {
  return `${site}/${lang}/projects/${project.slug}/index.md`;
}

export function renderProjectMarkdown(project: Project, lang: Lang): string {
  const labels = lang === 'es'
    ? {
        category: 'Categoría',
        context: 'Contexto',
        highlights: 'Aspectos destacados',
        results: 'Resultados',
        stack: 'Tecnologías',
        links: 'Enlaces verificables',
        portfolio: 'Página del portfolio',
        repository: 'Repositorio GitHub',
        demo: 'Demostración',
      }
    : {
        category: 'Category',
        context: 'Context',
        highlights: 'Highlights',
        results: 'Results',
        stack: 'Technology stack',
        links: 'Verifiable links',
        portfolio: 'Portfolio page',
        repository: 'GitHub repository',
        demo: 'Live demo',
      };

  const sections = [
    `# ${pick(project.title, lang)}`,
    '',
    `> ${clean(pick(project.tagline, lang))}`,
    '',
    `- ${labels.category}: ${pick(project.category, lang)}`,
    `- Año / Year: ${project.year}`,
    '',
    `## ${labels.context}`,
    '',
    clean(pick(project.context, lang)),
    '',
    `## ${labels.highlights}`,
    '',
    bullets(pick(project.highlights, lang)),
  ];

  if (project.verifiedMetrics) {
    sections.push(
      '',
      `## ${labels.results}`,
      '',
      bullets(project.verifiedMetrics.map((metric) => `${pick(metric.label, lang)}: ${metric.value}. Fuente: ${metric.evidence}`)),
    );
  }

  const github = getProjectLink(project, 'github');
  sections.push(
    '',
    `## ${labels.stack}`,
    '',
    project.stack.join(' · '),
    '',
    `## ${labels.links}`,
    '',
    `- ${labels.portfolio}: ${site}/${lang}/projects/${project.slug}/`,
    ...(github ? [`- ${labels.repository}: ${github.url}`] : []),
  );

  for (const link of project.links.filter((item) => item.type !== 'github' && item.type !== 'case_study')) {
    sections.push(`- ${link.type}: ${link.url}`);
  }

  return `${sections.join('\n')}\n`;
}

export function renderProjectsIndexMarkdown(lang: Lang): string {
  const title = lang === 'es' ? 'Proyectos de Alonso Marcos Muñoz' : 'Projects by Alonso Marcos Muñoz';
  const intro = lang === 'es'
    ? 'Selección de proyectos públicos con contexto, decisiones técnicas, resultados y enlaces verificables.'
    : 'Public projects with context, technical decisions, results and verifiable links.';

  const projects = orderedProjects.map((project) => [
    `## ${pick(project.title, lang)} (${project.year})`,
    '',
    clean(pick(project.tagline, lang)),
    '',
    `- Markdown: ${projectMarkdownUrl(project, lang)}`,
    ...project.links.map((link) => `- ${link.type}: ${link.url}`),
  ].join('\n')).join('\n\n');

  return `# ${title}\n\n> ${intro}\n\n${projects}\n`;
}

export function renderProfileMarkdown(lang: Lang): string {
  const labels = lang === 'es'
    ? {
        about: 'Perfil profesional',
        experience: 'Experiencia',
        projects: 'Proyectos públicos',
        skills: 'Competencias',
        education: 'Formación',
        certifications: 'Certificaciones',
        contact: 'Contacto y perfiles públicos',
        highlights: 'Contribuciones',
        technologies: 'Tecnologías',
        repository: 'Repositorio',
        details: 'Detalles en Markdown',
        demo: 'Demo',
      }
    : {
        about: 'Professional profile',
        experience: 'Experience',
        projects: 'Public projects',
        skills: 'Skills',
        education: 'Education',
        certifications: 'Certifications',
        contact: 'Contact and public profiles',
        highlights: 'Contributions',
        technologies: 'Technologies',
        repository: 'Repository',
        details: 'Markdown details',
        demo: 'Demo',
      };

  const experienceSections = experiences.map((item) => [
    `### ${item.company} — ${pick(item.role, lang)}`,
    '',
    `- ${period(item.period.from, item.period.to, lang)}`,
    `- ${pick(item.location, lang)}`,
    '',
    clean(pick(item.summary, lang)),
    '',
    `**${labels.highlights}**`,
    '',
    bullets(pick(item.highlights, lang)),
    '',
    `**${labels.technologies}:** ${item.tags.join(' · ')}`,
    ...(item.link ? ['', `${item.link.label}: ${item.link.href}`] : []),
  ].join('\n')).join('\n\n');

  const projectSections = orderedProjects.map((project) => [
    `### ${pick(project.title, lang)} (${project.year})`,
    '',
    clean(pick(project.tagline, lang)),
    '',
    `- ${labels.details}: ${projectMarkdownUrl(project, lang)}`,
    ...project.links.map((link) => `- ${link.type}: ${link.url}`),
  ].join('\n')).join('\n\n');

  const skillSections = skillGroups.map((group) =>
    `- **${pick(group.title, lang)}:** ${group.items.map((item) => typeof item === 'string' ? item : pick(item, lang)).join(' · ')}`,
  ).join('\n');

  const educationSections = education.map((item) =>
    `- **${pick(item.title, lang)}** — ${item.institution} · ${pick(item.period, lang)}${item.note ? ` · ${pick(item.note, lang)}` : ''}${item.href ? ` · ${item.href}` : ''}`,
  ).join('\n');

  const certificationSections = certifications.map((item) =>
    `- **${item.name}** — ${item.issuer}. ${pick(item.note, lang)}${item.href ? ` ${item.href}` : ''}`,
  ).join('\n');

  const socialSections = profile.socials.map((item) => `- ${item.label}: ${item.href}`).join('\n');

  return [
    `# ${profile.name}`,
    '',
    `> ${pick(profile.role, lang)}. ${clean(pick(profile.tagline, lang))}`,
    '',
    `Portfolio canónico / Canonical portfolio: ${site}/${lang}/`,
    '',
    `## ${labels.about}`,
    '',
    ...profile.about.flatMap((paragraph) => [clean(pick(paragraph, lang)), '']),
    `## ${labels.experience}`,
    '',
    experienceSections,
    '',
    `## ${labels.projects}`,
    '',
    projectSections,
    '',
    `## ${labels.skills}`,
    '',
    skillSections,
    '',
    `## ${labels.education}`,
    '',
    educationSections,
    '',
    `## ${labels.certifications}`,
    '',
    certificationSections,
    '',
    `## ${labels.contact}`,
    '',
    `- Email: mailto:${profile.email}`,
    socialSections,
    `- CV PDF: ${site}${profile.cv[lang]}`,
    '',
  ].join('\n');
}

export function renderLlmsTxt(): string {
  return [
    `# ${profile.name} — Portfolio profesional`,
    '',
    '> Portfolio bilingüe de un ingeniero de datos especializado en pipelines, modelado, plataformas y gobernanza del dato. Contiene experiencia verificable, proyectos públicos, competencias, formación y vías de contacto profesional.',
    '',
    'Las versiones Markdown se generan desde la misma fuente tipada que el sitio HTML. No hay servicios de compra, pagos ni acciones transaccionales. Para evaluar el perfil profesional, use primero la versión del idioma deseado y después los proyectos enlazados.',
    '',
    '## Perfil profesional',
    '',
    `- [Perfil completo en español](${site}/es/index.md): Experiencia, proyectos, competencias, formación y contacto.`,
    `- [Full profile in English](${site}/en/index.md): Experience, projects, skills, education and contact.`,
    '',
    '## Proyectos',
    '',
    `- [Índice de proyectos en español](${site}/es/projects/index.md): Proyectos con repositorios y demostraciones públicas.`,
    `- [Project index in English](${site}/en/projects/index.md): Projects with public repositories and live demos.`,
    '',
    '## Documentos y perfiles externos',
    '',
    `- [CV en español](${site}${profile.cv.es}): PDF público sin teléfono.`,
    `- [CV in English](${site}${profile.cv.en}): Public PDF without phone number.`,
    `- [GitHub](https://github.com/AlonsoMarcosM): Repositorios públicos y documentación técnica.`,
    `- [LinkedIn](https://www.linkedin.com/in/alonsomarcosm99/): Perfil profesional en LinkedIn.`,
    `- [Manfred](https://www.getmanfred.com/perfil/735337eb-0689-4fa6-8776-0dc0784bfb27): Timeline profesional estructurado.`,
    `- [Tecnoempleo](https://www.tecnoempleo.com/alonso-marcos-munoz.mpt): Perfil público en portal de empleo.`,
    '',
  ].join('\n');
}
