import type { APIRoute } from 'astro';
import { addActivity } from '../../../lib/data';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addActivity(data);
    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
