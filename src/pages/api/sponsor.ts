import type { APIRoute } from 'astro';
import { addCandidatureSponsor } from '../../lib/data';
import { Resend } from 'resend';

const resend = import.meta.env.RESEND_API_KEY ? new Resend(import.meta.env.RESEND_API_KEY) : null;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const item = await addCandidatureSponsor({
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
      lienWeb: data.lienWeb,
      instagram: data.instagram,
    });

    if (resend) {
      await resend.emails.send({
        from: 'Woof Day <contact@woofday.fr>',
        to: [import.meta.env.CONTACT_EMAIL ?? 'woofday.contact@gmail.com'],
        subject: `Nouveau sponsor — ${item.entreprise}`,
        html: `
          <h1>Nouveau sponsor</h1>
          <p><strong>Entreprise :</strong> ${item.entreprise}</p>
          <p><strong>Contact :</strong> ${item.contact}</p>
          <p><strong>Email :</strong> ${item.email}</p>
          <p><strong>Pack :</strong> ${item.pack ?? 'Non précisé'}</p>
          ${item.telephone ? `<p><strong>Téléphone :</strong> ${item.telephone}</p>` : ''}
          ${item.objectif ? `<p><strong>Objectif :</strong> ${item.objectif}</p>` : ''}
          ${item.zone ? `<p><strong>Zone souhaitée :</strong> ${item.zone}</p>` : ''}
        `,
      });
    }

    return new Response(JSON.stringify({ ok: true, id: item.id }), { status: 201 });
  } catch (e) {
    console.error('Error in sponsor API:', e);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
