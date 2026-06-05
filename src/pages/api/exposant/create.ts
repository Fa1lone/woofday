import type { APIRoute } from 'astro';
import { addExposant } from '../../../lib/data';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addExposant({
      structure: data.structure ?? '',
      responsable: data.responsable ?? 'Ajout manuel',
      email: data.email ?? '',
      telephone: data.telephone ?? '',
      ville: data.ville ?? '',
      pole: data.pole ?? '',
      description: data.description ?? '',
      lienWeb: data.lienWeb,
      instagram: data.instagram,
      imageUrl: data.imageUrl,
    });
    // For manual addition, we might want to set status to confirmed immediately if data says so
    if (data.status) {
        const { updateExposant } = await import('../../../lib/data');
        updateExposant(item.id, { status: data.status });
        item.status = data.status;
    }
    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
