import { addExposant } from './data_DnS_ebgs.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addExposant({
      structure: data.structure ?? "",
      responsable: data.responsable ?? "",
      email: data.email ?? "",
      telephone: data.telephone ?? "",
      ville: data.ville ?? "",
      pole: data.pole ?? "",
      description: data.description ?? "",
      tailleStand: data.tailleStand,
      lienWeb: data.lienWeb,
      barnum: data.barnum,
      electricite: data.electricite
    });
    return new Response(JSON.stringify({ ok: true, id: item.id }), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
