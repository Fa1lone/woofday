import { sql } from './neon';

// ── Types ─────────────────────────────────────────────────────────────────────

export type Fiche = {
  id: string;
  nom: string;
  estExposant: boolean;
  estSponsor: boolean;
  visuelUrl?: string;
  descriptionCourte?: string;
  descriptionLongue?: string;
  quiIlsSont?: string;
  ceQuIlsFont?: string;
  siteWeb?: string;
  instagram?: string;
  visible: boolean;
  miseEnAvant: boolean;
  archive: boolean;
  displayOrder: number;
  createdAt?: string;
};

export type ZoneStand = {
  id: string;
  nom: string;
  type: 'zone' | 'stand';
  description?: string;
  exemple?: string;
  emoji?: string;
  visible: boolean;
  statut: 'libre' | 'reserve';
  ficheId?: string;
  fiche?: { nom: string } | null;
  displayOrder: number;
  createdAt?: string;
};

export type CandidatureExposant = {
  id: string;
  structure: string;
  responsable: string;
  email: string;
  telephone: string;
  ville: string;
  pole: string;
  description: string;
  tailleStand?: string;
  barnum?: string;
  electricite?: string;
  tableBonus: boolean;
  animation?: string;
  sponsoringInteresse: boolean;
  lienWeb?: string;
  statut: 'nouveau' | 'vu' | 'accepte' | 'refuse';
  createdAt: string;
};

export type CandidatureSponsor = {
  id: string;
  entreprise: string;
  contact: string;
  email: string;
  telephone?: string;
  pack?: string;
  objectif?: string;
  zone?: string;
  stand?: string;
  lot?: string;
  panelCount?: number;
  lienWeb?: string;
  instagram?: string;
  statut: 'nouveau' | 'vu' | 'accepte' | 'refuse';
  createdAt: string;
};

export type Contact = {
  id: string;
  reason: string;
  nom: string;
  email: string;
  message?: string;
  vienne?: string;
  aideType?: string;
  idee?: string;
  createdAt: string;
};

// ── Row mappers ───────────────────────────────────────────────────────────────

function mapFiche(r: Record<string, unknown>): Fiche {
  return {
    id: r.id as string,
    nom: r.nom as string,
    estExposant: Boolean(r.est_exposant),
    estSponsor: Boolean(r.est_sponsor),
    visuelUrl: r.visuel_url as string | undefined,
    descriptionCourte: r.description_courte as string | undefined,
    descriptionLongue: r.description_longue as string | undefined,
    quiIlsSont: r.qui_ils_sont as string | undefined,
    ceQuIlsFont: r.ce_qu_ils_font as string | undefined,
    siteWeb: r.site_web as string | undefined,
    instagram: r.instagram as string | undefined,
    visible: Boolean(r.visible),
    miseEnAvant: Boolean(r.mise_en_avant),
    archive: Boolean(r.archive),
    displayOrder: (r.display_order as number) ?? 0,
    createdAt: r.created_at ? (r.created_at as Date).toISOString() : undefined,
  };
}

function mapZoneStand(r: Record<string, unknown>): ZoneStand {
  return {
    id: r.id as string,
    nom: r.nom as string,
    type: r.type as 'zone' | 'stand',
    description: r.description as string | undefined,
    exemple: r.exemple as string | undefined,
    emoji: r.emoji as string | undefined,
    visible: Boolean(r.visible),
    statut: r.statut as 'libre' | 'reserve',
    ficheId: r.fiche_id as string | undefined,
    fiche: r.fiche_nom ? { nom: r.fiche_nom as string } : null,
    displayOrder: (r.display_order as number) ?? 0,
    createdAt: r.created_at ? (r.created_at as Date).toISOString() : undefined,
  };
}

function mapCandidatureExposant(r: Record<string, unknown>): CandidatureExposant {
  return {
    id: r.id as string,
    structure: r.structure as string,
    responsable: r.responsable as string,
    email: r.email as string,
    telephone: r.telephone as string,
    ville: r.ville as string,
    pole: r.pole as string,
    description: r.description as string,
    tailleStand: r.taille_stand as string | undefined,
    barnum: r.barnum as string | undefined,
    electricite: r.electricite as string | undefined,
    tableBonus: Boolean(r.table_bonus),
    animation: r.animation as string | undefined,
    sponsoringInteresse: Boolean(r.sponsoring_interesse),
    lienWeb: r.lien_web as string | undefined,
    statut: r.statut as CandidatureExposant['statut'],
    createdAt: (r.created_at as Date).toISOString(),
  };
}

function mapCandidatureSponsor(r: Record<string, unknown>): CandidatureSponsor {
  return {
    id: r.id as string,
    entreprise: r.entreprise as string,
    contact: r.contact as string,
    email: r.email as string,
    telephone: r.telephone as string | undefined,
    pack: r.pack as string | undefined,
    objectif: r.objectif as string | undefined,
    zone: r.zone as string | undefined,
    stand: r.stand as string | undefined,
    lot: r.lot as string | undefined,
    panelCount: r.panel_count as number | undefined,
    lienWeb: r.lien_web as string | undefined,
    instagram: r.instagram as string | undefined,
    statut: r.statut as CandidatureSponsor['statut'],
    createdAt: (r.created_at as Date).toISOString(),
  };
}

function mapContact(r: Record<string, unknown>): Contact {
  return {
    id: r.id as string,
    reason: r.reason as string,
    nom: r.nom as string,
    email: r.email as string,
    message: r.message as string | undefined,
    vienne: r.vienne as string | undefined,
    aideType: r.aide_type as string | undefined,
    idee: r.idee as string | undefined,
    createdAt: (r.created_at as Date).toISOString(),
  };
}

// ── Settings / Interest ───────────────────────────────────────────────────────

export async function getSetting(key: string, fallback = ''): Promise<string> {
  const rows = await sql`SELECT value FROM settings WHERE key = ${key}`;
  return (rows[0]?.value as string) ?? fallback;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await sql`
    INSERT INTO settings (key, value) VALUES (${key}, ${value})
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
}

export async function getInterestCount(): Promise<number> {
  const val = await getSetting('interest_count', '413');
  return parseInt(val, 10) || 413;
}

export async function incrementInterest(): Promise<number> {
  const current = await getInterestCount();
  const next = current + 1;
  await setSetting('interest_count', String(next));
  return next;
}

// ── Fiches (exposants & sponsors sur le site public) ─────────────────────────

export async function getFiches(opts?: { onlyVisible?: boolean; exposants?: boolean; sponsors?: boolean }): Promise<Fiche[]> {
  let rows;
  if (opts?.onlyVisible && opts?.exposants) {
    rows = await sql`SELECT * FROM fiches WHERE visible = true AND est_exposant = true AND archive = false ORDER BY display_order ASC`;
  } else if (opts?.onlyVisible && opts?.sponsors) {
    rows = await sql`SELECT * FROM fiches WHERE visible = true AND est_sponsor = true AND archive = false ORDER BY display_order ASC`;
  } else if (opts?.onlyVisible) {
    rows = await sql`SELECT * FROM fiches WHERE visible = true AND archive = false ORDER BY display_order ASC`;
  } else {
    rows = await sql`SELECT * FROM fiches WHERE archive = false ORDER BY display_order ASC, created_at DESC`;
  }
  return rows.map(r => mapFiche(r as Record<string, unknown>));
}

export async function getFicheById(id: string): Promise<Fiche | null> {
  const rows = await sql`SELECT * FROM fiches WHERE id = ${id}`;
  return rows[0] ? mapFiche(rows[0] as Record<string, unknown>) : null;
}

export async function addFiche(data: Omit<Fiche, 'id' | 'createdAt'>): Promise<Fiche> {
  const rows = await sql`
    INSERT INTO fiches
      (nom, est_exposant, est_sponsor, visuel_url, description_courte, description_longue,
       qui_ils_sont, ce_qu_ils_font, site_web, instagram, visible, mise_en_avant, archive, display_order)
    VALUES
      (${data.nom}, ${data.estExposant}, ${data.estSponsor},
       ${data.visuelUrl ?? null}, ${data.descriptionCourte ?? null}, ${data.descriptionLongue ?? null},
       ${data.quiIlsSont ?? null}, ${data.ceQuIlsFont ?? null},
       ${data.siteWeb ?? null}, ${data.instagram ?? null},
       ${data.visible}, ${data.miseEnAvant}, ${data.archive}, ${data.displayOrder})
    RETURNING *
  `;
  return mapFiche(rows[0] as Record<string, unknown>);
}

export async function updateFiche(id: string, data: Partial<Fiche>): Promise<void> {
  const mapping: Record<string, string> = {
    nom: 'nom', estExposant: 'est_exposant', estSponsor: 'est_sponsor',
    visuelUrl: 'visuel_url', descriptionCourte: 'description_courte',
    descriptionLongue: 'description_longue', quiIlsSont: 'qui_ils_sont',
    ceQuIlsFont: 'ce_qu_ils_font', siteWeb: 'site_web', instagram: 'instagram',
    visible: 'visible', miseEnAvant: 'mise_en_avant', archive: 'archive',
    displayOrder: 'display_order',
  };
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const [key, col] of Object.entries(mapping)) {
    if (key in data && (data as Record<string, unknown>)[key] !== undefined) {
      fields.push(col);
      values.push((data as Record<string, unknown>)[key]);
    }
  }
  if (fields.length === 0) return;
  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  await sql(`UPDATE fiches SET ${setClauses}, updated_at = NOW() WHERE id = $${fields.length + 1}`, [...values, id]);
}

export async function deleteFiche(id: string): Promise<void> {
  await sql`DELETE FROM fiches WHERE id = ${id}`;
}

// ── Zones & Stands ────────────────────────────────────────────────────────────

export async function getZonesStands(opts?: { onlyVisible?: boolean; type?: 'zone' | 'stand' }): Promise<ZoneStand[]> {
  let rows;
  if (opts?.onlyVisible && opts?.type) {
    rows = await sql`
      SELECT zs.*, f.nom AS fiche_nom FROM zones_stands zs
      LEFT JOIN fiches f ON f.id = zs.fiche_id
      WHERE zs.visible = true AND zs.type = ${opts.type}
      ORDER BY zs.display_order ASC
    `;
  } else if (opts?.onlyVisible) {
    rows = await sql`
      SELECT zs.*, f.nom AS fiche_nom FROM zones_stands zs
      LEFT JOIN fiches f ON f.id = zs.fiche_id
      WHERE zs.visible = true ORDER BY zs.display_order ASC
    `;
  } else {
    rows = await sql`
      SELECT zs.*, f.nom AS fiche_nom FROM zones_stands zs
      LEFT JOIN fiches f ON f.id = zs.fiche_id
      ORDER BY zs.type ASC, zs.display_order ASC
    `;
  }
  return rows.map(r => mapZoneStand(r as Record<string, unknown>));
}

export async function addZoneStand(data: Omit<ZoneStand, 'id' | 'fiche' | 'createdAt'>): Promise<ZoneStand> {
  const rows = await sql`
    INSERT INTO zones_stands (nom, type, description, exemple, emoji, visible, statut, fiche_id, display_order)
    VALUES (${data.nom}, ${data.type}, ${data.description ?? null}, ${data.exemple ?? null},
            ${data.emoji ?? null}, ${data.visible}, ${data.statut}, ${data.ficheId ?? null}, ${data.displayOrder})
    RETURNING *
  `;
  return mapZoneStand(rows[0] as Record<string, unknown>);
}

export async function updateZoneStand(id: string, data: Partial<ZoneStand>): Promise<void> {
  const mapping: Record<string, string> = {
    nom: 'nom', type: 'type', description: 'description', exemple: 'exemple',
    emoji: 'emoji', visible: 'visible', statut: 'statut',
    ficheId: 'fiche_id', displayOrder: 'display_order',
  };
  const fields: string[] = [];
  const values: unknown[] = [];
  for (const [key, col] of Object.entries(mapping)) {
    if (key in data && (data as Record<string, unknown>)[key] !== undefined) {
      fields.push(col);
      values.push((data as Record<string, unknown>)[key]);
    }
  }
  if (fields.length === 0) return;
  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ');
  await sql(`UPDATE zones_stands SET ${setClauses} WHERE id = $${fields.length + 1}`, [...values, id]);
}

export async function deleteZoneStand(id: string): Promise<void> {
  await sql`DELETE FROM zones_stands WHERE id = ${id}`;
}

// ── Candidatures Exposant ─────────────────────────────────────────────────────

export async function getCandidaturesExposant(): Promise<CandidatureExposant[]> {
  const rows = await sql`SELECT * FROM candidatures_exposant ORDER BY created_at DESC`;
  return rows.map(r => mapCandidatureExposant(r as Record<string, unknown>));
}

export async function addCandidatureExposant(data: Omit<CandidatureExposant, 'id' | 'statut' | 'createdAt'>): Promise<CandidatureExposant> {
  const rows = await sql`
    INSERT INTO candidatures_exposant
      (structure, responsable, email, telephone, ville, pole, description,
       taille_stand, barnum, electricite, table_bonus, animation, sponsoring_interesse, lien_web)
    VALUES
      (${data.structure}, ${data.responsable}, ${data.email}, ${data.telephone},
       ${data.ville}, ${data.pole}, ${data.description},
       ${data.tailleStand ?? null}, ${data.barnum ?? null}, ${data.electricite ?? null},
       ${data.tableBonus}, ${data.animation ?? null}, ${data.sponsoringInteresse},
       ${data.lienWeb ?? null})
    RETURNING *
  `;
  return mapCandidatureExposant(rows[0] as Record<string, unknown>);
}

export async function updateCandidatureExposantStatut(id: string, statut: CandidatureExposant['statut']): Promise<void> {
  await sql`UPDATE candidatures_exposant SET statut = ${statut} WHERE id = ${id}`;
}

export async function deleteCandidatureExposant(id: string): Promise<void> {
  await sql`DELETE FROM candidatures_exposant WHERE id = ${id}`;
}

// ── Candidatures Sponsor ──────────────────────────────────────────────────────

export async function getCandidaturesSponsor(): Promise<CandidatureSponsor[]> {
  const rows = await sql`SELECT * FROM candidatures_sponsor ORDER BY created_at DESC`;
  return rows.map(r => mapCandidatureSponsor(r as Record<string, unknown>));
}

export async function addCandidatureSponsor(data: Omit<CandidatureSponsor, 'id' | 'statut' | 'createdAt'>): Promise<CandidatureSponsor> {
  const rows = await sql`
    INSERT INTO candidatures_sponsor
      (entreprise, contact, email, telephone, pack, objectif, zone, stand, lot, panel_count, lien_web, instagram)
    VALUES
      (${data.entreprise}, ${data.contact}, ${data.email}, ${data.telephone ?? null},
       ${data.pack ?? null}, ${data.objectif ?? null}, ${data.zone ?? null},
       ${data.stand ?? null}, ${data.lot ?? null}, ${data.panelCount ?? null},
       ${data.lienWeb ?? null}, ${data.instagram ?? null})
    RETURNING *
  `;
  return mapCandidatureSponsor(rows[0] as Record<string, unknown>);
}

export async function updateCandidatureSponsorStatut(id: string, statut: CandidatureSponsor['statut']): Promise<void> {
  await sql`UPDATE candidatures_sponsor SET statut = ${statut} WHERE id = ${id}`;
}

export async function deleteCandidatureSponsor(id: string): Promise<void> {
  await sql`DELETE FROM candidatures_sponsor WHERE id = ${id}`;
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export async function getContacts(): Promise<Contact[]> {
  const rows = await sql`SELECT * FROM contacts ORDER BY created_at DESC`;
  return rows.map(r => mapContact(r as Record<string, unknown>));
}

export async function addContact(data: Omit<Contact, 'id' | 'createdAt'>): Promise<Contact> {
  const rows = await sql`
    INSERT INTO contacts (reason, nom, email, message, vienne, aide_type, idee)
    VALUES (${data.reason}, ${data.nom}, ${data.email}, ${data.message ?? null},
            ${data.vienne ?? null}, ${data.aideType ?? null}, ${data.idee ?? null})
    RETURNING *
  `;
  return mapContact(rows[0] as Record<string, unknown>);
}
