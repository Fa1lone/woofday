import type { APIRoute } from 'astro';
import { addFiche } from '../../../lib/data';
import { checkSession } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }
  try {
    const data = await request.json();
    const item = await addFiche({
      nom: data.nom ?? data.name ?? data.entreprise ?? '',
      estExposant: data.estExposant ?? false,
      estSponsor: true,
      visuelUrl: data.visuelUrl ?? data.logoUrl,
      descriptionCourte: data.descriptionCourte ?? data.description,
      descriptionLongue: data.descriptionLongue,
      quiIlsSont: data.quiIlsSont,
      ceQuIlsFont: data.ceQuIlsFont,
      siteWeb: data.siteWeb ?? data.websiteUrl ?? data.lienWeb,
      instagram: data.instagram,
      visible: data.visible ?? false,
      miseEnAvant: data.miseEnAvant ?? false,
      archive: false,
      displayOrder: data.displayOrder ?? 0,
    });
    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur' }), { status: 500 });
  }
};
