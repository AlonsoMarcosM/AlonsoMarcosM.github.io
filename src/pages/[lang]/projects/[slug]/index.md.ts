import type { APIRoute } from 'astro';
import { orderedProjects } from '../../../../data/projects';
import { renderProjectMarkdown } from '../../../../lib/agent-content';
import { locales, type Lang } from '../../../../i18n/utils';

export function getStaticPaths() {
  return locales.flatMap((lang) => orderedProjects.map((project) => ({
    params: { lang, slug: project.slug },
    props: { project },
  })));
}

export const GET = (({ params, props }) => new Response(
  renderProjectMarkdown(props.project, params.lang as Lang),
  { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
)) satisfies APIRoute;
