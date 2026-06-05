import type { APIRoute } from 'astro';
import { addExposant, updateExposantStatus } from '../../lib/data';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addExposant({
      structure: data.structure ?? '',
      responsable: data.responsable ?? '',
      email: data.email ?? '',
      telephone: data.telephone ?? '',
      ville: data.ville ?? '',
      pole: data.pole ?? '',
      description: data.description ?? '',
      tailleStand: data.tailleStand,
      lienWeb: data.lienWeb,
      barnum: data.barnum === 'on' || data.barnum === true,
      electricite: data.electricite === 'on' || data.electricite === true,
    });
    return new Response(JSON.stringify({ ok: true, id: item.id }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
