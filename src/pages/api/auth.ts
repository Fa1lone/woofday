import type { APIRoute } from 'astro';
import { createSessionCookie } from '../../lib/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const password = form.get('password') as string;

  if (password === (import.meta.env.DASHBOARD_PASSWORD ?? 'woofday2026')) {
    const secret = import.meta.env.SESSION_SECRET ?? 'change-me';
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/dashboard',
        'Set-Cookie': createSessionCookie(secret),
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: { 'Location': '/dashboard/login?error=1' },
  });
};

export const DELETE: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: {
      'Location': '/dashboard/login',
      'Set-Cookie': 'wd_session=; Path=/; Max-Age=0',
    },
  });
};
