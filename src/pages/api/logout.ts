import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/dashboard/login',
      'Set-Cookie': 'wd_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
    },
  });
};
