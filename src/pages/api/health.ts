import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const neonUrl = process.env.NEON_DATABASE_URL || import.meta.env.NEON_DATABASE_URL;

  const checks: Record<string, string> = {
    NEON_DATABASE_URL: neonUrl ? `✅ défini (${neonUrl.substring(0, 20)}...)` : '❌ MANQUANT',
    RESEND_API_KEY: process.env.RESEND_API_KEY ? '✅ défini' : '⚠️ absent (emails désactivés)',
    SESSION_SECRET: process.env.SESSION_SECRET ? '✅ défini' : '⚠️ défaut utilisé',
    DASHBOARD_PASSWORD: process.env.DASHBOARD_PASSWORD ? '✅ défini' : '⚠️ défaut "woofday2026"',
  };

  let dbStatus = '❌ non testé';
  if (neonUrl) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(neonUrl);
      await sql`SELECT 1`;
      dbStatus = '✅ connexion OK';
    } catch (e) {
      dbStatus = `❌ erreur: ${String(e).substring(0, 100)}`;
    }
  } else {
    dbStatus = '❌ NEON_DATABASE_URL manquant';
  }

  const result = { env: checks, db: dbStatus, ts: new Date().toISOString() };

  return new Response(JSON.stringify(result, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
