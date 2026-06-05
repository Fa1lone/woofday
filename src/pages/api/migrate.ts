import type { APIRoute } from 'astro';
import { sql } from '../../lib/neon';
import { checkSession } from '../../lib/auth';

export const POST: APIRoute = async ({ cookies }) => {
  if (!checkSession(cookies)) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    // Ensure settings key exists
    await sql`
      INSERT INTO settings (key, value) VALUES ('interest_count', '413')
      ON CONFLICT (key) DO NOTHING
    `;
    await sql`
      INSERT INTO settings (key, value) VALUES ('woofday_active', 'true')
      ON CONFLICT (key) DO NOTHING
    `;

    // Seed zones_stands if empty
    const existing = await sql`SELECT COUNT(*) AS cnt FROM zones_stands`;
    const count = Number((existing[0] as { cnt: unknown }).cnt);

    if (count === 0) {
      const zones = [
        { nom: 'Zone Aquatique', type: 'zone', emoji: '💧', description: 'Splash, jeux d\'eau et nage libre', statut: 'libre', display_order: 1 },
        { nom: 'Agility & Sport', type: 'zone', emoji: '🏃', description: 'Parcours d\'obstacles et vitesse', statut: 'libre', display_order: 2 },
        { nom: 'Détente & Zen', type: 'zone', emoji: '🧘', description: 'Massage canin et bien-être', statut: 'libre', display_order: 3 },
        { nom: 'Famille & Kids', type: 'zone', emoji: '👨‍👩‍👧', description: 'Ateliers enfants et sensibilisation', statut: 'libre', display_order: 4 },
        { nom: 'Scène Centrale', type: 'zone', emoji: '🎤', description: 'Démonstrations et concours', statut: 'libre', display_order: 5 },
        { nom: 'Village Exposants', type: 'zone', emoji: '🛒', description: 'Stands, dégustations et découvertes', statut: 'libre', display_order: 6 },
      ];
      for (const z of zones) {
        await sql`
          INSERT INTO zones_stands (nom, type, emoji, description, statut, display_order)
          VALUES (${z.nom}, ${z.type}, ${z.emoji}, ${z.description}, ${z.statut}, ${z.display_order})
          ON CONFLICT (nom) DO NOTHING
        `;
      }
    }

    return new Response(JSON.stringify({ ok: true, message: 'Seed initial terminé' }), { status: 200 });
  } catch (error) {
    console.error('Migrate error:', error);
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
  }
};
