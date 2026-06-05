import type { APIRoute } from 'astro';
import { addSponsor } from '../../lib/data';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addSponsor({
      entreprise: data.entreprise ?? '',
      contact: data.contact ?? '',
      email: data.email ?? '',
      telephone: data.telephone,
      pack: data.pack,
      objectif: data.objectif,
      zone: data.zone,
      stand: data.stand,
      lot: data.lot,
      panelCount: data.panelCount ? Number(data.panelCount) : undefined,
    });
    return new Response(JSON.stringify({ ok: true, id: item.id }), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
