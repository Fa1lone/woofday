import type { APIRoute } from 'astro';
import { addCandidatureExposant } from '../../lib/data';
import { Resend } from 'resend';

const resend = import.meta.env.RESEND_API_KEY ? new Resend(import.meta.env.RESEND_API_KEY) : null;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const item = await addCandidatureExposant({
      structure: data.structure ?? '',
      responsable: data.responsable ?? '',
      email: data.email ?? '',
      telephone: data.telephone ?? '',
      ville: data.ville ?? '',
      pole: data.pole ?? '',
      description: data.description ?? '',
      tailleStand: data.tailleStand,
      barnum: data.barnum,
      electricite: data.electricite,
      tableBonus: Boolean(data.tableBonus),
      animation: data.animation,
      sponsoringInteresse: Boolean(data.sponsoringInteresse),
      lienWeb: data.lienWeb,
    });

    if (resend) {
      await resend.emails.send({
        from: 'Woof Day <contact@woofday.fr>',
        to: [import.meta.env.CONTACT_EMAIL ?? 'woofday.contact@gmail.com'],
        subject: `Nouvelle candidature exposant — ${item.structure}`,
        html: `
          <h1>Nouvelle candidature exposant</h1>
          <p><strong>Structure :</strong> ${item.structure}</p>
          <p><strong>Responsable :</strong> ${item.responsable}</p>
          <p><strong>Email :</strong> ${item.email}</p>
          <p><strong>Téléphone :</strong> ${item.telephone}</p>
          <p><strong>Pôle :</strong> ${item.pole}</p>
          <p><strong>Ville :</strong> ${item.ville}</p>
          <p><strong>Description :</strong> ${item.description}</p>
          ${item.lienWeb ? `<p><strong>Site web :</strong> ${item.lienWeb}</p>` : ''}
        `,
      });
    }

    return new Response(JSON.stringify({ ok: true, id: item.id }), { status: 201 });
  } catch (e) {
    console.error('Error in exposant API:', e);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
