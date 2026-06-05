import type { APIRoute } from 'astro';
import { updateExposantStatus } from '../../../lib/data';

export const PATCH: APIRoute = async ({ request, params }) => {
  try {
    const { status } = await request.json();
    updateExposantStatus(params.id!, status);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
