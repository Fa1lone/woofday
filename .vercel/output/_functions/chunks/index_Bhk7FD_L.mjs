import { addActivity } from './data_DnS_ebgs.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const item = addActivity(data);
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
