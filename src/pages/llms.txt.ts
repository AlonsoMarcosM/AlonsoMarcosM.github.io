import type { APIRoute } from 'astro';
import { renderLlmsTxt } from '../lib/agent-content';

export const GET = (() => new Response(renderLlmsTxt(), {
  headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
})) satisfies APIRoute;
