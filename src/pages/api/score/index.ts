import type { APIRoute } from 'astro';
import { addZoneStand } from '../../../lib/data';
import { checkSession } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const data = await request.json();
    const item = await addZoneStand({
      nom: data.nom ?? '',
      type: data.type ?? 'stand',
      description: data.description,
      exemple: data.exemple,
      emoji: data.emoji,
      visible: data.visible ?? true,
      statut: data.statut ?? 'libre',
      ficheId: data.ficheId,
      displayOrder: data.displayOrder ?? 0,
    });
    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
