const GET = () => {
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/dashboard/login",
      "Set-Cookie": "wd_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
