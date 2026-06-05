import type { APIRoute } from 'astro';
import { addSponsor } from '../../../lib/data';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addSponsor({
      entreprise: data.entreprise ?? '',
      contact: data.contact ?? 'Ajout manuel',
      email: data.email ?? '',
      telephone: data.telephone ?? '',
      pack: data.pack ?? 'bronze',
      objectif: data.objectif ?? '',
      zone: data.zone,
      stand: data.stand,
      lot: data.lot,
      panelCount: data.panelCount,
      imageUrl: data.imageUrl,
      lienWeb: data.lienWeb,
      instagram: data.instagram,
    });
    
    if (data.status) {
        const { updateSponsor } = await import('../../../lib/data');
        updateSponsor(item.id, { status: data.status });
        item.status = data.status;
    }

    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
