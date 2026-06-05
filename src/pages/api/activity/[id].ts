import type { APIRoute } from 'astro';
import { updateActivity, deleteActivity } from '../../../lib/data';

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const data = await request.json();
    updateActivity(params.id!, data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    deleteActivity(params.id!);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
