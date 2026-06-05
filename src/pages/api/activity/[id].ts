import type { APIRoute } from 'astro';
import { updateFiche, deleteFiche } from '../../../lib/data';
import { checkSession } from '../../../lib/auth';

export const PATCH: APIRoute = async ({ request, params, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const data = await request.json();
    await updateFiche(params.id!, data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    await deleteFiche(params.id!);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
