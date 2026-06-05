import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    // TODO: save to DB (Prisma/Drizzle) + send email notification
    console.log('[exposant]', data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), { status: 500 });
  }
};
