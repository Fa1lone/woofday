import type { APIRoute } from 'astro';
import { addContact } from '../../lib/data';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    await addContact({
      reason: data.reason ?? '',
      nom: data.nom ?? '',
      email: data.email ?? '',
      message: data.message,
      vienne: data.vienne,
      aideType: data.aideType,
      idee: data.idee,
    });

    if (resend) {
      await resend.emails.send({
        from: 'Woof Day <contact@woofday.fr>',
        to: [process.env.CONTACT_EMAIL ?? 'woofday.contact@gmail.com'],
        subject: `Nouveau contact Woof Day : ${data.reason}`,
        html: `
          <h1>Nouveau contact</h1>
          <p><strong>Raison :</strong> ${data.reason}</p>
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          ${data.vienne ? `<p><strong>Vient :</strong> ${data.vienne}</p>` : ''}
          ${data.aideType ? `<p><strong>Aide :</strong> ${data.aideType}</p>` : ''}
          ${data.idee ? `<p><strong>Idée :</strong> ${data.idee}</p>` : ''}
          <p><strong>Message :</strong> ${data.message || 'Aucun message'}</p>
        `,
      });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (error) {
    console.error('Error in contact API:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
