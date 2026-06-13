import type { APIRoute } from 'astro';
import { updateAtelier, deleteAtelier } from '../../../lib/data';
import { checkSession } from '../../../lib/auth';

export const PATCH: APIRoute = async ({ request, params, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const data = await request.json();
    if (data.capacite !== undefined) data.capacite = data.capacite ? Number(data.capacite) : undefined;
    await updateAtelier(params.id!, data);
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
    await deleteAtelier(params.id!);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
