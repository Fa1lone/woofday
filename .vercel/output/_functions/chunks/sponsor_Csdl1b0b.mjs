import { addSponsor } from './data_DnS_ebgs.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addSponsor({
      entreprise: data.entreprise ?? "",
      contact: data.contact ?? "",
      email: data.email ?? "",
      telephone: data.telephone,
      pack: data.pack,
      objectif: data.objectif,
      zone: data.zone,
      stand: data.stand,
      lot: data.lot,
      panelCount: data.panneaux ? Number(data.panneaux) : void 0
    });
    return new Response(JSON.stringify({ ok: true, id: item.id }), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
