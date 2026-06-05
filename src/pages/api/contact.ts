import type { APIRoute } from 'astro';
import { addContact } from '../../lib/data';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    addContact({
      reason: data.reason ?? '',
      nom: data.nom ?? '',
      email: data.email ?? '',
      message: data.message,
    });
    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
