import { addContact } from './data_DnS_ebgs.mjs';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    addContact({
      reason: data.reason ?? "",
      nom: data.nom ?? "",
      email: data.email ?? "",
      message: data.message
    });
    if (resend) {
      await resend.emails.send({
        from: "Woof Day <contact@woofday.fr>",
        to: ["tristan.simonin@gmail.com"],
        // À adapter selon besoin
        subject: `Nouveau contact Woof Day : ${data.reason}`,
        html: `
          <h1>Nouveau contact</h1>
          <p><strong>Raison :</strong> ${data.reason}</p>
          <p><strong>Nom :</strong> ${data.nom}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Message :</strong> ${data.message || "Aucun message"}</p>
        `
      });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 201 });
  } catch (error) {
    console.error("Error in contact API:", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
