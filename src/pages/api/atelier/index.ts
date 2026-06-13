import type { APIRoute } from 'astro';
import { addAtelier } from '../../../lib/data';
import { checkSession } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const data = await request.json();
    const item = await addAtelier({
      titre: data.titre ?? '',
      description: data.description,
      type: data.type ?? 'atelier',
      date: data.date,
      heure: data.heure,
      lieu: data.lieu,
      duree: data.duree,
      animateur: data.animateur,
      capacite: data.capacite ? Number(data.capacite) : undefined,
      prix: data.prix,
      visible: data.visible ?? false,
      inscriptionOuverte: data.inscriptionOuverte ?? false,
      inscriptionUrl: data.inscriptionUrl,
      notes: data.notes,
      displayOrder: data.displayOrder ?? 0,
    });
    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
