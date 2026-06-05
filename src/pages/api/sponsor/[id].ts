import type { APIRoute } from 'astro';
import { updateSponsor, deleteSponsor } from '../../../lib/data';

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const data = await request.json();
    updateSponsor(params.id!, data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    deleteSponsor(params.id!);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
