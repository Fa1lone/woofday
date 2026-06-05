import { addExposant } from './data_DnS_ebgs.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addExposant({
      structure: data.structure ?? "",
      responsable: data.responsable ?? "Ajout manuel",
      email: data.email ?? "",
      telephone: data.telephone ?? "",
      ville: data.ville ?? "",
      pole: data.pole ?? "",
      description: data.description ?? "",
      lienWeb: data.lienWeb,
      instagram: data.instagram,
      imageUrl: data.imageUrl
    });
    if (data.status) {
      const { updateExposant } = await import('./data_DnS_ebgs.mjs');
      updateExposant(item.id, { status: data.status });
      item.status = data.status;
    }
    return new Response(JSON.stringify(item), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
