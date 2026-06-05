import { deleteActivity, updateActivity } from './data_DnS_ebgs.mjs';

const PATCH = async ({ request, params }) => {
  try {
    const data = await request.json();
    updateActivity(params.id, data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur" }), { status: 500 });
  }
};
const DELETE = async ({ params }) => {
  try {
    deleteActivity(params.id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
