import type { APIRoute } from 'astro';
import { renderProfileMarkdown } from '../../lib/agent-content';
import { locales, type Lang } from '../../i18n/utils';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}

export const GET = (({ params }) => new Response(
  renderProfileMarkdown(params.lang as Lang),
  { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
)) satisfies APIRoute;
