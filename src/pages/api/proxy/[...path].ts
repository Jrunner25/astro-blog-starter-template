export const prerender = false;
import type { APIRoute } from 'astro';

const TUNNEL = 'https://enrollment-licensed-authorities-possibilities.trycloudflare.com';

export const ALL: APIRoute = async ({ params, request }) => {
  const path = params.path ?? '';
  const url = new URL(request.url);
  const target = `${TUNNEL}/${path}${url.search}`;

  const body = request.method !== 'GET' && request.method !== 'HEAD'
    ? await request.text()
    : undefined;

  const upstream = await fetch(target, {
    method: request.method,
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
