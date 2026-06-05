import { a as createSessionCookie } from './auth_BNvM6Niv.mjs';

const POST = async ({ request, redirect }) => {
  const form = await request.formData();
  const password = form.get("password");
  if (password === "woofday2026") {
    const secret = "change-me-in-production-with-a-long-random-string";
    return new Response(null, {
      status: 302,
      headers: {
        "Location": "/dashboard",
        "Set-Cookie": createSessionCookie(secret)
      }
    });
  }
  return new Response(null, {
    status: 302,
    headers: { "Location": "/dashboard/login?error=1" }
  });
};
const DELETE = () => {
  return new Response(null, {
    status: 302,
    headers: {
      "Location": "/dashboard/login",
      "Set-Cookie": "wd_session=; Path=/; Max-Age=0"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
