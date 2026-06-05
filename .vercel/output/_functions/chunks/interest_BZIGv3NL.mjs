import { getInterestCount, incrementInterest } from './data_DnS_ebgs.mjs';

const GET = () => {
  return new Response(JSON.stringify({ count: getInterestCount() }), {
    headers: { "Content-Type": "application/json" }
  });
};
const POST = () => {
  const count = incrementInterest();
  return new Response(JSON.stringify({ count }), {
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
